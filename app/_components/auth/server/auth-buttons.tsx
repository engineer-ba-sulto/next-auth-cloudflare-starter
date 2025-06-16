import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(undefined, { redirectTo: "/product" });
      }}
    >
      <Button variant="outline" type="submit" className="w-full">
        サインイン
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
        サインアウト
      </Button>
    </form>
  );
}
