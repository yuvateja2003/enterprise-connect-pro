"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, BarChart3, Users, Settings, PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Calendar,
  },
  {
    title: "Companies",
    href: "/companies",
    icon: Users,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex flex-col border-r bg-card w-64">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-primary">EnterpriseConnect Pro</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sidebarNavItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4">
        <Button className="w-full" asChild>
          <Link href="/admin">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>
    </nav>
  )
}

