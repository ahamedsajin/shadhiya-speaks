import { cookies } from "next/headers";
import { SESSION_COOKIE, getAuthConfig, verifySessionToken } from "./auth";

/** True when the current request carries a valid admin session cookie. */
export async function hasAdminSession(): Promise<boolean> {
  const config = getAuthConfig();
  if (!config) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token, config.secret);
}
