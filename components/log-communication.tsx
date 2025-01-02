"use client"

import { useState } from 'react'
import { useStateContext } from '@/lib/state-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function LogCommunication({ companyId }: { companyId: number }) {
  const { companies, communicationMethods, updateCompany, addCommunicationLog } = useStateContext()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    method: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const company = companies.find(c => c.id === companyId)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const calculateStatus = (nextCommDate: Date) => {
    const today = new Date()
    const daysUntilNextComm = Math.ceil((nextCommDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilNextComm < 0) {
      return 'overdue'
    } else if (daysUntilNextComm <= 3) {
      return 'due'
    } else {
      return 'upcoming'
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Calculate next communication date based on periodicity
    const nextComm = new Date(formData.date)
    switch (company?.communicationPeriodicity) {
      case 'weekly':
        nextComm.setDate(nextComm.getDate() + 7)
        break
      case 'biweekly':
        nextComm.setDate(nextComm.getDate() + 14)
        break
      case 'monthly':
        nextComm.setMonth(nextComm.getMonth() + 1)
        break
      case 'quarterly':
        nextComm.setMonth(nextComm.getMonth() + 3)
        break
    }

    const status = calculateStatus(nextComm)

    // Update company's last and next communication dates
    updateCompany(companyId, {
      lastComm: formData.date,
      nextComm: nextComm.toISOString().split('T')[0],
      status: status
    })

    // Add communication log
    addCommunicationLog({
      companyId,
      companyName: company?.name || '',
      date: formData.date,
      method: formData.method,
      notes: formData.notes
    })

    setOpen(false)
    setFormData({
      method: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Log Communication</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Communication</DialogTitle>
          <DialogDescription>
            Record a communication with {company?.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="method">Communication Method</Label>
            <Select 
              name="method" 
              value={formData.method} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, method: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {communicationMethods.map(method => (
                  <SelectItem key={method.id} value={method.name}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date of Communication</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter any notes about the communication"
              required
            />
          </div>
          <Button type="submit">Log Communication</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

