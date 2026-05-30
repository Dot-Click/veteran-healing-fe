import { useState } from "react";
import { Link } from "react-router-dom";
import AuthSidebar from "../components/auth/AuthSidebar";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#FCFCF1" }}>
      {/* Left: Hero sidebar — hidden on mobile, shown md+ */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 h-full">
        <AuthSidebar />
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Top nav bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#e5e7eb" }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: "#113B2C" }}
          >
            <span>←</span>
            <span>Back to site</span>
          </Link>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm font-medium px-4 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: "#113B2C",
              color: "#113B2C",
              background: "transparent",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#113B2C";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#113B2C";
            }}
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </div>

        {/* Mobile-only brand header */}
        <div
          className="md:hidden px-6 py-5 border-b"
          style={{ background: "#113B2C", borderColor: "#0F402F" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "#3B6E56" }}
            >
              VH
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Veteran Healing</p>
              <p className="text-green-300 text-xs">Holistic Mushroom Wellness</p>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Animated form swap */}
            <div key={mode}>
              {mode === "login" ? (
                <LoginForm onSwitchToSignup={() => setMode("signup")} />
              ) : (
                <SignupForm onSwitchToLogin={() => setMode("login")} />
              )}
            </div>

            {/* Legal note */}
            <p className="mt-8 text-center text-xs leading-relaxed" style={{ color: "#769183" }}>
              By continuing, you agree to our{" "}
              <Link
                to="/statement-of-faith"
                className="underline hover:opacity-80"
                style={{ color: "#113B2C" }}
              >
                Terms & Disclaimers
              </Link>
              . These products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
