import React, { useEffect, useState } from 'react'
import {
  Alert,
  Platform,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../@types/navigation'
import { Search } from '../../../components/app/Search'
import { Box } from '../../../components/Box'
import { Icon } from '../../../components/Icon'
import { Space } from '../../../components/Space'
import { TextBase } from '../../../components/TextBase'
import { Wrapper } from '../../../components/Wrapper'
import LogoLight from '../../../assets/logo-light.svg'
import { Photos } from './components/Photos'
import { Hr } from '../../../components/Hr'
import { Loading } from '../../../components/app/Loading'
import { Error } from '../../../components/app/Error'
import {
  useClientMeQuery,
  useGetCampaingByClientQuery,
} from '../../../generated/graphql'
import { Button } from '../../../components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import dayjs from 'dayjs'
import { useFiles } from '../../../hooks/useFiles'
import { IChatClient, IChatConsultant } from '../../../context/setChatPerson'
import { useChatPerson } from '../../../hooks/useChatPerson'
import firestore from '@react-native-firebase/firestore'

export const Campaigns: React.FC<AppStackScrenProps<'Campaigns'>> = ({
  navigation,
}) => {
  const theme = useTheme()
  const { setVideos, setImages, setSignature, setCampingId } = useFiles()
  const { setClient, setConsultant, setSupport, support } = useChatPerson()
  const {
    data: client,
    error: errorClient,
    loading: loadingClient,
  } = useClientMeQuery()

  const [search, setSearch] = useState('')
  const client_id = client?.clientMe?._id as string

  const [filtered, setFiltered] = useState<any[]>([])

  const { data: campaing, refetch } = useGetCampaingByClientQuery({
    variables: {
      client: client_id,
    },
  })

  const newChatCount = firestore()
    .collection('support')
    .doc(`support_${client_id}`)

  const getChatCountMsg = () => {
    newChatCount.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        newChatCount.onSnapshot(doc => {
          if (doc?.data()?.client?.count === undefined) {
            setSupport(0)
          }
          if (doc?.data()?.client?.count) {
            setSupport(doc?.data()?.client.count)
          }
        })
      }
    })
  }

  const handleNwtWorks = () => {
    if (client?.clientMe?.networks.length === 0) {
      return Platform.OS === 'android'
        ? ToastAndroid.show('Sem relatórios diários.', ToastAndroid.SHORT)
        : Alert.alert('Sem relatórios diários.')
    }
    navigation.navigate('DailyReports', {
      client: client,
    })
  }

  const handleGraphNavigate = (getCampaingByIdId: string) => {
    navigation.navigate('Report', { getCampaingByIdId })
  }

  const handleChatNavigation = (
    campingId: string,
    client_chat: IChatClient,
    consultant: IChatConsultant,
  ) => {
    setCampingId(campingId)
    setClient(client_chat)
    setConsultant(consultant)
    navigation.navigate('Chat')
  }

  const handleFilesNavigation = (
    item: any,
    campingId: string,
    client_chat: IChatClient,
    consultant: IChatConsultant,
  ) => {
    const images = item.images
    const videos = item.videos
    const signature = item.signature
    setVideos(videos)
    setImages(images)
    setSignature(signature)
    setCampingId(campingId)
    setClient(client_chat)
    setConsultant(consultant)
    navigation.navigate('Files')
  }

  const handleAboutNavigate = () => {
    navigation.navigate('About')
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    })

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  // const getChats = async () => {
  //   const chatQuery = query(chatsRef);
  //   const unsubscribe = onSnapshot(chatQuery, async (querySnapshot) => {
  //     const chat: any[] = [];
  //     querySnapshot.forEach(async (document) => {
  //       console.log(document.data())
  //       if (document.data().support.count) {
  //         chat.push({
  //           id: document.data().id,
  //           email: document.data().email,
  //           name: document.data().name,
  //           count: document.data().support.count,
  //           status: document.data().status
  //         })
  //       } else {
  //         chat.push({
  //           id: document.data().id,
  //           email: document.data().email,
  //           name: document.data().name,
  //           count: 0,
  //           status: document.data().status
  //         })
  //       }
  //     });
  //     setChats(chat)
  //   })
  // }

  // const handleSnapshot = async () => {
  //   const verify = campaing?.getCampaingByClient.filter(async item => {
  //     const chatCount = await firestore()
  //       .collection('chats')
  //       .doc(`${item._id}`)
  //       .get()

  //     return chatCount.exists
  //   })

  //   verify?.forEach(async item => {
  //     const chatCount = firestore().collection('chats').doc(`${item._id}`)
  //     const ext = await chatCount.get()

  //     if (ext) {
  //       chatCount.onSnapshot(doc => {
  //         const count = {
  //           count:
  //             doc.data()?.client?.count === undefined
  //               ? 0
  //               : doc.data()?.client?.count,
  //         }

  //         //@ts-ignore
  //         setNewFiltered([campaing?.getCampaingByClient, count])
  //       })
  //     }
  //   })

  //   const temp = campaing?.getCampaingByClient?.map((item: any, index) => {
  //     const idx = newFiltered?.map(subItem => {
  //       return subItem.count === undefined ? 0 : subItem.count
  //     })

  //     return {
  //       ...item,
  //       count: idx[index],
  //     }
  //   })

  //   //@ts-ignore
  //   setFiltered(temp)
  // }

  useEffect(() => {
    // handleSnapshot()
    getChatCountMsg()

    setFiltered(
      // @ts-ignore
      campaing?.getCampaingByClient?.filter(get => {
        if (!get?.title) {
          return
        }
        if (search === '') {
          return get
        } else if (
          get?.title?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dayjs(get.startDate)
            .format('DD-MM-YYY')
            .toLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          dayjs(get.endDate)
            .format('DD-MM-YYY')
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return get
        }
      }),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, campaing])

  if (loadingClient) {
    return <Loading />
  }

  if (errorClient) {
    return <Error />
  }

  return (
    <Wrapper style={{ backgroundColor: theme.colors.primary }}>
      <Wrapper style={{ backgroundColor: theme.colors.background300 }}>
        <Box
          pd={16}
          align="center"
          flexDirection="row"
          bgc={theme.colors.primary}
          justify="space-between">
          <LogoLight width={95} height={44} />
          <Pressable onPress={handleAboutNavigate}>
            <Icon
              type="Feather"
              name="menu"
              size={32}
              color={theme.colors.textSecondary}
            />
            {support > 0 && (
              <View
                style={{
                  position: 'absolute',
                  // bottom: 50,
                  // left: 25,
                  padding: 2,
                  width: 20,
                  height: 20,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 50,
                  zIndex: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextBase
                  fz={11}
                  ff={theme.fonts.lato700}
                  color={theme.colors.background}>
                  {support >= 9 ? '+9' : `${support}`}
                </TextBase>
              </View>
            )}
          </Pressable>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Space h={16} />
          <Box align="center">
            <Button
              bc={theme.colors.background}
              w="50%"
              h="40px"
              onPress={handleNwtWorks}>
              <TextBase
                color={theme.colors.primary}
                a="center"
                fz={18}
                ff={theme.fonts.lato700}>
                Relatórios diário
              </TextBase>
            </Button>
          </Box>
          <Space h={32} />
          <Box ph={16}>
            <TextBase fz={20} ff={theme.fonts.lato700}>
              Planejamentos
            </TextBase>
          </Box>
          <Space h={10} />
          <Box
            ph={16}
            pb={16}
            flexDirection="row"
            justify="space-between"
            align="center">
            <Search
              placeholder="Pesquisar por título ou data"
              onChangeText={setSearch}
            />
          </Box>

          {filtered?.length === 0 ? (
            <Box align="center" justify="center">
              <TextBase>Nenhum planejamento foi encontrado.</TextBase>
            </Box>
          ) : (
            <>
              {filtered?.map(item => {
                return (
                  <CardButton key={item._id}>
                    <Box
                      w="100%"
                      ovf
                      mg={4}
                      br={8}
                      pd={16}
                      bgc={theme.colors.background}
                      style={{
                        elevation: 3,
                      }}>
                      <Box>
                        <Box flexDirection="row">
                          <Box flexDirection="row" flexBox align="center">
                            <TextBase
                              color={theme.colors.mono900}
                              ff={theme.fonts.lato700}>
                              {item.title}
                            </TextBase>
                          </Box>
                          <StatusButton
                            style={{
                              backgroundColor:
                                item.status === 'Em andamento'
                                  ? '#FFEBD4'
                                  : '#90EE90',
                            }}>
                            <TextBase fz={13} ff={theme.fonts.lato700}>
                              {item.status}
                            </TextBase>
                          </StatusButton>
                        </Box>
                      </Box>
                      <Box>
                        <Space h={4} />
                        {item.files.images.length !== 0 && (
                          <TextBase color={theme.colors.mono300}>
                            Imagens mais recentes
                          </TextBase>
                        )}
                      </Box>
                      <Space h={16} />
                      <Photos
                        photos={item.files.images}
                        videos={item.files.videos}
                      />
                      <Space h={16} />

                      <Hr c={theme.colors.mono300} />

                      <Space h={16} />
                      <Box
                        flexBox
                        flexDirection="row"
                        justify="space-between"
                        align="flex-end">
                        <View>
                          <TextBase color={theme.colors.mono500} fz={14}>
                            Início:
                          </TextBase>
                          <TextBase
                            fz={14}
                            color={theme.colors.mono700}
                            ff={theme.fonts.lato700}>
                            {dayjs(item.startDate).format('DD/MM/YYYY')}
                          </TextBase>
                        </View>
                        <View>
                          <TextBase color={theme.colors.mono500} fz={14}>
                            Fim:
                          </TextBase>
                          <TextBase
                            fz={14}
                            color={theme.colors.mono700}
                            ff={theme.fonts.lato700}>
                            {dayjs(item.endDate).format('DD/MM/YYYY')}
                          </TextBase>
                        </View>
                      </Box>
                      <Space h={16} />

                      <Box flexDirection="row" justify="space-between">
                        <ReportAndFiles
                          onPress={() => handleGraphNavigate(item._id)}>
                          <Icon
                            type="FontAwesome"
                            name="line-chart"
                            color={theme.colors.mono700}
                            size={22}
                          />
                          <Space h={4} />
                          <TextBase
                            numberOfLines={1}
                            fz={16}
                            ff={theme.fonts.lato700}
                            color={theme.colors.mono700}>
                            Relatório
                          </TextBase>
                        </ReportAndFiles>
                        <Space w={10} />
                        <ReportAndFiles
                          onPress={() =>
                            handleFilesNavigation(
                              item.files,
                              item._id,
                              item.client,
                              item.consultant,
                            )
                          }>
                          <Icon
                            type="Octicons"
                            name="file-directory"
                            color={theme.colors.mono700}
                            size={22}
                          />
                          <Space h={4} />
                          <TextBase
                            numberOfLines={1}
                            fz={16}
                            ff={theme.fonts.lato700}
                            color={theme.colors.mono700}>
                            Arquivos
                          </TextBase>
                        </ReportAndFiles>
                        <Space w={10} />
                        <ReportAndFiles
                          onPress={() =>
                            handleChatNavigation(
                              item._id,
                              item.client,
                              item.consultant,
                            )
                          }>
                          {/* {item.count !== 0 && (
                            <View
                              style={{
                                position: 'absolute',
                                bottom: 50,
                                left: 25,
                                padding: 2,
                                width: 20,
                                height: 20,
                                backgroundColor: theme.colors.primary,
                                borderRadius: 50,
                                zIndex: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TextBase
                                fz={11}
                                ff={theme.fonts.lato700}
                                color={theme.colors.background}>
                                {item.count >= 9 ? '+9' : `${item.count}`}
                              </TextBase>
                            </View>
                          )} */}

                          <Icon
                            type="Ionicons"
                            name="ios-chatbox"
                            color={theme.colors.mono700}
                            size={25}
                          />
                          <Space h={4} />
                          <TextBase
                            numberOfLines={1}
                            fz={16}
                            ff={theme.fonts.lato700}
                            color={theme.colors.mono700}>
                            Chat
                          </TextBase>
                        </ReportAndFiles>
                      </Box>
                    </Box>
                  </CardButton>
                )
              })}
            </>
          )}
        </ScrollView>
      </Wrapper>
    </Wrapper>
  )
}

const CardButton = styled(Pressable)`
  flex: 1;
  margin: 4px;
  margin-bottom: 16px;
  padding-horizontal: 16px;
`

const StatusButton = styled(Pressable)`
  padding: 8px;
  padding-right: 16px;
  padding-left: 16px;
  border-radius: 12px;
`
const ReportAndFiles = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${p => p.theme.colors.primary200};
  padding: 16px;
`
