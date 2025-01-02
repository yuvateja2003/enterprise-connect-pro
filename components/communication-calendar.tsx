"use client"

import { useState } from 'react'
import { useStateContext } from '@/lib/state-context'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CommunicationCalendar() {
  const { communicationLogs } = useStateContext()
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getDaysFromPreviousMonth = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date)
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1)
    const daysInPrevMonth = getDaysInMonth(prevMonth)
    return Array.from({ length: firstDay }, (_, i) => daysInPrevMonth - firstDay + i + 1)
  }

  const getDaysFromNextMonth = (daysInMonth: number, firstDay: number) => {
    const totalDays = firstDay + daysInMonth
    const remainingDays = 42 - totalDays // 6 rows * 7 days = 42
    return Array.from({ length: remainingDays }, (_, i) => i + 1)
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const prevMonthDays = getDaysFromPreviousMonth(currentDate)
  const nextMonthDays = getDaysFromNextMonth(daysInMonth, firstDay)
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isToday = (day: number) => {
    const today = new Date()
    return currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear() &&
           day === today.getDate()
  }

  const getLogsForDay = (day: number) => {
    return communicationLogs.filter(log => {
      const logDate = new Date(log.date)
      return logDate.getDate() === day &&
             logDate.getMonth() === currentDate.getMonth() &&
             logDate.getFullYear() === currentDate.getFullYear()
    })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">{formatMonth(currentDate)}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={goToToday}
            className="px-4"
          >
            today
          </Button>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousMonth}
              className="rounded-r-none border-r"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextMonth}
              className="rounded-l-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-border">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-background p-4 text-center font-semibold"
          >
            {day}
          </div>
        ))}
        {prevMonthDays.map((day) => (
          <div
            key={`prev-${day}`}
            className="bg-background p-4 text-center text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {currentMonthDays.map((day) => {
          const logs = getLogsForDay(day)
          return (
            <div
              key={`current-${day}`}
              className={cn(
                "bg-background p-4 text-center relative min-h-[100px]",
                isToday(day) && "bg-accent",
                logs.length > 0 && "bg-blue-50 dark:bg-blue-900/20"
              )}
            >
              <span className={cn(
                "absolute top-2 left-2",
                isToday(day) && "font-bold"
              )}>
                {day}
              </span>
              {logs.map((log, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-6 p-1 text-xs bg-blue-500 text-white rounded truncate cursor-pointer">
                        {`${log.companyName} - ${log.method}`}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{log.companyName}</p>
                      <p className="text-sm">{log.method}</p>
                      <p className="text-sm text-muted-foreground">{log.notes}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          )
        })}
        {nextMonthDays.map((day) => (
          <div
            key={`next-${day}`}
            className="bg-background p-4 text-center text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

