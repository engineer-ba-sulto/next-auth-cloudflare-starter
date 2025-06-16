import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { SignIn } from "../_components/auth/server/auth-buttons";

export default async function PublicPage() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">PublicPage</h1>
      <p className="text-xl">
        LPなどの
        <span className="text-red-500 font-bold">すべてのユーザー</span>
        に公開するページ
      </p>
      {session ? (
        <Button asChild>
          <Link href="/product">Product</Link>
        </Button>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
