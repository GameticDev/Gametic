// // app/owner/profile/page.tsx
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import OwnerProfilePage from "@/components/owner/OwnerProfilePage";

// export default async function ProfilePage() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "owner") {
//     redirect("/login?type=owner");
//   }

//   return <OwnerProfilePage />;
// }
