import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { CompanyList } from '@/components/company-list'
import { UpcomingCommunications } from '@/components/upcoming-communications'
import { CommunicationStats } from '@/components/communication-stats'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your communication tracking."
      />
      <div className="space-y-4">
        <CommunicationStats />
        <CompanyList />
        <UpcomingCommunications />
      </div>
    </DashboardShell>
  )
}

