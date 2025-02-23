import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"]
})


export const metadata: Metadata = {
  title: "Claim processing",
  description: "Fast, Hassle-Free Claims. Anytime, Anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${spectral.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
