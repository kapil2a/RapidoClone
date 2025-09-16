// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-racing" });
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-speed",
});

export const metadata: Metadata = {
  title: "Racing Rapido - Ride the Fast Lane 🏁",
  description:
    "F1 & MotoGP themed ride-hailing app. Book your race to the destination!",
  keywords: "ride sharing, F1, MotoGP, racing, fast delivery, bike taxi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-f1-black via-gray-900 to-f1-black text-white">
            <Navbar />
            <main className="pb-16">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
