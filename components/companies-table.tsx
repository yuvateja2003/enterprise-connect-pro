import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trash2 } from 'lucide-react'
import Link from "next/link"
import { useStateContext } from '@/lib/state-context'
import { LogCommunication } from './log-communication'

export function CompaniesTable() {
  const { companies, deleteCompany } = useStateContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Periodicity</TableHead>
          <TableHead>Last Communication</TableHead>
          <TableHead>Next Communication</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.location}</TableCell>
            <TableCell>{company.communicationPeriodicity}</TableCell>
            <TableCell>{new Date(company.lastComm!).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(company.nextComm!).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge
                variant={
                  company.status === "overdue"
                    ? "destructive"
                    : company.status === "due"
                    ? "default"
                    : "secondary"
                }
              >
                {company.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/companies/${company.id}`}>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <LogCommunication companyId={company.id} />
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this company?')) {
                      deleteCompany(company.id)
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

