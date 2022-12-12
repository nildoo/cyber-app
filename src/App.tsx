import { ApolloProvider } from '@apollo/client'
import dayjs from 'dayjs'
import React from 'react'
import 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './context/setAuth'
import { ChatPersonProvider } from './context/setChatPerson'
import { FilesProvider } from './context/setFiles'
import client from './graphql/client'
import { Routes } from './routes'
import { theme } from './theme/default'
require('dayjs/locale/pt-br')

const App = () => {
  dayjs.locale('pt-br')
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ChatPersonProvider>
            <FilesProvider>
              <Routes />
            </FilesProvider>
          </ChatPersonProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
