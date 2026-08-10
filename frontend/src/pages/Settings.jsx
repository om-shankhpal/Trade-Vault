import { useState } from "react";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { changePassword } from "../services/settings.service";

function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const togglePassword = (field) => {
    setShowPassword((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccessMessage("Password changed successfully.");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage security parameters and authentication preferences.
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

      {/* Security Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Security & Credentials
            </h2>
            <p className="text-xs text-slate-500">
              Update your account password
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                required
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-10 text-xs text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => togglePassword("current")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                required
                value={form.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-10 text-xs text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-10 text-xs text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 shadow-sm"
            >
              {loading ? "Changing Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
        <div className="flex items-center gap-2 text-rose-700">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Danger Zone
          </h2>
        </div>

        <p className="mt-2 text-xs text-slate-600">
          Account deletion features are managed by system administrators.
        </p>

        <button
          disabled
          className="mt-4 rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-xs font-semibold text-rose-400 opacity-60 cursor-not-allowed"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;