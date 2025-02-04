import "./globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "TaskBank",
  description: "Make money playing games and doing tasks - Make Money Online",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Analytics/>
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
