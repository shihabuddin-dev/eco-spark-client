"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Shield, Calendar, Edit2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

export default function MemberProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setIsEditing(false);
    toast.info(
      "Profile update functionality will be integrated with backend API.",
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          My Profile
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-transparent" />

        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-8 flex items-end justify-between">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-white bg-primary/10 text-4xl font-black text-primary shadow-lg dark:border-zinc-950">
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              className="rounded-xl font-bold"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                "Save Changes"
              ) : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <User className="h-4 w-4" /> Full Name
              </label>
              {isEditing ? (
                <Input
                  defaultValue={user.name}
                  className="h-12 bg-zinc-50 dark:bg-zinc-900"
                />
              ) : (
                <p className="flex h-12 flex-col justify-center rounded-xl bg-zinc-50 px-4 font-medium dark:bg-zinc-900">
                  {user.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <Mail className="h-4 w-4" /> Email Address
              </label>
              <p className="flex h-12 flex-col justify-center rounded-xl bg-zinc-50 px-4 font-medium text-zinc-500 dark:bg-zinc-900">
                {user.email}
              </p>
              <p className="text-xs text-zinc-400 px-2 mt-1">
                Email cannot be changed.
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <Shield className="h-4 w-4" /> Role
              </label>
              <div className="flex h-12 items-center px-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {user.role}
                </span>
              </div>
            </div>

            {/* <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <Calendar className="h-4 w-4" /> Member Since
              </label>
              <p className="flex h-12 items-center px-4 font-medium text-zinc-600 dark:text-zinc-400">
                {user.createdAt
                  ? format(new Date(user.createdAt), "MMMM d, yyyy")
                  : "Unknown"}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
