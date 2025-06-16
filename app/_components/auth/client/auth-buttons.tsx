"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/auth";

export function SignIn() {
  return (
    <Button
      variant="outline"
      onClick={() => signIn(undefined, { redirectTo: "/product" })}
    >
      サインイン
    </Button>
  );
}

export function SignOut() {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      サインアウト
    </Button>
  );
}
