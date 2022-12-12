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
import { FlatList, ImageBackground, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Input } from '../../../components/Input'
import { Space } from '../../../components/Space'
import { TextBase } from '../../../components/TextBase'
import { useChatScroll } from './components/useScroll'
import { useChatPerson } from '../../../hooks/useChatPerson'
import { useFiles } from '../../../hooks/useFiles'

type IFeedBackProps = {
  url: '' | undefined
  status: '' | undefined
}
export const Chat: React.FC<AppStackScrenProps<'Chat'>> = ({
  navigation,
  route,
}) => {
  const { client, consultant } = useChatPerson()
  const { campingId } = useFiles()
  const image = route.params
  const theme = useTheme()
  const goBack = () => {
    navigation.goBack()
  }

  const [allMessages, setAllMessages] = useState<any>([])
  const [message, setMessage] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [feedback, setFeedback] = useState<IFeedBackProps>({} as IFeedBackProps)
  const [t, setT] = useState(image?.image)

  const flatListRef = useChatScroll(allMessages, campingId)

  const chatCollection = firestore()
    .collection('chats')
    .doc(`${campingId}`)
    .collection('room')

  const newChatCount = firestore().collection('chats').doc(`${campingId}`)

  const to = {
    email: consultant?.email,
    id: consultant?._id,
    name: consultant?.name,
    office: consultant.office,
  }

  const from = {
    id: client._id,
    email: client.email,
    name: client.name,
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

    chatCollection.doc(id).set(msgData)

    const doc = await newChatCount.get()

    if (doc.exists && doc.data()) {
      if (doc.data()?.consultant) {
        newChatCount.update({
          consultant: {
            count: doc.data()?.consultant.count + 1,
          },
          status: true,
        })
      } else {
        newChatCount.update({
          consultant: {
            count: 1,
          },
          status: true,
        })
      }
    } else {
      newChatCount.set({
        consultant: {
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

  const sendImg = async () => {
    const url = image?.image
    const status = image?.status
    setT('')
    setFeedback({
      url: url,
      status: status,
    })

    const id = uuid.v4() as string

    const msgData = {
      id: id,
      message: message,
      from: from,
      to: to,
      url: image?.image,
      status: image?.status,
      time: dayjs().valueOf(),
    }

    chatCollection.doc(id).set(msgData)

    const doc = await newChatCount.get()

    if (doc.data()) {
      newChatCount.update({
        consultant: {
          count: doc.data()?.consultant.count + 1,
        },
        status: true,
      })
    } else {
      newChatCount.set({
        consultant: {
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
        backgroundColor: theme.colors.background,
      }}>
      <StatusBarColor
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <Box flexBox>
        <Header
          consultant={consultant}
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
                    {data.url ? (
                      <View style={{ marginTop: 6 }}>
                        <View
                          style={{
                            alignItems:
                              client.email === data.from.email
                                ? 'flex-end'
                                : 'flex-start',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              maxWidth: '90%',
                            }}>
                            {/* {client.email === data.to.email && (
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
                                    data.from.email === client.email
                                      ? theme.colors.primary
                                      : theme.colors.background300,
                                  padding: 8,
                                }}>
                                <TextBase
                                  ff={theme.fonts.lato700}
                                  color={
                                    data.from.email === client.email
                                      ? theme.colors.background300
                                      : theme.colors.mono700
                                  }>
                                  {data.from.name}
                                </TextBase>

                                {data.to.email === client.email && (
                                  <>
                                    {data.from.office && (
                                      <TextBase
                                        ff={theme.fonts.lato700}
                                        fz={14}
                                        color={
                                          data.from.email === client.email
                                            ? theme.colors.background300
                                            : theme.colors.mono700
                                        }>
                                        Consultor
                                      </TextBase>
                                    )}
                                  </>
                                )}

                                <Space h={5} />
                                <TextBase
                                  fz={15}
                                  color={
                                    data.from.email === client.email
                                      ? theme.colors.background300
                                      : theme.colors.mono700
                                  }>
                                  {data.status}!
                                </TextBase>
                                <Space h={10} />
                                <View
                                  style={{
                                    height: 200,
                                    width: 200,
                                    overflow: 'hidden',
                                    borderRadius: 10,
                                  }}>
                                  <Thumb source={{ uri: data?.url }} />
                                </View>
                              </View>
                              <Space h={8} />
                              <TextBase
                                fz={12}
                                color={theme.colors.mono500}
                                style={{
                                  marginBottom: 8,
                                }}
                                ta="right">
                                {dayjs(data.time).format('hh:mm')}
                              </TextBase>
                            </View>

                            {/* {client.email !== data.from.email && (
                              <>
                                <Space w={10} />
                                <Box w="32px" h="32px" br={32} ovf={true}>
                                  <Thumb
                                    source={{
                                      uri: item.thumb,
                                    }}
                                  />
                                </Box>
                              </>
                            )} */}
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={{ marginTop: 6 }}>
                        <View
                          style={{
                            alignItems:
                              client.email === data.from.email
                                ? 'flex-end'
                                : 'flex-start',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              maxWidth: '90%',
                            }}>
                            {/* {client.email === data.to.email && (
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
                                    data.from.email === client.email
                                      ? theme.colors.primary
                                      : theme.colors.background300,
                                  padding: 8,
                                }}>
                                <TextBase
                                  ff={theme.fonts.lato700}
                                  color={
                                    data.from.email === client.email
                                      ? theme.colors.background300
                                      : theme.colors.mono700
                                  }>
                                  {data.from.name}
                                </TextBase>

                                {data.to.email === client.email && (
                                  <>
                                    {data.from.office && (
                                      <TextBase
                                        ff={theme.fonts.lato700}
                                        fz={14}
                                        color={
                                          data.from.email === client.email
                                            ? theme.colors.background300
                                            : theme.colors.mono700
                                        }>
                                        Consultor
                                      </TextBase>
                                    )}
                                  </>
                                )}

                                <Space h={5} />
                                <TextBase
                                  fz={15}
                                  color={
                                    data.from.email === client.email
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

                            {/* {client.email !== data.from.email && (
                              <>
                                <Space w={10} />
                                <Box w="32px" h="32px" br={32} ovf={true}>
                                  <Thumb
                                    source={{
                                      uri: item.thumb,
                                    }}
                                  />
                                </Box>
                              </>
                            )} */}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )
              }}
            />
            {t && (
              <Box
                pd={8}
                style={{
                  bottom: 0,
                  position: 'absolute',
                  height: 300,
                  width: 300,
                  backgroundColor: theme.colors.background300,
                  borderRadius: 5,
                }}>
                <TextBase fz={15} color={theme.colors.mono500}>
                  {image?.status}!
                </TextBase>
                <Space h={10} />
                <View
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    borderRadius: 5,
                  }}>
                  <Thumb source={{ uri: image?.image }} />
                </View>
                <Box pv={8}>
                  <TextBase
                    onPress={() => navigation.goBack()}
                    ff={theme.fonts.lato700}
                    color={theme.colors.primary}>
                    Cancelar
                  </TextBase>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            flexDirection="row"
            align="center"
            mb={16}
            pt={4}
            bgc={theme.colors.background}>
            <InputContainer>
              <Input
                editable={t ? false : true}
                defaultValue={message}
                onChangeText={text => setMessage(text)}
                placeholder="Digite uma mensagem..."
                style={{
                  borderWidth: 0,
                  paddingHorizontal: 16,
                  flex: 1,
                }}
              />
              <Send
                onPress={() => (t ? sendImg() : sendMsg())}
                activeOpacity={0.7}>
                <SenderIcon />
              </Send>
            </InputContainer>
          </Box>
        </Box>
      </Box>
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
const Thumb = styled(ImageBackground)`
  height: 100%;
  width: 100%;
`
