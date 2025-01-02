import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import { useStateContext } from '@/lib/state-context'
import { motion } from 'framer-motion'

export function CompanyList() {
  const { companies } = useStateContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Companies</CardTitle>
        <CardDescription>Your tracked companies and their communication status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {companies.slice(0, 5).map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4"
            >
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold">{company.name}</h3>
                <p className="text-sm text-muted-foreground">{company.location}</p>
                <p className="text-sm">
                  Last: {new Date(company.lastComm!).toLocaleDateString()}, 
                  Next: {new Date(company.nextComm!).toLocaleDateString()}
                </p>
                <p className="text-sm">{company.communicationPeriodicity} communication</p>
              </div>
              <div className="flex items-center space-x-2">
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
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/companies/${company.id}`}>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-4"
        >
          <Button variant="outline" asChild>
            <Link href="/companies">View All Companies</Link>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

