import { ChatPersonContext } from '../context/setChatPerson'
import { useContext } from 'react'

export function useChatPerson() {
  const person = useContext(ChatPersonContext)
  return person
}
