"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStateContext } from '@/lib/state-context'
import { LogCommunication } from './log-communication'

interface CompanyDetailsProps {
  id: string
}

export function CompanyDetails({ id }: CompanyDetailsProps) {
  const [company, setCompany] = useState({
    name: '',
    location: '',
    linkedinProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '',
  })

  const { companies, updateCompany } = useStateContext()

  useEffect(() => {
    const companyData = companies.find(c => c.id === parseInt(id, 10))
    if (companyData) {
      setCompany(companyData)
    }
  }, [id, companies])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompany(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setCompany(prevState => ({
      ...prevState,
      communicationPeriodicity: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      updateCompany(parseInt(id, 10), company)
      alert('Company updated successfully!')
    } catch (error) {
      console.error('Error updating company:', error)
      alert('Error updating company. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Company</CardTitle>
        <CardDescription>Update company information and communication preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" name="name" value={company.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={company.location} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
            <Input id="linkedinProfile" name="linkedinProfile" value={company.linkedinProfile} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emails">Emails</Label>
            <Input id="emails" name="emails" value={company.emails} onChange={handleInputChange} placeholder="Enter email addresses (comma-separated)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumbers">Phone Numbers</Label>
            <Input id="phoneNumbers" name="phoneNumbers" value={company.phoneNumbers} onChange={handleInputChange} placeholder="Enter phone numbers (comma-separated)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea id="comments" name="comments" value={company.comments} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="communicationPeriodicity">Communication Periodicity</Label>
            <Select name="communicationPeriodicity" value={company.communicationPeriodicity} onValueChange={handleSelectChange}>
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
          <div className="flex justify-between">
            <Button type="submit">Update Company</Button>
            <LogCommunication companyId={parseInt(id, 10)} />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

