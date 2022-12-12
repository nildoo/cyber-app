import { InMemoryCache } from '@apollo/client'
import { makeVar } from '@apollo/client'

export const tokenState = makeVar('')

export const cache = new InMemoryCache({
  addTypename: false,

  typePolicies: {
    Query: {
      fields: {
        token() {
          return tokenState()
        },
      },
    },
  },
})
