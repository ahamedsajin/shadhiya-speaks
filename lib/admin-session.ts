import { cookies } from "next/headers";
import { isSessionTokenCurrent } from "./admin-credentials";
import { SESSION_COOKIE } from "./auth";

/** True when the current request carries a valid admin session for the current password. */
export async function hasAdminSession(): Promise<boolean> {
  return isSessionTokenCurrent((await cookies()).get(SESSION_COOKIE)?.value);
}
