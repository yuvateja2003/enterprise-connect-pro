import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { CompaniesTable } from '@/components/companies-table'
import { CommunicationHistory } from '@/components/communication-history'

export default function CompaniesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Companies"
        text="Manage and view all companies."
      />
      <div className="space-y-6">
        <CompaniesTable />
        <CommunicationHistory />
      </div>
    </DashboardShell>
  )
}

