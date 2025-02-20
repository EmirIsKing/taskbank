import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

export const viewport = "width=device-width, initial-scale=1";

export const metadata = {
  title: "TaskBank | Make Money Online Easily",
  description:
    "Earn money online by completing tasks, playing games, and referrals. Get paid through Mobile Money, Litecoin, and more.",
  keywords: [
    "taskbank",
    "taskbank.online",
    "how to make money online",
    "make money online",
    "how to make money online in ghana",
    "make money online brainbright",
    "how to make money online for beginners",
    "ways to make money online",
    "money6x.com make money online",
    "best ways to make money online",
    "how to make money online for free",
    "easy ways to make money online",
    "make money online from home",
    "make money online fast",
    "best way to make money online",
    "how make money online",
    "how can i make money online",
    "quick ways to make money online",
    "how to make money online fast",
    "legit ways to make money online",
    "how to make money online as a teen",
    "how to make money online from home",
    "how to make money online without paying anything",
    "make money online today",
    "how can i make money online",
    "how to make money online for free",
    "how to make money online in ghana as a student",
    "make money online in ghana",
    "how to make money online in ghana through mobile money",
    "how do i make money online",
    "make money online from home",
    "ways to make money online",
    "make money online tapswap code",
    "how to make money online without paying anything",
    "apps to make money online",
    "how make money online",
    "how can i make money online in ghana",
    "apps to make money online in ghana",
    "how to make money online working from home",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://taskbank.online/",
  },
  openGraph: {
    title: "TaskBank | Make Money Online Easily",
    description:
      "Earn real money online by completing tasks, surveys, and offers. Withdraw through Mobile Money, crypto, and more!",
    url: "https://taskbank.online/",
    type: "website",
    images: [
      {
        url: "https://taskbank.online/coin-logo.png",
        width: 1200,
        height: 630,
        alt: "TaskBank - Earn Money Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskBank | Make Money Online",
    description:
      "Earn money online by completing tasks, playing games, and referrals. Get paid through Mobile Money, Litecoin, and more.",
    images: ["https://taskbank.online/coin-logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://taskbank.online/" />
          <meta property="og:title" content="TaskBank | Make Money Online" />
          <meta
            property="og:description"
            content="Earn real money online by completing tasks, surveys, and offers. Withdraw through Mobile Money, crypto, and more!"
          />
          <meta
            property="og:image"
            content="https://taskbank.online/coin-logo.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="TaskBank | Make Money Online" />
          <meta
            name="twitter:description"
            content="Earn money online by completing tasks, playing games, and referrals. Get paid through Mobile Money, Litecoin, and more."
          />
          <meta
            name="twitter:image"
            content="https://taskbank.online/coin-logo.png"
          />
        </head>
        <body>
        <ClerkProvider>
          <Analytics />
          {children}
          <Toaster />
        </ClerkProvider>
        </body>
      </html>
  );
}
