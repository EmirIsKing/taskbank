export const metadata = {
  title: 'Dashboard',
  description: 'Make money playing games and doing tasks - Make Money Online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
