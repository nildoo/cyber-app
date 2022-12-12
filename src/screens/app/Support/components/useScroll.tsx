import { useEffect, useRef } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native'
import { useChatPerson } from '../../../../hooks/useChatPerson'

export function useChatScroll(dep: any, client: string) {
  const ref = useRef<FlatList>()
  const { setSupport } = useChatPerson()

  const newChatCount = firestore()
    .collection('support')
    .doc(`support_${client}`)

  async function resetCount() {
    newChatCount.update({
      client: {
        count: 0,
      },
      status: true,
    })
    setSupport(0)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current?.scrollToOffset({ offset: 0, animated: true })
      resetCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep, client])
  return ref
}
