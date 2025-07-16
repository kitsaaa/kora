import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KORA",
  description: "KORA - ecommerce shop",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}> 
      <head>
        <link rel="icon" href="/logo_favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased bg-zinc-50 text-zinc-900">
        {children}
      </body>
    </html>
  );
}
