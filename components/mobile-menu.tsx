"use client"

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, BarChart3, Users, Settings, PlusCircle } from 'lucide-react'

const mobileNavItems = [
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

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-lg font-semibold">EnterpriseConnect Pro</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
          <div className="space-y-1 p-2">
            {mobileNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button className="w-full" asChild onClick={() => setOpen(false)}>
            <Link href="/admin">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Company
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

