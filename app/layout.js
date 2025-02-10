import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from '@clerk/nextjs'
import Script from "next/script";

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
        <Script
        id="tawk-chat"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/67a918d3825083258e12901e/1ijm8hvht';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
          <Analytics/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
