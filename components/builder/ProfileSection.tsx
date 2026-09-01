"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Globe,
  AlignLeft,
  Pencil,
  ChevronRight,
} from "lucide-react";
import type { Profile } from "@/app/data/data";

interface ProfileSectionProps {
  data: Profile;
  onUpdate?: (data: Profile) => void;
}

function ProfileModal({
  open,
  onClose,
  data,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  data: Profile;
  onSave?: (data: Profile) => void;
}) {
  const [form, setForm] = useState<Profile>({ ...data });

  // Keep form in sync when data changes
  useState(() => {
    setForm({ ...data });
  });

  const handleChange = (field: keyof Profile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[88vh] sm:max-h-[85vh] p-0 flex flex-col bg-zinc-900 border-zinc-700/60">
        {/* Modal Header */}
        <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-5 pb-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex-shrink-0">
              <User className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100">
                Edit Profile
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">Personal information</p>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 space-y-3.5 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {/* Full Name */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Full Name
            </Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Alex Morgan"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-zinc-500" /> Phone
              </Label>
              <Input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 987 654 3210"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Mail className="h-3 w-3 text-zinc-500" /> Email
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="alex@example.com"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-zinc-500" /> Location{" "}
              <span className="text-zinc-600 normal-case font-normal">(Optional)</span>
            </Label>
            <Input
              value={form.location ?? ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Bangalore, India"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* LinkedIn + GitHub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Linkedin className="h-3 w-3 text-zinc-500" /> LinkedIn
              </Label>
              <Input
                value={form.linkedin ?? ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="linkedin.com/in/you"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Github className="h-3 w-3 text-zinc-500" /> GitHub
              </Label>
              <Input
                value={form.github ?? ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="github.com/you"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <Globe className="h-3 w-3 text-zinc-500" /> Website{" "}
              <span className="text-zinc-600 normal-case font-normal">(Optional)</span>
            </Label>
            <Input
              value={form.website ?? ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="yoursite.dev"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* About Me */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <AlignLeft className="h-3 w-3 text-zinc-500" /> About Me
            </Label>
            <Textarea
              value={form.aboutme ?? ""}
              onChange={(e) => handleChange("aboutme", e.target.value)}
              placeholder="Write a short professional summary..."
              rows={4}
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/70 resize-none leading-relaxed text-xs sm:text-sm"
            />
          </div>
        </div>

        <Separator className="bg-zinc-800/80" />

        <DialogFooter className="px-4 py-3 sm:px-6 sm:py-3.5 flex flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700/80 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfileSection({ data, onUpdate }: ProfileSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group relative flex items-center justify-between p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-indigo-500/30 cursor-pointer transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 border border-indigo-500/25 group-hover:bg-indigo-500/20 transition-colors">
            <User className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{data.name}</p>
            <p className="text-xs text-zinc-500">{data.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <Pencil className="h-3 w-3 text-indigo-400" />
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </div>
      </div>

      <ProfileModal
        key={`${data.name}-${data.email}`}
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        onSave={onUpdate}
      />
    </>
  );
}
