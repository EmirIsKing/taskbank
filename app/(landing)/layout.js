import localFont from "next/font/local";
import "../globals.css";
import { ReactLenis } from "lenis/react";
import LandingNavBar from "../../components/LandingNavBar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Task Bank | Make Money Online Easily",
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
  openGraph: {
    title: "Task Bank | Make Money Online",
    description:
      "Earn real money online by completing tasks, surveys, and offers. Withdraw through Mobile Money, crypto, and more!",
    url: "https://www.taskbank.online",
    type: "website",
    images: [
      {
        url: "https://www.taskbank.online/coin-logo.png",
        width: 1200,
        height: 630,
        alt: "Task Bank - Earn Money Online",
      },
    ],
  },
};

export default function Layout({ children }) {
  return (
      <section>
        <nav>
          <LandingNavBar />
        </nav>
        <ReactLenis root>{children}</ReactLenis>
      </section>
  );
}
