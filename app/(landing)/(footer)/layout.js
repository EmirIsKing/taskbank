import "../../globals.css";
import LandingNavBar from "@/components/LandingNavBar";
import LandingFooter from "@/components/LandingFooter";
import PolicyNav from "@/components/PolicyNav";

export const metadata = {
  title: "TaskBank | Earn Money Online Easily",
  description:
    "Earn money online by completing tasks, playing games, and referrals. Get paid through Mobile Money, Litecoin, and more.",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://taskbank.online/",
  },
  openGraph: {
    title: "TaskBank | Earn Money Online Easily",
    description:
      "Earn real money online by completing tasks, surveys, and offers. Withdraw through Mobile Money, crypto, and more!",
    url: "https://taskbank.online/",
    type: "website",
    images: [
      {
        url: "https://taskbank.online/coin-logo.png", // ✅ FIXED double slash issue
        width: 1200,
        height: 630,
        alt: "TaskBank - Earn Money Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskBank | Earn Money Online",
    description:
      "Earn money online by completing tasks, playing games, and referrals. Get paid through Mobile Money, Litecoin, and more.",
    images: ["https://taskbank.online/coin-logo.png"], // ✅ FIXED double slash issue
  },
};

export default function Layout({ children }) {
  return (
    <>
      <section>
        <nav>
          <LandingNavBar />
        </nav>
        <PolicyNav />
        {children}
        <LandingFooter />
      </section>
    </>
  );
}
