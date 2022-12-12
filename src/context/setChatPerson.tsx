import React, { useState } from 'react'
import { createContext } from 'react'

type ChatPersonProviderProps = {
  children: React.ReactNode
}

export type IChatClient = {
  _id: string
  name: string
  email: string
}

export type IChatConsultant = {
  _id: string
  name: string
  email: string
  office: string
}

type ChatPersonContextType = {
  client: IChatClient
  consultant: IChatConsultant
  setClient: (data: IChatClient) => void
  setConsultant: (data: IChatConsultant) => void
  setSupport: (data: number) => void
  support: number
}

export const ChatPersonContext = createContext({} as ChatPersonContextType)

export function ChatPersonProvider({ children }: ChatPersonProviderProps) {
  const [support, setSupport] = useState(0)
  const [client, setClient] = useState<IChatClient>({} as IChatClient)
  const [consultant, setConsultant] = useState<IChatConsultant>(
    {} as IChatConsultant,
  )

  return (
    <ChatPersonContext.Provider
      value={{
        client,
        consultant,
        setSupport,
        setClient,
        setConsultant,
        support,
      }}>
      {children}
    </ChatPersonContext.Provider>
  )
}
