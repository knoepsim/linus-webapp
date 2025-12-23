import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import PrivacyModal from "./components/PrivacyModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linus - Content Creator & YouTuber",
  description: "Willkommen auf der offiziellen Webseite von Linus. Entdecke die neuesten Videos, Social Media Content und bleibe auf dem Laufenden mit den aktuellsten Entwicklungen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <PrivacyModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
