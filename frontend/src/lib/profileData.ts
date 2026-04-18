 
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { UserProfile } from "@/types/profile";
// import jwt from "jsonwebtoken";


// export const mockUser: UserProfile = {
//   id: "1",
//   username: "fashtech_user",
//   email: "user@fashtech.com",
//   initials: "FU",
// };
 
// export const navLinks = ["HOME", "SHOP", "BOARDS", "OUTFITS"];
 
// // ─── Helper: derive initials from username or email ───────────────────────────
// function getInitials(username: string): string {
//   const parts = username.replace(/[._-]/g, " ").trim().split(/\s+/);
//   if (parts.length >= 2) {
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   }
//   return username.slice(0, 2).toUpperCase();
// }
 
// // ─── Main: get the currently logged-in user ───────────────────────────────────
// // Supports three popular Next.js auth setups — uncomment the one you use.
 
// export async function getLoggedInUser(): Promise<UserProfile> {
 
//   // ══════════════════════════════════════════════════════════════
//   // OPTION A — NextAuth / Auth.js  (most common)
//   // npm install next-auth
//   // ══════════════════════════════════════════════════════════════
//   // import { getServerSession } from "next-auth";
//   // import { authOptions } from "@/lib/authOptions"; // your [...nextauth] config
//   //
//   // const session = await getServerSession(authOptions);
//   // if (!session?.user) redirect("/auth/login");
//   //
//   // return {
//   //   id:       session.user.id       ?? "",
//   //   username: session.user.name     ?? session.user.email ?? "user",
//   //   email:    session.user.email    ?? "",
//   //   initials: getInitials(session.user.name ?? session.user.email ?? "U"),
//   // };
 
 
//   // ══════════════════════════════════════════════════════════════
//   // OPTION B — Clerk
//   // npm install @clerk/nextjs
//   // ══════════════════════════════════════════════════════════════
//   // import { currentUser } from "@clerk/nextjs/server";
//   //
//   // const clerkUser = await currentUser();
//   // if (!clerkUser) redirect("/auth/login");
//   //
//   // const username =
//   //   clerkUser.username ??
//   //   ${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}.trim();
//   //
//   // return {
//   //   id:       clerkUser.id,
//   //   username,
//   //   email:    clerkUser.emailAddresses[0]?.emailAddress ?? "",
//   //   initials: getInitials(username),
//   // };
 
 
//   // ══════════════════════════════════════════════════════════════
//   // OPTION C — Custom JWT in cookie (manual auth)
//   // ══════════════════════════════════════════════════════════════
  
  
//   const cookieStore = cookies();
//   const token = cookieStore.get("session_token")?.value;
//   if (!token) redirect("/auth/login");
  
//   let payload: any;
//   try {
//     payload = jwt.verify(token, process.env.JWT_SECRET!);
//   } catch {
//     redirect("/auth/login");
//   }
  
//   // Optionally fetch fresh data from DB using payload.userId:
//   // const dbUser = await prisma.user.findUnique({ where: { id: payload.userId } });
  
//   return {
//     id:       payload.userId,
//     username: payload.username,
//     email:    payload.email,
//     initials: getInitials(payload.username),
//   };
 
 
//   // ── TEMPORARY fallback (remove once auth is wired up) ────────────────────
//   // Delete this block after uncommenting one of the options above.
//   throw new Error(
//     "getLoggedInUser: please uncomment the auth option that matches your setup in lib/profileData.ts"
//   );
// }

import { UserProfile } from "@/types/profile";

export const mockUser: UserProfile = {
  id: "1",
  username: "fashtech_user",
  email: "user@fashtech.com",
  initials: "FU",
};

export const navLinks = ["HOME", "SHOP", "BOARDS", "OUTFITS"];
