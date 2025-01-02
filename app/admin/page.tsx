import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { AdminCompanyForm } from '@/components/admin-company-form'
import { AdminCommunicationMethodForm } from '@/components/admin-communication-method-form'

export default function AdminPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin"
        text="Manage companies and communication methods."
      />
      <div className="grid gap-4">
        <AdminCompanyForm />
        <AdminCommunicationMethodForm />
      </div>
    </DashboardShell>
  )
}

