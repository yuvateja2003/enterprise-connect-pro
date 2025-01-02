import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, Phone, Linkedin, Video } from 'lucide-react'
import { useStateContext } from '@/lib/state-context'
import { motion } from 'framer-motion'

export function CommunicationStats() {
  const { companies, communicationMethods } = useStateContext()

  const totalCompanies = companies.length
  const upcomingCommunications = companies.filter(company => company.status === 'upcoming').length
  const dueCommunications = companies.filter(company => company.status === 'due').length
  const totalMethods = communicationMethods.length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        { title: "Total Companies", value: totalCompanies, icon: Linkedin },
        { title: "Upcoming Communications", value: upcomingCommunications, icon: Mail },
        { title: "Due Communications", value: dueCommunications, icon: Phone },
        { title: "Communication Methods", value: totalMethods, icon: MessageCircle },
      ].map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

