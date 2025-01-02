'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function UserModule() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Acme Inc',
      lastCommunications: [
        { type: 'LinkedIn Post', date: '2023-09-05' },
        { type: 'Email', date: '2023-08-20' },
        { type: 'Phone Call', date: '2023-08-01' },
        { type: 'LinkedIn Message', date: '2023-07-15' },
        { type: 'Other', date: '2023-07-01' },
      ],
      nextCommunication: { type: 'Email', date: '2023-09-20' },
      status: 'due',
    },
    // Add more mock companies here
  ])

  const handleCommunicationPerformed = (companyId) => {
    // Logic to handle communication performed
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">User Module</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Last Five Communications</TableHead>
            <TableHead>Next Scheduled Communication</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className={company.status === 'overdue' ? 'bg-red-100' : company.status === 'due' ? 'bg-yellow-100' : ''}>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {company.lastCommunications.map((comm, index) => (
                  <div key={index} className="text-sm">
                    {comm.type} - {comm.date}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {company.nextCommunication.type} - {company.nextCommunication.date}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Communication Performed</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Log Communication</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => { e.preventDefault(); handleCommunicationPerformed(company.id); }} className="space-y-4">
                      <div>
                        <Label htmlFor="communicationType">Type of Communication</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linkedin-post">LinkedIn Post</SelectItem>
                            <SelectItem value="linkedin-message">LinkedIn Message</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone-call">Phone Call</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="communicationDate">Date of Communication</Label>
                        <Input id="communicationDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="communicationNotes">Notes</Label>
                        <Textarea id="communicationNotes" placeholder="Add any additional notes" />
                      </div>
                      <Button type="submit">Submit</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

