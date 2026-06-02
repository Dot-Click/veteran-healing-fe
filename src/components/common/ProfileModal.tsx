import { useEffect, useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { uploadService } from "../../services/uploadService";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (open && user) {
      setProfileName(user.name);
      setProfileImage(user.image ?? "");
    }
  }, [open, user]);

  if (!open) return null;

  const handleClose = () => {
    if (user) {
      setProfileName(user.name);
      setProfileImage(user.image ?? "");
    }
    onClose();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, or WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadService.uploadFile(file);
      setProfileImage(result.url);
      toast.success("Photo uploaded");
    } catch {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateProfile(profileName.trim(), profileImage || null);
      if (result.success) {
        toast.success("Profile updated successfully!");
        onClose();
      } else {
        toast.error(result.error ?? "Failed to update profile.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close profile modal"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-brand-border/20 bg-white shadow-xl sm:max-w-md">
        <div className="flex items-start justify-between gap-3 bg-brand-primary px-4 py-3 text-white sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h2 id="profile-modal-title" className="text-lg font-bold">
              My Profile
            </h2>
            <p className="mt-0.5 text-xs text-green-100/90">Update your account details</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 hover:bg-white/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[min(70vh,32rem)] overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <div className="mb-4 flex flex-col items-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-16 w-16 rounded-full border-2 border-brand-primary/20 object-cover shadow-sm"
                onError={(ev) => {
                  ev.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profileName)}`;
                }}
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-primary/20 bg-brand-cream text-xl font-bold text-brand-primary">
                {profileName.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={handleAvatarUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-border/30 bg-brand-cream-light px-3 py-1.5 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-cream disabled:opacity-50"
            >
              <Upload size={14} />
              {isUploading ? "Uploading..." : "Upload photo"}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Full name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </label>
              <input
                type="email"
                value={user?.email ?? ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Role
              </label>
              <p className="inline-flex rounded-lg bg-brand-cream/50 px-3 py-1.5 text-xs font-bold capitalize text-brand-cta">
                {user?.role ?? "customer"}
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating || isUploading}
              className="flex-1 rounded-lg bg-brand-cta py-2 text-sm font-semibold text-white hover:bg-brand-primary disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
