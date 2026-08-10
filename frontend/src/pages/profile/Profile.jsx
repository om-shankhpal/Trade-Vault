import { useEffect, useState } from "react";
import { Camera, User, CheckCircle2, AlertCircle } from "lucide-react";

import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "../../services/profile.service";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setFullName(data.fullName || "");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load profile parameters.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) return;

    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const updatedProfile = await updateProfilePicture(selectedFile);
      setProfile(updatedProfile);
      setSelectedFile(null);
      setPreview("");
      setSuccessMessage("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Failed to upload profile picture.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const updatedProfile = await updateProfile({
        fullName,
      });

      setProfile(updatedProfile);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-xs font-semibold text-slate-400 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Account Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal trader identity and avatar settings.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
        {/* Avatar Presentation */}
        <div className="flex flex-col items-center border-b border-slate-100 pb-8">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 rounded-full border-4 border-slate-100 object-cover shadow-md"
              />
            ) : profile?.profilePicture?.url ? (
              <img
                src={profile.profilePicture.url}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-slate-100 object-cover shadow-md"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-100 text-slate-400 shadow-inner">
                <User className="h-16 w-16" />
              </div>
            )}

            <label
              htmlFor="profile-picture"
              className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800"
              title="Change picture"
            >
              <Camera className="h-4 w-4" />
            </label>

            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            {profile?.fullName || "Trader"}
          </h2>

          <p className="text-xs text-slate-500 font-mono">{profile?.email}</p>

          {selectedFile && (
            <button
              onClick={handleUploadPicture}
              disabled={saving}
              className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 shadow-sm"
            >
              {saving ? "Uploading Picture..." : "Save Profile Picture"}
            </button>
          )}
        </div>

        {/* Profile Inputs */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-3 text-xs text-slate-400 font-mono"
            />
            <p className="mt-1 text-[11px] text-slate-400">Email address cannot be changed</p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 shadow-sm"
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;