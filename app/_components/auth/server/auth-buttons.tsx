import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button variant="outline" type="submit">
        Sign in
      </Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="outline" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
