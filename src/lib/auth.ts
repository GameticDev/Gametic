import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { connectToDB } from "@/lib/database";
import Owner from "@/models/owner";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const owner = await Owner.findOne({ email: credentials?.email });

        if (!owner) {
          throw new Error("No owner found with this email");
        }

        const isValid = await compare(credentials?.password || "", owner.password);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: owner._id.toString(),
          name: owner.name,
          email: owner.email,
          role: "owner",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectToDB();
        const existingOwner = await Owner.findOne({ email: user.email });

        if (!existingOwner) {
          // Create new owner if not exists
          const newOwner = new Owner({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
          });
          await newOwner.save();
          user.role = "owner";
          user.id = newOwner._id.toString();
        } else {
          user.role = "owner";
          user.id = existingOwner._id.toString();
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);