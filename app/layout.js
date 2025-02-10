import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from '@clerk/nextjs'

export const viewport = "width=device-width, initial-scale=1";

export const metadata = {
  title: "TaskBank",
  description: "Make money playing games and doing tasks - Make Money Online",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Analytics/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
