"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/auth";

export function SignIn() {
  return (
    <Button variant="outline" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}

export function SignOut() {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
