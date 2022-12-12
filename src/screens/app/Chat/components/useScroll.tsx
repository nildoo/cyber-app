import { useEffect, useRef } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native'
import { useFiles } from '../../../../hooks/useFiles'

export function useChatScroll(dep: any, campingId: string) {
  const ref = useRef<FlatList>()
  const { setCount } = useFiles()

  const chatCount = firestore().collection('chats').doc(`${campingId}`)

  async function resetCount() {
    const doc = await chatCount.get()

    if (doc.data()?.client?.count) {
      chatCount.update({
        client: {
          count: 0,
        },
        status: true,
      })
      setCount(doc.data()?.client?.count)
    }

    if (doc.data()?.client?.count !== undefined) {
      setCount(doc.data()?.client?.count)
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current?.scrollToOffset({ offset: 0, animated: true })
      resetCount()
    }
  }, [dep, campingId])
  return ref
}
