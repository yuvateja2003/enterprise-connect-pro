"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [
  { name: 'Week 1', overdue: 4 },
  { name: 'Week 2', overdue: 3 },
  { name: 'Week 3', overdue: 5 },
  { name: 'Week 4', overdue: 2 },
  { name: 'Week 5', overdue: 1 },
  { name: 'Week 6', overdue: 3 },
]

export function OverdueCommunicationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overdue Communications</CardTitle>
        <CardDescription>Trend of overdue communications over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="overdue" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

