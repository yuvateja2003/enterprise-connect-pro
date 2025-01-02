"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [
  { name: 'Jan', email: 65, phone: 78, linkedin: 82 },
  { name: 'Feb', email: 59, phone: 80, linkedin: 81 },
  { name: 'Mar', email: 80, phone: 85, linkedin: 90 },
  { name: 'Apr', email: 81, phone: 79, linkedin: 92 },
  { name: 'May', email: 56, phone: 89, linkedin: 85 },
  { name: 'Jun', email: 55, phone: 90, linkedin: 88 },
]

export function EngagementEffectivenessChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Effectiveness</CardTitle>
        <CardDescription>Effectiveness of different communication methods over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="email" stroke="#8884d8" />
            <Line type="monotone" dataKey="phone" stroke="#82ca9d" />
            <Line type="monotone" dataKey="linkedin" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

