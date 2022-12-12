import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackList, AUTH_STACK } from './stacks/constants/auth.constants'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {AUTH_STACK.map((route: AuthStackList) => (
        <Screen key={route.id} name={route.name} component={route.component} />
      ))}
    </Navigator>
  )
}
