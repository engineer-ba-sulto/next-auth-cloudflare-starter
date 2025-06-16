import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">ProductPage</h1>
      <p className="text-xl">
        アプリやサービスなどの
        <span className="text-red-500 font-bold">登録ユーザー</span>
        に公開するページ
      </p>
      <Button asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
}
