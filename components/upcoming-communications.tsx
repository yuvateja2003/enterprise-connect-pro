import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStateContext } from '@/lib/state-context'

export function UpcomingCommunications() {
  const { companies } = useStateContext()

  const upcomingCommunications = companies
    .filter(company => company.status === 'upcoming' || company.status === 'due')
    .sort((a, b) => new Date(a.nextComm!).getTime() - new Date(b.nextComm!).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Communications</CardTitle>
        <CardDescription>Your scheduled communications for the next 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {upcomingCommunications.map((company) => (
            <div key={company.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{company.name}</p>
                <p className="text-sm text-muted-foreground">
                  Next communication on {new Date(company.nextComm!).toLocaleDateString()}
                </p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={
                    company.status === "due"
                      ? "default"
                      : "secondary"
                  }
                >
                  {company.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

