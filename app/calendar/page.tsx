import { DashboardShell } from '@/components/dashboard-shell'
import { CommunicationCalendar } from '@/components/communication-calendar'

export default function CalendarPage() {
  return (
    <DashboardShell className="p-0">
      <CommunicationCalendar />
    </DashboardShell>
  )
}

