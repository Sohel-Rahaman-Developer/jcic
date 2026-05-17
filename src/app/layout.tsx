import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "JCIC - Startup & Innovation Platform",
  description: "Empowering startups, projects, and innovation inside Jadavpur University ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" style={{ colorScheme: "light" }}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
