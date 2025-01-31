import "../globals.css";
import DashboardNav from "@/components/DashboardNav"
import DashboardSideBar from "@/components/DashboardSideBar"

export const metadata = {
  title: 'Dashboard',
  description: 'Make money playing games and doing tasks - Make Money Online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base-4">
        <DashboardNav/>
        <div className="grid grid-cols-[auto,1fr] min-h-screen">
          <DashboardSideBar/>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
