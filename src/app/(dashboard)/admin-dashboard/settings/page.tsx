"use client";

import { Save, User, Mail, Globe, Lock, Bell } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { updateAdminProfile, changePassword, updateSettings } from "@/actions/admin.actions";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  // Profile form
  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Admin User",
      email: "admin@ecospark.com",
      bio: "",
    },
  });

  // Password form
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Profile mutation
  const profileMutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      const result = await updateAdminProfile(data.name, data.bio || "");
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  // Password mutation
  const passwordMutation = useMutation({
    mutationFn: async (data: PasswordForm) => {
      const result = await changePassword(data.currentPassword, data.newPassword);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      resetPassword();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to change password");
    },
  });

  // Settings mutation
  const settingsMutation = useMutation({
    mutationFn: async () => {
      const result = await updateSettings("en", "light", notificationsEnabled);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update settings");
    },
  });

  const onProfileSubmit = handleProfileSubmit((data) => {
    profileMutation.mutate(data);
  });

  const onPasswordSubmit = handlePasswordSubmit((data) => {
    passwordMutation.mutate(data);
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Configure your dashboard and account preferences.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 space-y-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Profile Information</h3>
            </div>

            <form onSubmit={onProfileSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 ml-1 uppercase tracking-widest">Admin Name</label>
                  <Input 
                    {...registerProfile("name")}
                    type="text" 
                    placeholder="Your name"
                    className="rounded-2xl"
                  />
                  {profileErrors.name && <p className="text-xs text-red-500">{profileErrors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 ml-1 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input 
                      {...registerProfile("email")}
                      type="email" 
                      placeholder="your@email.com"
                      className="pl-12 rounded-2xl"
                    />
                  </div>
                  {profileErrors.email && <p className="text-xs text-red-500">{profileErrors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 ml-1 uppercase tracking-widest">Bio/Description</label>
                <textarea 
                  {...registerProfile("bio")}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-5 py-3 rounded-2xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none dark:bg-zinc-900 dark:border-zinc-800"
                />
                {profileErrors.bio && <p className="text-xs text-red-500">{profileErrors.bio.message}</p>}
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold"
                  disabled={profileMutation.isPending}
                >
                  <Save className="w-5 h-5" />
                  {profileMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>

          {/* Password Form */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 space-y-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Security</h3>
            </div>
            
            <form onSubmit={onPasswordSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 ml-1 uppercase tracking-widest">Current Password</label>
                  <Input 
                    {...registerPassword("currentPassword")}
                    type="password" 
                    placeholder="Enter current password"
                    className="rounded-2xl"
                  />
                  {passwordErrors.currentPassword && <p className="text-xs text-red-500">{passwordErrors.currentPassword.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 ml-1 uppercase tracking-widest">New Password</label>
                  <Input 
                    {...registerPassword("newPassword")}
                    type="password" 
                    placeholder="Enter new password"
                    className="rounded-2xl"
                  />
                  {passwordErrors.newPassword && <p className="text-xs text-red-500">{passwordErrors.newPassword.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 ml-1 uppercase tracking-widest">Confirm Password</label>
                <Input 
                  {...registerPassword("confirmPassword")}
                  type="password" 
                  placeholder="Confirm new password"
                  className="rounded-2xl"
                />
                {passwordErrors.confirmPassword && <p className="text-xs text-red-500">{passwordErrors.confirmPassword.message}</p>}
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold bg-amber-600 hover:bg-amber-700"
                  disabled={passwordMutation.isPending}
                >
                  <Lock className="w-5 h-5" />
                  {passwordMutation.isPending ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 space-y-6 shadow-sm bg-gradient-to-br from-white to-primary/5 dark:from-zinc-950 dark:to-primary/5 dark:border-zinc-800">
            <h3 className="text-xl font-bold">Preferences</h3>
            <div className="space-y-4">
              {/* Notifications Toggle */}
              <button 
                onClick={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  settingsMutation.mutate();
                }}
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-primary/30 transition-colors w-full"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-zinc-400" />
                  <span className="font-semibold">Email Notifications</span>
                </div>
                <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${notificationsEnabled ? 'bg-primary' : 'bg-zinc-300'}`}>
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      notificationsEnabled ? 'right-1' : 'left-1'
                    }`} 
                  />
                </div>
              </button>

              {/* Public Profile Toggle */}
              <button 
                onClick={() => {
                  setPublicProfile(!publicProfile);
                  settingsMutation.mutate();
                }}
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-primary/30 transition-colors w-full"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-zinc-400" />
                  <span className="font-semibold">Public Profile</span>
                </div>
                <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${publicProfile ? 'bg-primary' : 'bg-zinc-300'}`}>
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      publicProfile ? 'right-1' : 'left-1'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
