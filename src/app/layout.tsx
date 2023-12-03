import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppin = Poppins({
  weight: ["300", "400", "700", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harvi Sketch Board",
  description: "A simple and easy to use sketch board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppin.className}>{children}</body>
    </html>
  );
}
