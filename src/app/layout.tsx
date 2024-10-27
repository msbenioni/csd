import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean Sweep Duo",
  description:
    "Professional rubbish removal service in South and East Auckland",
  icons: {
    icon: "/images/duofavicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
