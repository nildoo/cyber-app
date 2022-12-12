import React from 'react'
import {Pressable} from 'react-native'
import {useTheme} from 'styled-components/native'
import {AppStackScrenProps} from '../../../@types/navigation'
import {Box} from '../../../components/Box'
import {Hr} from '../../../components/Hr'
import {Icon} from '../../../components/Icon'
import {Image} from '../../../components/Image'
import {Space} from '../../../components/Space'
import {TextBase} from '../../../components/TextBase'
import {Wrapper} from '../../../components/Wrapper'

export const Notifications: React.FC<AppStackScrenProps<'Notifications'>> = ({
  navigation,
}) => {
  const theme = useTheme()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleChatNavigation = () => {
    navigation.navigate('Chat')
  }

  return (
    <Wrapper>
      <Box flexDirection="row" align="center" pd={16}>
        <Pressable onPress={handleGoBack}>
          <Icon
            color={theme.colors.mono900}
            type="AntDesign"
            name="arrowleft"
            size={22}
          />
        </Pressable>
        <Space w={16} />
        <TextBase fz={25} ff={theme.fonts.lato700} color={theme.colors.mono700}>
          Notificações
        </TextBase>
      </Box>
      <Box ph={16}>
        <Box>
          <TextBase color={theme.colors.mono500} ff={theme.fonts.lato700}>
            Você tem{' '}
            <TextBase ff={theme.fonts.lato700} color={theme.colors.primary}>
              3 notificações
            </TextBase>{' '}
            hoje.
          </TextBase>
        </Box>
        <Space h={20} />
        <TextBase fz={18} ff={theme.fonts.lato700}>
          Hoje
        </TextBase>
        <Space h={32} />
        <Pressable onPress={handleChatNavigation}>
          <Box flexDirection="row">
            <Box
              flexBox
              flexDirection="row"
              justify="space-between"
              align="center">
              <Box h="60px" w="60px" br={60} ovf>
                <Image
                  source={{
                    uri: 'https://thumbs.dreamstime.com/b/mulher-nova-bonita-44038960.jpg',
                  }}
                />
              </Box>
              <Space w={16} />
              <Box flexBox>
                <TextBase
                  ff={theme.fonts.lato700}
                  color={theme.colors.primary}
                  numberOfLines={1}>
                  Jully{' '}
                  <TextBase fz={14} color={theme.colors.mono500}>
                    (Consultora)
                  </TextBase>
                </TextBase>
                <Space h={4} />
                <TextBase
                  fz={14}
                  numberOfLines={1}
                  color={theme.colors.mono500}>
                  Projeto{' '}
                  <TextBase
                    fz={12}
                    ff={theme.fonts.lato700}
                    color={theme.colors.mono500}>
                    #57DADN
                  </TextBase>
                </TextBase>
                <Space h={4} />
                <TextBase color={theme.colors.mono500} numberOfLines={1}>
                  Olá, tudo bem? - 3 horas atrás
                </TextBase>
              </Box>

              <Box
                h="50px"
                w="50px"
                br={10}
                ml={20}
                ovf
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                }}>
                <Image
                  source={{
                    uri: 'https://acaifruitshow.com.br/wp-content/uploads/2021/09/FT-150.png',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Pressable>

        <Space h={20} />
        <Hr c={theme.colors.primary200} />
        <Space h={20} />
      </Box>
    </Wrapper>
  )
}
