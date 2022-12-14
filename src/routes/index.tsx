import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '../hooks/useAuth'

export const Routes: React.FC<{}> = () => {
  const { clientToken } = useAuth()

  return (
    <NavigationContainer>
      {clientToken ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
