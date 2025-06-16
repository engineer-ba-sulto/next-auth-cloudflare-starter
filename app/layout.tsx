import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "./_components/header";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NextAuth Cloudflare Starter",
  description:
    "Bunランタイムで動作するNext.jsアプリのスターターテンプレート。Next.js App Router, Auth.js v5, Cloudflare D1 (Drizzle ORM) を使用し、Cloudflare Workersにデプロイ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
