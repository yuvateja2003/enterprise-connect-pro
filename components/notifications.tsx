"use client"

import { useEffect, useState } from 'react'
import { useStateContext } from '@/lib/state-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'

export function Notifications() {
  const { companies } = useStateContext()
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const today = new Date()
    const newNotifications = companies.flatMap(company => {
      const nextComm = new Date(company.nextComm!)
      const daysDiff = Math.ceil((nextComm.getTime() - today.getTime()) / (1000 * 3600 * 24))
      
      if (daysDiff <= 0) {
        return [`Communication with ${company.name} is overdue!`]
      } else if (daysDiff <= 3) {
        return [`Upcoming communication with ${company.name} in ${daysDiff} day(s)`]
      }
      return []
    })
    
    setNotifications(newNotifications)
  }, [companies])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-border">
            {notifications.map((notification, index) => (
              <li key={index} className="p-4 text-sm hover:bg-muted/50">
                {notification}
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-sm text-muted-foreground">No pending notifications</p>
        )}
      </CardContent>
    </Card>
  )
}

