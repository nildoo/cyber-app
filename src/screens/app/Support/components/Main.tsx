import React, { useEffect } from 'react'
import { FlatList, Image } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { IChatType } from '../../../../@types/navigation'
import { Box } from '../../../../components/Box'
import { Space } from '../../../../components/Space'
import { TextBase } from '../../../../components/TextBase'
// import { useChatScroll } from './useScroll'

// const data = [
//   {
//     id: 0,
//     email: 'test1@gmail.com',
//     name: 'Ana',
//     office: 'Consultora',
//     thumb: 'https://thumbs.dreamstime.com/b/mulher-nova-bonita-44038960.jpg',
//     message:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id bibendum elementum, sed senectus aliquam arcu elementum dictumst. Sem dignissim dictum donec tincidunt magna.',
//     hour: '08:25',
//   },
//   {
//     id: 1,

//     name: 'Açaí do Tião',
//     email: 'test2@gmail.com',
//     thumb:
//       'https://conteudo.imguol.com.br/c/entretenimento/d5/2020/10/07/homem-com-vergonha-1602098705397_v2_450x450.jpg',
//     message:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id bibendum elementum, sed senectus aliquam arcu elementum dictumst. Sem dignissim dictum donec tincidunt magna.',
//     hour: '08:50',
//   },
//   {
//     id: 3,
//     name: 'Açaí do Tião',
//     email: 'test2@gmail.com',
//     thumb:
//       'https://conteudo.imguol.com.br/c/entretenimento/d5/2020/10/07/homem-com-vergonha-1602098705397_v2_450x450.jpg',

//     message: 'Fica em qual rua da Tijuca?',
//     hour: '08:50',
//   },
// ]

type IMainType = {
  data: IChatType | undefined
  allMessages: any[]
}

export const Main: React.FC<IMainType> = props => {
  const theme = useTheme()
  const test = {
    consultant: {
      name: 'João',
      office: 'Consultor',
      id: 'kajsd',
      email: 'test2@gmail.com',
      profileUrl: '',
    },
    user: {
      name: 'Ana',
      id: 'aaaa',
      email: 'test1@gmail.com',
      profileUrl: '',
    },
  }

  // const flatListRef = useChatScroll(
  //   props.allMessages,
  //   test.consultant.id,
  //   test.user.id,
  // )

  const user = {
    name: 'karleon',
    email: 'test1@gmail.com',
  }

  // const [messages, setMessages] = useState()

  useEffect(() => {
    console.log('adad')
  }, [props.allMessages])

  return (
    <Box flexBox bgc={theme.colors.background}>
      <FlatList
        // ref={flatListRef}
        data={props.allMessages}
        inverted
        showsVerticalScrollIndicator={false}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={({ item }) => {
          const data = item._data
          return (
            <Box>
              <Box
                align={
                  user.email === data.from.email ? 'flex-start' : 'flex-end'
                }>
                <Box flexDirection="row" pv={10} w="95%">
                  {user.email === data.to.email && (
                    <>
                      <Box w="32px" h="32px" br={32} ovf={true}>
                        <Thumb
                          source={{
                            uri: item.thumb,
                          }}
                        />
                      </Box>
                      <Space w={10} />
                    </>
                  )}
                  <Box flexBox>
                    <Box
                      br={3}
                      bgc={
                        data.from.email === user.email
                          ? theme.colors.primary
                          : theme.colors.background300
                      }
                      flexBox
                      pd={8}>
                      <TextBase
                        ff={theme.fonts.lato700}
                        color={
                          data.from.email === user.email
                            ? theme.colors.background300
                            : theme.colors.mono700
                        }>
                        {data.from.name}
                      </TextBase>
                      <Space h={4} />
                      {data.from.office ? (
                        <TextBase
                          color={
                            data.from.email === user.email
                              ? theme.colors.background300
                              : theme.colors.primary
                          }>
                          {data.from.office}
                        </TextBase>
                      ) : (
                        <TextBase
                          fz={15}
                          color={
                            data.from.email === user.email
                              ? theme.colors.background300
                              : theme.colors.mono500
                          }>
                          Você
                        </TextBase>
                      )}

                      <Space h={10} />
                      <TextBase
                        fz={15}
                        color={
                          data.from.email === user.email
                            ? theme.colors.background300
                            : theme.colors.mono500
                        }>
                        {data.message}
                      </TextBase>
                    </Box>
                    <Space h={8} />
                    <TextBase fz={12} color={theme.colors.mono500} ta="right">
                      {item.hour}
                    </TextBase>
                  </Box>

                  {user.email !== data.from.email && (
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
                  )}
                </Box>
              </Box>
            </Box>
          )
        }}
      />
    </Box>
  )
}
{
  /* <Box>
              <Box
                align={user.email === data.from.email ? 'flex-start' : 'flex-end'}>
                <Box flexDirection="row" pv={10} w="95%">
                  {user.email === data.from.email && (
                    <>
                      <Box w="32px" h="32px" br={32} ovf={true}>
                        <Thumb
                          source={{
                            uri: item.thumb,
                          }}
                        />
                      </Box>
                      <Space w={10} />
                    </>
                  )}
                  <Box flexBox>
                    <Box
                      br={3}
                      bgc={
                        data.from.email === user.email
                          ? theme.colors.primary
                          : theme.colors.background300
                      }
                      flexBox
                      pd={8}>
                      <TextBase
                        ff={theme.fonts.lato700}
                        color={
                          data.from.email === user.email
                            ? theme.colors.background300
                            : theme.colors.mono700
                        }>
                        {item.name}
                      </TextBase>
                      <Space h={4} />
                      {item.office ? (
                        <TextBase
                          color={
                            data.from.email === user.email
                              ? theme.colors.background300
                              : theme.colors.primary
                          }>
                          {item.office}
                        </TextBase>
                      ) : (
                        <TextBase
                          fz={15}
                          color={
                            data.from.email === user.email
                              ? theme.colors.background300
                              : theme.colors.mono500
                          }>
                          Você
                        </TextBase>
                      )}

                      <Space h={10} />
                      <TextBase
                        fz={16}
                        color={
                          data.from.email === user.email
                            ? theme.colors.background300
                            : theme.colors.mono500
                        }>
                        {props.data?.status}!
                      </TextBase>
                      <Space h={12} />
                      <Box h="200px" w="100%" ovf br={10}>
                        <Thumb source={{ uri: props.data?.image }} />
                      </Box>
                    </Box>
                    <Space h={8} />
                    <TextBase fz={12} color={theme.colors.mono500} ta="right">
                      {item.hour}
                    </TextBase>
                  </Box>

                  {user.email !== data.from.email && (
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
                  )}
                </Box>
              </Box>
            </Box> */
}
const Thumb = styled(Image)`
  height: 100%;
  width: 100%;
`
