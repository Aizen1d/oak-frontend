import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AOS from "@/components/AOS"
import Container from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OakTree Innovations",
  description: "This is the frontend for the Oak Assessment Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-BACKGROUND`}>
        <AOS />
        <Toaster />

        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
