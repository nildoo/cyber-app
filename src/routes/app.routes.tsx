import React, { useEffect } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackList, APP_STACK } from './stacks/constants/app.constants'
import { useTheme } from 'styled-components/native'
import { StatusBar } from 'react-native'
const { Navigator, Screen } = createNativeStackNavigator()
import OneSignal from 'react-native-onesignal'
import {
  useAddNotificationIdClientMutation,
  useClientMeQuery,
} from '../generated/graphql'
import { Loading } from '../components/app/Loading'
import { Error } from '../components/app/Error'

const initOneSignal = async () => {
  OneSignal.setAppId('754e75a5-db3b-4b8d-8228-ecec01e696c2')
  OneSignal.setLogLevel(6, 0)
  OneSignal.setRequiresUserPrivacyConsent(false)
  OneSignal.promptForPushNotificationsWithUserResponse()

  return OneSignal
}

export function AppRoutes() {
  const theme = useTheme()
  const { data: client, loading, error } = useClientMeQuery()
  const client_id = client?.clientMe?._id as string
  const [setNotificationId] = useAddNotificationIdClientMutation()

  const initialize = async () => {
    const onesignal = await initOneSignal()
    const data = await onesignal.getDeviceState()

    if (data) {
      try {
        await setNotificationId({
          variables: {
            input: {
              client_id,
              notificationId: data.userId,
            },
          },
        })
      } catch (e: any) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    if (client) {
      initialize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Campaning">
        {APP_STACK.map((route: AppStackList) => (
          <Screen
            key={route.id}
            name={route.name}
            component={route.component}
            options={{
              animation:
                route.name === 'ViewVideos' ? 'fade' : 'slide_from_right',
            }}
          />
        ))}
      </Navigator>
    </>
  )
}
