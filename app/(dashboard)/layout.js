import "../globals.css";
import DashboardNav from "@/components/DashboardNav"
import DashboardSideBar from "@/components/DashboardSideBar"

export const metadata = {
  title: 'Dashboard',
  description: 'Make money playing games and doing tasks - Make Money Online',
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <section className="bg-base-4 w-full min-h-screen overflow-x-hidden">
      <DashboardNav />
      <div className="flex w-full min-h-screen">
        
        {/* Sidebar - Hidden on Mobile, Visible on Desktop */}
        <aside className="">
          <DashboardSideBar />
        </aside>

        {/* Main Content - Ensures No Overflow */}
        <main className="flex-1 p-4 max-md:p-0 w-full min-w-0 h-screen overflow-y-auto">
          {children}
        </main>

      </div>
    </section>
  )
}
