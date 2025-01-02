'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function AdminModule() {
  const [companies, setCompanies] = useState([])
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on company LinkedIn page', sequence: 1, mandatory: false },
    { name: 'LinkedIn Message', description: 'Direct message on LinkedIn', sequence: 2, mandatory: false },
    { name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
    { name: 'Phone Call', description: 'Make a phone call', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other communication method', sequence: 5, mandatory: false },
  ])

  const handleAddCompany = (event) => {
    event.preventDefault()
    // Add company logic here
  }

  const handleAddCommunicationMethod = (event) => {
    event.preventDefault()
    // Add communication method logic here
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">Admin Module</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add Company</h3>
        <form onSubmit={handleAddCompany} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" placeholder="Enter company name" />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter company location" />
          </div>
          <div>
            <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
            <Input id="linkedinProfile" placeholder="Enter LinkedIn profile URL" />
          </div>
          <div>
            <Label htmlFor="emails">Emails</Label>
            <Input id="emails" placeholder="Enter email addresses (comma-separated)" />
          </div>
          <div>
            <Label htmlFor="phoneNumbers">Phone Numbers</Label>
            <Input id="phoneNumbers" placeholder="Enter phone numbers (comma-separated)" />
          </div>
          <div>
            <Label htmlFor="comments">Comments</Label>
            <Textarea id="comments" placeholder="Enter additional comments" />
          </div>
          <div>
            <Label htmlFor="communicationPeriodicity">Communication Periodicity</Label>
            <Select>
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
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Add Communication Method</h3>
        <form onSubmit={handleAddCommunicationMethod} className="space-y-4">
          <div>
            <Label htmlFor="methodName">Method Name</Label>
            <Input id="methodName" placeholder="Enter method name" />
          </div>
          <div>
            <Label htmlFor="methodDescription">Description</Label>
            <Textarea id="methodDescription" placeholder="Enter method description" />
          </div>
          <div>
            <Label htmlFor="sequence">Sequence</Label>
            <Input id="sequence" type="number" placeholder="Enter sequence number" />
          </div>
          <div className="flex items-center space-x-2">
            <Input id="mandatory" type="checkbox" className="w-4 h-4" />
            <Label htmlFor="mandatory">Mandatory</Label>
          </div>
          <Button type="submit">Add Communication Method</Button>
        </form>
      </div>
    </div>
  )
}

