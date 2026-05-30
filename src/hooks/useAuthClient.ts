import { createAuthClient } from "better-auth/client";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const authBaseUrl = `${apiUrl}/auth`;

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
});

export async function signup(email: string, password: string, name: string) {
  try {
    const response = await authClient.signUp.email({ email, password, name });
    if (response.error) {
      return { success: false, error: response.error.message ?? "Signup failed" };
    }
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Signup failed" };
  }
}

export async function signin(email: string, password: string) {
  try {
    const response = await authClient.signIn.email({ email, password });
    if (response.error) {
      return { success: false, error: response.error.message ?? "Sign in failed" };
    }
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Sign in failed" };
  }
}

export async function signout() {
  try {
    await authClient.signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Sign out failed" };
  }
}

export async function getSession() {
  try {
    const session = await authClient.getSession();
    return session.data;
  } catch {
    return null;
  }
}

export async function updateProfile(name: string, image?: string | null) {
  try {
    const response = await authClient.updateUser({
      name,
      ...(image !== undefined && { image }),
    });
    if (response.error) {
      return { success: false, error: response.error.message ?? "Update failed" };
    }
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Update failed" };
  }
}
