import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { CommunicationFrequencyChart } from '@/components/communication-frequency-chart'
import { EngagementEffectivenessChart } from '@/components/engagement-effectiveness-chart'
import { OverdueCommunicationChart } from '@/components/overdue-communication-chart'

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reports"
        text="Analytics and insights on your communications."
      />
      <div className="space-y-6">
        <CommunicationFrequencyChart />
        <EngagementEffectivenessChart />
        <OverdueCommunicationChart />
      </div>
    </DashboardShell>
  )
}

