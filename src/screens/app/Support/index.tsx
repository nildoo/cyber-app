import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../@types/navigation'
import { Box } from '../../../components/Box'
import { StatusBarColor } from '../../../components/StatusBarColor'
import { Wrapper } from '../../../components/Wrapper'
import SenderIcon from '../../../assets/sender.svg'
import { Header } from './components/Header'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'
import dayjs from 'dayjs'
import { FlatList, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Input } from '../../../components/Input'
import { Space } from '../../../components/Space'
import { TextBase } from '../../../components/TextBase'
import { useChatScroll } from './components/useScroll'

export const Support: React.FC<AppStackScrenProps<'Support'>> = ({
  navigation,
  route,
}) => {
  const client = route.params?.client?.clientMe
  const theme = useTheme()
  const goBack = () => {
    navigation.goBack()
  }

  const client_id = client?._id as string

  const [allMessages, setAllMessages] = useState<any>([])
  const [message, setMessage] = useState('')

  // const [feedback, setFeedback] = useState<IFeedBackProps>({} as IFeedBackProps)
  // const [t, setT] = useState(image?.image)

  const flatListRef = useChatScroll(allMessages, client_id)

  const chatCollection = firestore()
    .collection('support')
    .doc(`support_${client?._id}`)
    .collection('room')

  const newChatCount = firestore()
    .collection('support')
    .doc(`support_${client?._id}`)

  const to = {
    email: 'support@cyberforbusiness.com.br',
    name: 'Suporte Cyber',
  }

  const from = {
    id: client?._id,
    email: client?.email,
    name: client?.name,
  }

  const handleOnline = async () => {
    const doc = await newChatCount.get()
    if (doc.data()) {
      newChatCount.update({
        status: true,
      })
    } else {
      newChatCount.set({
        status: true,
      })
    }
  }

  const sendMsg = async () => {
    if (!message.trim()) {
      return
    }

    const id = uuid.v4() as string

    const msgData = {
      id: id,
      message: message,
      from: from,
      to: to,
      time: dayjs().valueOf(),
    }

    const setDoc = firestore()
      .collection('support')
      .doc(`support_${client?._id}`)

    chatCollection.doc(id).set(msgData)

    setDoc.set({
      id: `support_${client?._id}`,
      name: client?.name,
      email: client?.email,
    })

    const doc = await newChatCount.get()

    if (doc.exists && doc.data()) {
      if (doc.data()?.support) {
        newChatCount.update({
          support: {
            count: doc.data()?.support.count + 1,
          },
          status: true,
        })
      } else {
        newChatCount.update({
          support: {
            count: 1,
          },
          status: true,
        })
      }
    } else {
      newChatCount.set({
        support: {
          count: 1,
        },
        client: {
          count: 0,
        },
        status: true,
      })
    }

    setMessage('')
  }

  // const sendImg = async () => {
  //   const url = image?.image
  //   const status = image?.status
  //   setT('')
  //   setFeedback({
  //     url: url,
  //     status: status,
  //   })

  //   const id = uuid.v4() as string

  //   const msgData = {
  //     id: id,
  //     message: message,
  //     from: from,
  //     to: to,
  //     url: image?.image,
  //     status: image?.status,
  //     time: dayjs().valueOf(),
  //   }

  //   chatCollection.doc(id).set(msgData)

  //   const doc = await chatCount.get()

  //   if (doc.data()) {
  //     chatCount.update({
  //       consultant: {
  //         count: doc.data()?.consultant.count + 1,
  //       },
  //     })
  //   } else {
  //     chatCount.set({
  //       consultant: {
  //         count: 1,
  //       },
  //       client: {
  //         count: 0,
  //       },
  //     })
  //   }
  //   setMessage('')
  // }

  async function getMessages() {
    chatCollection.orderBy('time', 'desc').onSnapshot(
      result => setAllMessages(result.docs),
      error => console.log(error),
    )
  }

  const handleAllImagesApprovedNavige = () => {}

  useEffect(() => {
    getMessages()
    handleOnline()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      const doc = await newChatCount.get()
      if (doc.data()) {
        newChatCount.update({
          status: false,
        })
      } else {
        newChatCount.set({
          status: false,
        })
      }
    })

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  return (
    <Wrapper
      style={{
        backgroundColor: theme.colors.primary,
      }}>
      <Wrapper
        style={{
          backgroundColor: theme.colors.background,
        }}>
        <StatusBarColor
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        <Box flexBox>
          <Header
            goBack={goBack}
            handleAllImagesApprovedNavige={handleAllImagesApprovedNavige}
          />
          <Box ph={16} flexBox>
            <Box flexBox bgc={theme.colors.background}>
              <FlatList
                ref={flatListRef}
                inverted
                data={allMessages}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => JSON.stringify(item.id)}
                renderItem={({ item }) => {
                  const data = item._data
                  return (
                    <View>
                      <View style={{ marginTop: 6 }}>
                        <View
                          style={{
                            alignItems:
                              client?.email === data.from.email
                                ? 'flex-end'
                                : 'flex-start',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              maxWidth: '90%',
                            }}>
                            {/* {client?.email === data.to.email && (
                              <>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    width: 32,
                                    height: 32,
                                    borderRadius: 32,
                                    overflow: 'hidden',
                                  }}>
                                  <Thumb
                                    source={{
                                      uri: item.thumb,
                                    }}
                                  />
                                </View>
                                <Space w={10} />
                              </>
                            )} */}
                            <View
                              style={{
                                minWidth: '25%',
                              }}>
                              <View
                                style={{
                                  borderRadius: 3,
                                  backgroundColor:
                                    data.from.email === client?.email
                                      ? theme.colors.primary
                                      : theme.colors.background300,
                                  padding: 8,
                                }}>
                                <TextBase
                                  ff={theme.fonts.lato700}
                                  color={
                                    data.from.email === client?.email
                                      ? theme.colors.background300
                                      : theme.colors.mono700
                                  }>
                                  {data.from.name}
                                </TextBase>

                                <Space h={5} />
                                <TextBase
                                  fz={15}
                                  color={
                                    data.from.email === client?.email
                                      ? theme.colors.background300
                                      : theme.colors.mono500
                                  }>
                                  {data.message}
                                </TextBase>
                              </View>
                              <Space h={8} />
                              <TextBase
                                fz={12}
                                style={{
                                  marginBottom: 8,
                                }}
                                color={theme.colors.mono500}
                                ta="right">
                                {dayjs(data.time).format('hh:mm')}
                              </TextBase>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                }}
              />
            </Box>
            <Box
              flexDirection="row"
              align="center"
              mb={16}
              pt={4}
              bgc={theme.colors.background}>
              <InputContainer>
                <Input
                  defaultValue={message}
                  onChangeText={text => setMessage(text)}
                  placeholder="Digite uma mensagem..."
                  style={{
                    borderWidth: 0,
                    paddingHorizontal: 16,
                    flex: 1,
                  }}
                />
                <Send onPress={sendMsg} activeOpacity={0.7}>
                  <SenderIcon />
                </Send>
              </InputContainer>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </Wrapper>
  )
}

const InputContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  color: ${p => p.theme.colors.mono900};
  background: ${p => p.theme.colors.background300};
  height: 44px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  elevation: 3;
`

const Send = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 59px;
  height: 44px;
  background-color: ${p => p.theme.colors.primary};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`
