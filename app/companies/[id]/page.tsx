import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { CompanyDetails } from '@/components/company-details'

export default function CompanyPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Company Details"
        text={`Viewing details for company ID: ${params.id}`}
      />
      <CompanyDetails id={params.id} />
    </DashboardShell>
  )
}

