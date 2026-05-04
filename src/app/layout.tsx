import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import BlogHeader from "@/ui/header/header";
import { LoaderProvider } from "@/shared/context/loader-context";
import { GlobalLoader } from "@/ui/loader/global-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plug & Play Blog",
  description: "Blog de Plug & Play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoaderProvider>
            <GlobalLoader />
            <BlogHeader/>
            {children}
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
