import { useEffect, useState } from "react";
import { FaCamera, FaUser } from "react-icons/fa";

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);
      setFullName(data.fullName);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) return;

    try {
      setSaving(true);

      const updatedProfile = await updateProfilePicture(selectedFile);

      setProfile(updatedProfile);

      setSelectedFile(null);
      setPreview("");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      const updatedProfile = await updateProfile({
        fullName,
      });

      setProfile(updatedProfile);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-10 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-40 rounded-full border-4 border-slate-200 object-cover shadow"
              />
            ) : profile.profilePicture?.url ? (
              <img
                src={profile.profilePicture.url}
                alt="Profile"
                className="h-40 w-40 rounded-full border-4 border-slate-200 object-cover shadow"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-slate-200 bg-slate-100 shadow">
                <FaUser className="text-6xl text-slate-400" />
              </div>
            )}

            <label
              htmlFor="profile-picture"
              className="absolute bottom-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
            >
              <FaCamera />
            </label>

            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            {profile.fullName}
          </h2>

          <p className="text-slate-500">{profile.email}</p>

          {selectedFile && (
            <button
              onClick={handleUploadPicture}
              disabled={saving}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Uploading..." : "Upload New Picture"}
            </button>
          )}
        </div>

        <hr className="my-10" />

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;