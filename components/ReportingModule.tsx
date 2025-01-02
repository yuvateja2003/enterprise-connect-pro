'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export function ReportingModule() {
  const [communicationData, setCommunicationData] = useState([
    { name: 'LinkedIn Post', count: 15 },
    { name: 'LinkedIn Message', count: 20 },
    { name: 'Email', count: 30 },
    { name: 'Phone Call', count: 10 },
    { name: 'Other', count: 5 },
  ])

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reporting and Analytics</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Communication Frequency Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={communicationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="count" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button>Download Report</Button>
      </div>
    </div>
  )
}

