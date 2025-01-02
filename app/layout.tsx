import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { StateProvider } from '@/lib/state-context'
import { NotificationIcon } from '@/components/notification-icon'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import { MobileMenu } from '@/components/mobile-menu'
import { PageTransition } from '@/components/page-transition'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EnterpriseConnect Pro',
  description: 'Track and manage company communications efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StateProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between space-x-4 border-b px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <MobileMenu />
                    <h1 className="text-xl font-bold md:hidden">EnterpriseConnect Pro</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <NotificationIcon />
                    <ThemeToggle />
                    <UserNav />
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto bg-background">
                  <PageTransition>{children}</PageTransition>
                </main>
              </div>
            </div>
            <Toaster />
          </StateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

