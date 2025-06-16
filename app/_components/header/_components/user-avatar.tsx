import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signIn, signOut } from "@/lib/auth";
import { UserIcon } from "lucide-react";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {session?.user?.image ? (
            <Image
              src={session.user.image!}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <UserIcon className="w-10 h-10 rounded-full border border-gray-500" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {session?.user?.name && (
            <>
              <DropdownMenuLabel>アカウント</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
              <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem asChild>
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="w-full text-start">
                  サインアウト
                </button>
              </form>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn(undefined, { redirectTo: "/product" });
                }}
              >
                <button type="submit" className="w-full text-start">
                  サインイン
                </button>
              </form>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
