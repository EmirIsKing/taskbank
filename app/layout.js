import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
