import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clean Sweep Duo",
  description:
    "Family run rubbish removal service in South and East Auckland",
  viewport: "width=device-width, initial-scale=1",
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
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
