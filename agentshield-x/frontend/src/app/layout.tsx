import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AgentShield X | AI Security Platform",
  description:
    "Runtime Integrity Monitoring for Autonomous AI Agents — detect drift, prevent prompt injection, and log everything to the blockchain.",
  keywords: ["AI Security", "Agent Monitoring", "Blockchain Audit", "Runtime Integrity", "AI Safety", "AgentShield X"],
  authors: [{ name: "AgentShield X Team" }],
  creator: "AgentShield X",
  publisher: "AgentShield X",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agentshield-x.vercel.app",
    siteName: "AgentShield X",
    title: "AgentShield X | AI Security Platform",
    description: "Runtime Integrity Monitoring for Autonomous AI Agents — detect drift, prevent prompt injection, and log everything to the blockchain.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgentShield X Dashboard Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentShield X | AI Security Platform",
    description: "Runtime Integrity Monitoring for Autonomous AI Agents — detect drift, prevent prompt injection, and log everything to the blockchain.",
    images: ["/og-image.png"],
    creator: "@agentshieldx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0b0e14] text-[#f1f3fc]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
