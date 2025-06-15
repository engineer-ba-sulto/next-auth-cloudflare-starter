import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">ProductPage</h1>
      <p>アプリやサービスなどの登録ユーザーに公開するページ</p>
      <Link href="/">Home</Link>
    </div>
  );
}
