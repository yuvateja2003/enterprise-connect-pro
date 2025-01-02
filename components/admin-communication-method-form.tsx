"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useStateContext } from '@/lib/state-context'

export function AdminCommunicationMethodForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const { addCommunicationMethod } = useStateContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      addCommunicationMethod({
        ...formData,
        sequence: parseInt(formData.sequence, 10)
      })
      setFormData({
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
      })
      alert('Communication method added successfully!')
    } catch (error) {
      console.error('Error adding communication method:', error)
      alert('Error adding communication method. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Communication Method</CardTitle>
        <CardDescription>Define a new communication method for tracking.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Method Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sequence">Sequence</Label>
            <Input id="sequence" name="sequence" type="number" value={formData.sequence} onChange={handleInputChange} required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mandatory" name="mandatory" checked={formData.mandatory} onCheckedChange={(checked) => handleInputChange({ target: { name: 'mandatory', type: 'checkbox', checked } })} />
            <Label htmlFor="mandatory">Mandatory</Label>
          </div>
          <Button type="submit">Add Communication Method</Button>
        </form>
      </CardContent>
    </Card>
  )
}

