import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bio-Kinetic Gas Predictor",
  description: "AI-Powered Hazardous Gas Prediction System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-50 selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}