"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Company = {
  id: number
  name: string
  location: string
  linkedinProfile: string
  emails: string
  phoneNumbers: string
  comments: string
  communicationPeriodicity: string
  lastComm?: string
  nextComm?: string
  status?: string
}

type CommunicationMethod = {
  id: number
  name: string
  description: string
  sequence: number
  mandatory: boolean
}

type CommunicationLog = {
  id: number
  companyId: number
  companyName: string
  date: string
  method: string
  notes: string
}

type StateContextType = {
  companies: Company[]
  communicationMethods: CommunicationMethod[]
  communicationLogs: CommunicationLog[]
  addCompany: (company: Omit<Company, 'id'>) => void
  updateCompany: (id: number, company: Partial<Company>) => void
  addCommunicationMethod: (method: Omit<CommunicationMethod, 'id'>) => void
  addCommunicationLog: (log: Omit<CommunicationLog, 'id'>) => void
  deleteCompany: (id: number) => void
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [communicationMethods, setCommunicationMethods] = useState<CommunicationMethod[]>([])
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([])

  const calculateStatus = (nextCommDate: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
    
    const nextDate = new Date(nextCommDate)
    nextDate.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
    
    const daysUntilNext = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilNext < 0) {
      return 'overdue'
    } else if (daysUntilNext <= 3) { // If within next 3 days, it's due
      return 'due'
    } else {
      return 'upcoming'
    }
  }

  useEffect(() => {
    // Load initial data from localStorage or set default values
    const storedCompanies = localStorage.getItem('companies')
    const storedCommunicationMethods = localStorage.getItem('communicationMethods')
    const storedCommunicationLogs = localStorage.getItem('communicationLogs')

    if (storedCompanies) {
      const parsedCompanies = JSON.parse(storedCompanies)
      // Update status for all companies
      const updatedCompanies = parsedCompanies.map(company => ({
        ...company,
        status: calculateStatus(company.nextComm)
      }))
      setCompanies(updatedCompanies)
    } else {
      // Sample company data with calculated status
      const defaultCompanies = [
        {
          id: 1,
          name: "TechCorp Solutions",
          location: "New York",
          linkedinProfile: "https://www.linkedin.com/company/techcorp",
          emails: "info@techcorp.com",
          phoneNumbers: "+1 (555) 123-4567",
          comments: "Leading tech solutions provider",
          communicationPeriodicity: "biweekly",
          lastComm: "2024-01-15",
          nextComm: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
        },
        {
          id: 2,
          name: "Global Innovations Inc.",
          location: "San Francisco",
          linkedinProfile: "https://www.linkedin.com/company/globalinnovations",
          emails: "contact@globalinnovations.com",
          phoneNumbers: "+1 (555) 987-6543",
          comments: "Innovative startup in AI and machine learning",
          communicationPeriodicity: "monthly",
          lastComm: "2024-01-05",
          nextComm: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now (due)
        },
        {
          id: 3,
          name: "EcoSolutions Ltd.",
          location: "London",
          linkedinProfile: "https://www.linkedin.com/company/ecosolutions",
          emails: "info@ecosolutions.co.uk",
          phoneNumbers: "+44 20 1234 5678",
          comments: "Sustainable energy solutions provider",
          communicationPeriodicity: "weekly",
          lastComm: "2024-01-21",
          nextComm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago (overdue)
        },
        {
          id: 4,
          name: "HealthTech Innovations",
          location: "Boston",
          linkedinProfile: "https://www.linkedin.com/company/healthtechinnovations",
          emails: "contact@healthtechinnovations.com",
          phoneNumbers: "+1 (555) 246-8135",
          comments: "Cutting-edge medical technology company",
          communicationPeriodicity: "biweekly",
          lastComm: "2024-01-10",
          nextComm: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
        },
        {
          id: 5,
          name: "FinServe Corporation",
          location: "Chicago",
          linkedinProfile: "https://www.linkedin.com/company/finservecorp",
          emails: "info@finservecorp.com",
          phoneNumbers: "+1 (555) 369-2580",
          comments: "Financial services and consulting firm",
          communicationPeriodicity: "monthly",
          lastComm: "2023-12-30",
          nextComm: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // tomorrow (due)
        }
      ].map(company => ({
        ...company,
        status: calculateStatus(company.nextComm)
      }))
      setCompanies(defaultCompanies)
    }

    if (storedCommunicationMethods) {
      setCommunicationMethods(JSON.parse(storedCommunicationMethods))
    } else {
      // Sample communication methods
      setCommunicationMethods([
        { id: 1, name: 'Email', description: 'Send an email', sequence: 1, mandatory: true },
        { id: 2, name: 'Phone Call', description: 'Make a phone call', sequence: 2, mandatory: false },
        { id: 3, name: 'LinkedIn Message', description: 'Send a LinkedIn message', sequence: 3, mandatory: false },
      ])
    }

    if (storedCommunicationLogs) {
      setCommunicationLogs(JSON.parse(storedCommunicationLogs))
    } else {
      // Sample communication logs
      setCommunicationLogs([
        {
          id: 1,
          companyId: 1,
          companyName: "TechCorp Solutions",
          date: "2023-12-12",
          method: "Email",
          notes: "Discussed upcoming project collaboration"
        },
        {
          id: 2,
          companyId: 2,
          companyName: "Global Innovations Inc.",
          date: "2023-12-05",
          method: "Phone Call",
          notes: "Quarterly review of AI implementation"
        },
        {
          id: 3,
          companyId: 3,
          companyName: "EcoSolutions Ltd.",
          date: "2023-12-20",
          method: "Video Conference",
          notes: "Presentation on new sustainable energy project"
        },
        {
          id: 4,
          companyId: 4,
          companyName: "HealthTech Innovations",
          date: "2023-12-01",
          method: "LinkedIn Message",
          notes: "Follow-up on medical device prototype"
        },
        {
          id: 5,
          companyId: 5,
          companyName: "FinServe Corporation",
          date: "2023-11-30",
          method: "Email",
          notes: "Sent proposal for financial consulting services"
        }
      ])
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('companies', JSON.stringify(companies))
    localStorage.setItem('communicationMethods', JSON.stringify(communicationMethods))
    localStorage.setItem('communicationLogs', JSON.stringify(communicationLogs))
  }, [companies, communicationMethods, communicationLogs])

  // Add an effect to update statuses periodically
  useEffect(() => {
    const updateStatuses = () => {
      setCompanies(prevCompanies => 
        prevCompanies.map(company => ({
          ...company,
          status: calculateStatus(company.nextComm)
        }))
      )
    }

    // Update statuses every hour
    const interval = setInterval(updateStatuses, 1000 * 60 * 60)
    
    // Initial update
    updateStatuses()

    return () => clearInterval(interval)
  }, [])

  const addCompany = (company: Omit<Company, 'id'>) => {
    const newCompany = {
      ...company,
      id: companies.length + 1,
      lastComm: new Date().toISOString().split('T')[0],
      nextComm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'upcoming'
    }
    setCompanies([...companies, newCompany])
  }

  const updateCompany = (id: number, updatedFields: Partial<Company>) => {
    setCompanies(companies.map(company =>
      company.id === id ? { ...company, ...updatedFields } : company
    ))
  }

  const addCommunicationMethod = (method: Omit<CommunicationMethod, 'id'>) => {
    const newMethod = {
      ...method,
      id: communicationMethods.length + 1
    }
    setCommunicationMethods([...communicationMethods, newMethod])
  }

  const addCommunicationLog = (log: Omit<CommunicationLog, 'id'>) => {
    const newLog = {
      ...log,
      id: communicationLogs.length + 1
    }
    setCommunicationLogs([...communicationLogs, newLog])
  }

  const deleteCompany = (id: number) => {
    setCompanies(companies.filter(company => company.id !== id))
  }

  return (
    <StateContext.Provider value={{ 
      companies, 
      communicationMethods, 
      communicationLogs,
      addCompany, 
      updateCompany, 
      addCommunicationMethod,
      addCommunicationLog,
      deleteCompany 
    }}>
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider')
  }
  return context
}

