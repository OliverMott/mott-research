import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mottresearch.com"),
  title: "Mott Research - Inventing, Consulting & Product Development",
  description:
    "Mott Research is a well established invention, product development & consultancy company.",
  keywords:
    "innovation,invention,inventions,inventors,inventing,innovated,innovating,product development,product development consultant,business innovation,innovation business,innovation and business,innovation in business,business and innovation,inventive",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">{children}</body>
    </html>
  );
}
