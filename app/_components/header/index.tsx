import Link from "next/link";
import UserAvatar from "./_components/user-avatar";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-16 py-4 border-b border-gray-200">
      <div>
        <Link href="/" className="text-xl font-bold">
          NextAuth Cloudflare Starter
        </Link>
      </div>
      <UserAvatar />
    </header>
  );
}
