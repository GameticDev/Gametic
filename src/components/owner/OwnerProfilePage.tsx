// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import { Button } from "@/components/owner/ui/Button";
// import { Input } from "@/components/owner/ui/input";
// import { Label } from "@/components/owner/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/owner/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/owner/ui/Avatar";
// import { toast } from "react-toastify";

// const OwnerProfilePage = () => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const owner = {
//     name: session?.user?.name || "Owner Name",
//     email: session?.user?.email || "owner@example.com",
//     phone: "+1234567890",
//     company: "GameTic Turfs",
//     avatar: session?.user?.image || "",
//     turfsOwned: 5,
//     memberSince: "2023-01-15",
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut({ redirect: false });
//       toast.success("Logged out successfully");
//       router.push("/login");
//     } catch (error) {
//       toast.error("Failed to logout");
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className="ml-[300px] p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Owner Profile</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Profile Card */}
//           <Card className="md:col-span-1">
//             <CardHeader>
//               <CardTitle>Profile Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col items-center space-y-4">
//                 <Avatar className="w-24 h-24">
//                   <AvatarImage src={owner.avatar} />
//                   <AvatarFallback>
//                     {owner.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="text-center">
//                   <h3 className="text-xl font-semibold">{owner.name}</h3>
//                   <p className="text-gray-500">{owner.email}</p>
//                 </div>
//                 <div className="w-full space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Turfs Owned</span>
//                     <span className="font-medium">{owner.turfsOwned}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Member Since</span>
//                     <span className="font-medium">
//                       {new Date(owner.memberSince).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//                 <Button
//                   variant="destructive"
//                   className="w-full mt-4"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Edit Form */}
//           <Card className="md:col-span-2">
//             <CardHeader>
//               <CardTitle>Edit Profile</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       defaultValue={owner.name}
//                       placeholder="Enter your name"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       defaultValue={owner.email}
//                       disabled
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       defaultValue={owner.phone}
//                       placeholder="Enter phone number"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="company">Company Name</Label>
//                     <Input
//                       id="company"
//                       defaultValue={owner.company}
//                       placeholder="Enter company name"
//                     />
//                   </div>
//                 </div>
//                 <div className="pt-4">
//                   <Button type="submit" className="w-full md:w-auto">
//                     Save Changes
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Change Password Section */}
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle>Change Password</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="currentPassword">Current Password</Label>
//                   <Input
//                     id="currentPassword"
//                     type="password"
//                     placeholder="Enter current password"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="newPassword">New Password</Label>
//                   <Input
//                     id="newPassword"
//                     type="password"
//                     placeholder="Enter new password"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm Password</Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     placeholder="Confirm new password"
//                   />
//                 </div>
//               </div>
//               <div className="pt-2">
//                 <Button type="submit" variant="outline">
//                   Update Password
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default OwnerProfilePage;