"use client";

import { signIn, signOut } from "@/lib/auth";

export function SignIn() {
  return <button onClick={() => signIn()}>Sign In</button>;
}

export function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
