import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { Loading } from '../components/app/Loading'
import { removeToken, setToken, token } from '../graphql/storage'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  clientToken: string
  handleSetToken: (token: string) => void
  removeTokenClient: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [clientToken, setClientToken] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSetToken = (t: string) => {
    setToken(t)
    setClientToken(t)
  }

  const get = async () => {
    setLoading(true)
    const tk = await token()
    if (tk) {
      setClientToken(tk)
      setLoading(false)
    }
    setLoading(false)
  }

  const removeTokenClient = () => {
    removeToken()
    setClientToken('')
  }

  useEffect(() => {
    get()
  }, [clientToken])

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        clientToken,
        handleSetToken,
        removeTokenClient,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
