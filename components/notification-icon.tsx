"use client"

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useStateContext } from '@/lib/state-context'

export function NotificationIcon() {
  const { companies } = useStateContext()
  const [notifications, setNotifications] = useState<Array<{ message: string; type: 'overdue' | 'due' }>>([])

  useEffect(() => {
    const newNotifications = companies
      .filter(company => company.status === 'overdue' || company.status === 'due')
      .map(company => {
        const nextComm = new Date(company.nextComm!)
        const today = new Date()
        const daysDiff = Math.ceil((nextComm.getTime() - today.getTime()) / (1000 * 3600 * 24))
        
        return {
          message: daysDiff < 0
            ? `Communication with ${company.name} is overdue by ${Math.abs(daysDiff)} day(s)!`
            : `Communication with ${company.name} is due in ${daysDiff} day(s)`,
          type: daysDiff < 0 ? 'overdue' as const : 'due' as const
        }
      })
      .sort((a, b) => (a.type === 'overdue' ? -1 : 1))
    
    setNotifications(newNotifications)
  }, [companies])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications.length > 0 && (
            <Badge 
              className={`absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-[1.2rem] flex items-center justify-center ${
                notifications.some(n => n.type === 'overdue') ? 'bg-destructive' : ''
              }`}
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification, index) => (
                <li 
                  key={index} 
                  className={`text-sm p-2 rounded ${
                    notification.type === 'overdue' 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-yellow-100 dark:bg-yellow-900/20'
                  }`}
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No pending notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

