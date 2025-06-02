// components/owner/OwnerProfilePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/owner/ui/Button";
import { Input } from "@/components/owner/ui/input";
import { Label } from "@/components/owner/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/owner/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/owner/ui/Avatar";
import { toast } from "react-toastify";
import { Session } from "inspector/promises";

interface OwnerData {
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  turfsOwned: number;
  memberSince: string;
}

interface ProfileErrors {
  name?: string;
  phone?: string;
  company?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}


interface OwnerProfilePageProps {
  session: Session;
}

const OwnerProfilePage = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<ProfileErrors>({});

  const [owner, setOwner] = useState<OwnerData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    avatar: "",
    turfsOwned: 0,
    memberSince: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?type=owner");
    } else if (status === "authenticated" && session?.user) {
      // Fetch owner data from API
      const fetchOwnerData = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/owners/${session.user.id}`);
          const data = await res.json();
          
          setOwner({
            name: data.name || session.user.name || "",
            email: data.email || session.user.email || "",
            phone: data.phone || "",
            company: data.company || "",
            avatar: data.image || session.user.image || "/default-avatar.png",
            turfsOwned: data.turfsOwned || 0,
            memberSince: data.createdAt || new Date().toISOString(),
          });
        } catch (error) {
          console.error("Failed to fetch owner data:", error);
        }
      };

      fetchOwnerData();
    }
  }, [status, session, router]);

  const validateProfile = (): boolean => {
    const newErrors: ProfileErrors = {};

    if (!owner.name.trim()) {
      newErrors.name = "Name is required";
    } else if (owner.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!owner.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]+$/.test(owner.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!owner.company.trim()) {
      newErrors.company = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = (): boolean => {
    const newErrors: ProfileErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Password must contain an uppercase letter";
    } else if (!/[a-z]/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Password must contain a lowercase letter";
    } else if (!/[0-9]/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Password must contain a number";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwner(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ProfileErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    if (passwordErrors[name as keyof ProfileErrors]) {
      setPasswordErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update session if name or email changed
      if (owner.name !== session.user?.name || owner.email !== session.user?.email) {
        await update({
          ...session.user,
          name: owner.name,
          email: owner.email,
          image: owner.avatar,
        });
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
      setErrors(prev => ({ ...prev, general: "Failed to update profile" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setPasswordLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Failed to change password");
      setPasswordErrors(prev => ({ ...prev, general: "Failed to change password" }));
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="ml-[300px] p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Loading Profile...</h1>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "owner") {
    return null; // Redirect is handled by useEffect
  }

  return (
    <div className="ml-[300px] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Owner Profile</h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={owner.avatar} />
                  <AvatarFallback>
                    {owner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{owner.name}</h3>
                  <p className="text-gray-500">{owner.email}</p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Turfs Owned</span>
                    <span className="font-medium">{owner.turfsOwned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">
                      {new Date(owner.memberSince).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button
                  variant="danger"
                  className="w-full mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={owner.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={owner.email}
                      disabled
                      className="opacity-70 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={owner.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={owner.company}
                      onChange={handleProfileChange}
                      placeholder="Enter company name"
                    />
                    {errors.company && (
                      <p className="text-sm text-red-600">{errors.company}</p>
                    )}
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Change Password Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {passwordErrors.general && (
                <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{passwordErrors.general}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-600">{passwordErrors.currentPassword}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-sm text-red-600">{passwordErrors.newPassword}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" variant="outline" disabled={passwordLoading}>
                  {passwordLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerProfilePage;