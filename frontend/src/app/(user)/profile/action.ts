"use server";

import { redirect } from "next/navigation";

// ─── Save Profile ─────────────────────────────────────────────────────────────
export async function saveProfile(formData: FormData) {
  const username = (formData.get("username") as string)?.trim();
  const email    = (formData.get("email")    as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  if (!username || !email) {
    // In a real app, return a validation error to the form.
    // For now we just redirect back without saving.
    redirect("/profile?error=missing_fields");
  }

  // ══════════════════════════════════════════════════════════════
  // OPTION A — NextAuth + Prisma (update DB directly)
  // ══════════════════════════════════════════════════════════════
  // import { getServerSession } from "next-auth";
  // import { authOptions } from "@/lib/authOptions";
  // import { prisma } from "@/lib/prisma";
  // import bcrypt from "bcryptjs";
  //
  // const session = await getServerSession(authOptions);
  // if (!session?.user?.id) redirect("/auth/login");
  //
  // const data: Record<string, string> = { username, email };
  // if (password) data.passwordHash = await bcrypt.hash(password, 10);
  //
  // await prisma.user.update({
  //   where: { id: session.user.id },
  //   data,
  // });


  // ══════════════════════════════════════════════════════════════
  // OPTION B — Clerk (update via Clerk backend API)
  // ══════════════════════════════════════════════════════════════
  // import { auth, clerkClient } from "@clerk/nextjs/server";
  //
  // const { userId } = auth();
  // if (!userId) redirect("/auth/login");
  //
  // await clerkClient.users.updateUser(userId, {
  //   username,
  //   primaryEmailAddressID: email, // or handle separately
  //   ...(password ? { password } : {}),
  // });


  // ══════════════════════════════════════════════════════════════
  // OPTION C — Custom JWT + Prisma
  // ══════════════════════════════════════════════════════════════
  // import { cookies } from "next/headers";
  // import jwt from "jsonwebtoken";
  // import { prisma } from "@/lib/prisma";
  // import bcrypt from "bcryptjs";
  //
  // const token = cookies().get("session_token")?.value;
  // if (!token) redirect("/auth/login");
  //
  // const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  //
  // const data: Record<string, string> = { username, email };
  // if (password) data.passwordHash = await bcrypt.hash(password, 10);
  //
  // await prisma.user.update({ where: { id: payload.userId }, data });

  redirect("/profile?success=true");
}


// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout() {

  // ══════════════════════════════════════════════════════════════
  // OPTION A — NextAuth
  // ══════════════════════════════════════════════════════════════
  // import { signOut } from "next-auth/react";
  // Note: signOut() is client-only in NextAuth. Instead, redirect to the
  // built-in signout endpoint which NextAuth handles server-side:
  //
  redirect("/api/auth/signout");


  // ══════════════════════════════════════════════════════════════
  // OPTION B — Clerk
  // ══════════════════════════════════════════════════════════════
  // Clerk handles logout via its middleware — just redirect:
  // redirect("/sign-out"); // or your Clerk signOut route


  // ══════════════════════════════════════════════════════════════
  // OPTION C — Custom JWT cookie
  // ══════════════════════════════════════════════════════════════
  // import { cookies } from "next/headers";
  // cookies().delete("session_token");
  // redirect("/auth/login");
}