import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardPath } from "../../lib/authRedirects";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signin(email, password);
      if (result.success) {
        const data = result.data as { user?: { role?: string } } | undefined;
        toast.success("Signed in successfully.");
        navigate(getDashboardPath(data?.user?.role), { replace: true });
      } else {
        toast.error(result.error ?? "Invalid email or password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold" style={{ color: "#112516" }}>
          Welcome back
        </h2>
        <p className="text-sm mt-1" style={{ color: "#769183" }}>
          Sign in to your Veteran Healing account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "#112516" }}
          >
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
            style={{
              border: "1.5px solid #d1d5db",
              color: "#112516",
              background: "#fff",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#113B2C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium"
              style={{ color: "#112516" }}
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium hover:underline"
              style={{ color: "#113B2C" }}
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 rounded-xl text-sm transition-all outline-none"
              style={{
                border: "1.5px solid #d1d5db",
                color: "#112516",
                background: "#fff",
              }}
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
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded"
            style={{ accentColor: "#113B2C" }}
          />
          <label htmlFor="remember-me" className="text-sm" style={{ color: "#112516" }}>
            Remember me
          </label>
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
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Switch to signup */}
      <p className="mt-6 text-center text-sm" style={{ color: "#769183" }}>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-semibold hover:underline"
          style={{ color: "#113B2C" }}
        >
          Create account
        </button>
      </p>
    </div>
  );
}
