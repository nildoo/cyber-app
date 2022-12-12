import { AuthContext } from '../context/setAuth'
import { useContext } from 'react'

export function useAuth() {
  const auth = useContext(AuthContext)
  return auth
}
