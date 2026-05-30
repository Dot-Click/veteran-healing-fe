import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardPath } from "../../lib/authRedirects";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  if (password.length === 0) return { label: "", color: "#e5e7eb", width: "0%" };
  if (password.length < 6) return { label: "Too short", color: "#EF4444", width: "25%" };
  if (password.length < 8) return { label: "Weak", color: "#F97316", width: "50%" };
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
    return { label: "Fair", color: "#EAB308", width: "65%" };
  if (password.length >= 10)
    return { label: "Strong", color: "#22C55E", width: "100%" };
  return { label: "Good", color: "#3B6E56", width: "80%" };
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(password);

  const validate = (): string | null => {
    if (!name.trim()) return "Please enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(email, password, name.trim());
      if (result.success) {
        const data = result.data as { user?: { role?: string } } | undefined;
        toast.success("Account created successfully.");
        setSuccess(true);
        setTimeout(() => navigate(getDashboardPath(data?.user?.role), { replace: true }), 1200);
      } else {
        toast.error(result.error ?? "Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
          style={{ background: "#113B2C" }}
        >
          ✓
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#112516" }}>
          Account created!
        </h2>
        <p className="text-sm" style={{ color: "#769183" }}>
          Redirecting you to the dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-2xl font-bold" style={{ color: "#112516" }}>
          Create your account
        </h2>
        <p className="text-sm mt-1" style={{ color: "#769183" }}>
          Join the Veteran Healing community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "#112516" }}
          >
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Veteran"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
            style={{ border: "1.5px solid #d1d5db", color: "#112516", background: "#fff" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#113B2C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "#112516" }}
          >
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
            style={{ border: "1.5px solid #d1d5db", color: "#112516", background: "#fff" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#113B2C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "#112516" }}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-3 pr-12 rounded-xl text-sm transition-all outline-none"
              style={{ border: "1.5px solid #d1d5db", color: "#112516", background: "#fff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#113B2C")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
              style={{ color: "#769183" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Strength bar */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: strength.width, background: strength.color }}
                />
              </div>
              {strength.label && (
                <p className="text-xs mt-1 font-medium" style={{ color: strength.color }}>
                  {strength.label}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="signup-confirm"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "#112516" }}
          >
            Confirm password
          </label>
          <input
            id="signup-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
            style={{
              border: `1.5px solid ${
                confirmPassword && confirmPassword !== password ? "#EF4444" : "#d1d5db"
              }`,
              color: "#112516",
              background: "#fff",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#113B2C")}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor =
                confirmPassword && confirmPassword !== password ? "#EF4444" : "#d1d5db")
            }
          />
          {confirmPassword && confirmPassword !== password && (
            <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
              Passwords do not match
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
          style={{
            background: isLoading ? "#769183" : "#0F402F",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          onMouseOver={(e) => {
            if (!isLoading) e.currentTarget.style.background = "#113B2C";
          }}
          onMouseOut={(e) => {
            if (!isLoading) e.currentTarget.style.background = "#0F402F";
          }}
        >
          {isLoading ? (
            <>
              <span
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Switch to login */}
      <p className="mt-3 text-center text-sm" style={{ color: "#769183" }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold hover:underline"
          style={{ color: "#113B2C" }}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
