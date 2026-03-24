import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘의집 파트너센터",
  description: "오늘의집 파트너센터 - 판매자 관리 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
