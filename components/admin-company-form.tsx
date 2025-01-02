"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStateContext } from '@/lib/state-context'

export function AdminCompanyForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedinProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '',
  })

  const { addCompany } = useStateContext()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      addCompany(formData)
      setFormData({
        name: '',
        location: '',
        linkedinProfile: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
        communicationPeriodicity: '',
      })
      alert('Company added successfully!')
    } catch (error) {
      console.error('Error adding company:', error)
      alert('Error adding company. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Company</CardTitle>
        <CardDescription>Add a new company to track communications.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
            <Input id="linkedinProfile" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emails">Emails</Label>
            <Input id="emails" name="emails" value={formData.emails} onChange={handleInputChange} placeholder="Enter email addresses (comma-separated)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumbers">Phone Numbers</Label>
            <Input id="phoneNumbers" name="phoneNumbers" value={formData.phoneNumbers} onChange={handleInputChange} placeholder="Enter phone numbers (comma-separated)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea id="comments" name="comments" value={formData.comments} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="communicationPeriodicity">Communication Periodicity</Label>
            <Select name="communicationPeriodicity" value={formData.communicationPeriodicity} onValueChange={(value) => handleInputChange({ target: { name: 'communicationPeriodicity', value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select periodicity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Company</Button>
        </form>
      </CardContent>
    </Card>
  )
}

