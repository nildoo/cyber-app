import { token } from './storage'
import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { cache } from './cache'

var URL = {
  http: 'http://192.168.3.12:4000/graphql',
}

if (process.env.NODE_ENV !== 'dev') {
  URL = {
    http: 'https://cyber-server-app.herokuapp.com/graphql',
  }
}

const httpLink = createHttpLink({
  uri: URL.http,
})

const authLink = setContext(async (_, { headers }) => {
  const clientToken = await token()
  return {
    headers: {
      ...headers,
      authorization: clientToken ? `Bearer ${clientToken}` : '',
    },
  }
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
})

export default client
