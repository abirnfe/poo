import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Abir1050@@";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function requireAdmin(): Promise<true> {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }
  return true;
}

export function getAdminSessionOptions() {
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}
