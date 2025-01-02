"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { name: 'Email', count: 400 },
  { name: 'Phone', count: 300 },
  { name: 'LinkedIn', count: 200 },
  { name: 'Visit', count: 100 },
  { name: 'Other', count: 50 },
]

export function CommunicationFrequencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Frequency</CardTitle>
        <CardDescription>Frequency of different communication methods used.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

