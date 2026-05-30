import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession, signup, signin, signout, updateProfile } from "../hooks/useAuthClient";

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: unknown;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  signin: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  signout: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (name: string, image?: string | null) => Promise<{ success: boolean; error?: string; data?: unknown }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentSession = await getSession();
        if (currentSession?.user) {
          setUser(currentSession.user as User);
          setSession(currentSession);
        }
      } catch (error) {
        console.error("Failed to check session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleSignup = async (email: string, password: string, name: string) => {
    const result = await signup(email, password, name);
    if (result.success && result.data) {
      const data = result.data as { user?: User; session?: unknown };
      setUser(data.user ?? null);
      setSession(data.session ?? null);
    }
    return result;
  };

  const handleSignin = async (email: string, password: string) => {
    const result = await signin(email, password);
    if (result.success && result.data) {
      const data = result.data as { user?: User; session?: unknown };
      setUser(data.user ?? null);
      setSession(data.session ?? null);
    }
    return result;
  };

  const handleSignout = async () => {
    const result = await signout();
    if (result.success) {
      setUser(null);
      setSession(null);
    }
    return result;
  };

  const handleUpdateProfile = async (name: string, image?: string | null) => {
    const result = await updateProfile(name, image);
    if (result.success) {
      setUser(prev => prev ? { ...prev, name, ...(image !== undefined && { image }) } : null);
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signup: handleSignup,
        signin: handleSignin,
        signout: handleSignout,
        updateProfile: handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
