import { SignIn, SignOut } from "../_components/auth/server/auth-buttons";

export default function PublicPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">PublicPage</h1>
      <p>LPなどのすべてのユーザーに公開するページ</p>
      <SignIn />
      <SignOut />
    </div>
  );
}
