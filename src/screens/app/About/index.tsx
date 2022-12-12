import React from 'react'
import { Pressable, ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../@types/navigation'
import { Box } from '../../../components/Box'
import { Button } from '../../../components/Button'
import { Hr } from '../../../components/Hr'
import { Icon } from '../../../components/Icon'
import { Space } from '../../../components/Space'
import { TextBase } from '../../../components/TextBase'
import { Wrapper } from '../../../components/Wrapper'

import Logo from '../../../assets/logo.svg'
import { StatusBarColor } from '../../../components/StatusBarColor'
import { useAuth } from '../../../hooks/useAuth'
import { useClientMeQuery } from '../../../generated/graphql'
import { Loading } from '../../../components/app/Loading'
import { Error } from '../../../components/app/Error'
import { AdditionalProducts } from '../../../components/app/AdditionalProducts'
import { useChatPerson } from '../../../hooks/useChatPerson'

export const About: React.FC<AppStackScrenProps<'About'>> = ({
  navigation,
}) => {
  const { data, error, loading } = useClientMeQuery()
  const theme = useTheme()
  const { removeTokenClient } = useAuth()
  const { support } = useChatPerson()
  const handleSupportNavaigate = () => {
    navigation.navigate('Support', { client: data })
  }

  const logout = () => {
    removeTokenClient()
  }
  const handleGoBack = () => {
    navigation.goBack()
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <Wrapper style={{ backgroundColor: theme.colors.background300 }}>
      <StatusBarColor
        barStyle="dark-content"
        backgroundColor={theme.colors.background300}
      />
      <ScrollView
        style={{ backgroundColor: theme.colors.background300 }}
        showsVerticalScrollIndicator={false}>
        <Space h={16} />
        <Box pd={16} align="flex-end" bgc={theme.colors.background300}>
          <Pressable onPress={handleGoBack}>
            <Icon
              type="AntDesign"
              name="arrowleft"
              size={32}
              color={theme.colors.primary}
            />
          </Pressable>
        </Box>
        {/* <Box
          w="160px"
          h="160px"
          ml={16}
          br={80}
          style={{
            borderColor: theme.colors.primary,
            borderWidth: 6,
            overflow: 'hidden',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{
              // uri: 'https://github.com/Agencia-Netmidia.png',
              uri: 'https://github.com/jhonataspaulo.png',
            }}
          />
        </Box> */}
        <Space h={16} />
        <Box ph={16}>
          <TextBase fz={24} ff={theme.fonts.lato700}>
            {data?.clientMe?.name}
          </TextBase>
          <Space h={16} />
          <Hr c={theme.colors.mono300} s={24} />
          <TextBase fz={20}>CNPJ: 00.000.000/0000-00</TextBase>
          <Hr c={theme.colors.mono300} s={24} />
          <TextBase fz={20}>{data?.clientMe?.email}</TextBase>
          <Hr c={theme.colors.mono300} s={24} />
          <TextBase fz={20}>{data?.clientMe?.whatsapp}</TextBase>
          <Hr c={theme.colors.mono300} s={24} />
          <Box>
            <TextBase fz={14}>Tipo de contrato:</TextBase>
            <Space h={5} />
            <TextBase fz={20}>{data?.clientMe?.contractType?.title}</TextBase>
          </Box>
          <Hr c={theme.colors.mono300} s={24} />
          <TextBase fz={20} onPress={handleSupportNavaigate}>
            Suporte{' '}
          </TextBase>
          {support > 0 && <Space h={8} />}

          {support === 1 && (
            <TextBase
              onPress={handleSupportNavaigate}
              fz={16}
              ff={theme.fonts.lato700}
              color={theme.colors.primary}>
              Você tem {support} mensagem
            </TextBase>
          )}

          {support > 1 && (
            <TextBase
              onPress={handleSupportNavaigate}
              fz={16}
              ff={theme.fonts.lato700}
              color={theme.colors.primary}>
              Você tem {support >= 9 ? '+9' : `${support}`} mensagens
            </TextBase>
          )}

          <Hr c={theme.colors.mono300} s={24} />
          <TextBase fz={20}>Produtos adicionais</TextBase>
          <Space h={16} />
          {data?.clientMe?.othersContracts.extra_art === false &&
          data?.clientMe?.othersContracts.extra_network === false &&
          data?.clientMe?.othersContracts.landing_page === false &&
          data?.clientMe?.othersContracts.site_development === false &&
          data?.clientMe?.othersContracts.site_maintenance === false ? (
            <TextBase>Sem produtos adiocionais</TextBase>
          ) : (
            <AdditionalProducts onPress={() => {}} data={data} />
          )}

          <Hr c={theme.colors.mono300} s={24} />

          <Box flexDirection="row">
            <Icon
              type="AntDesign"
              name="facebook-square"
              size={32}
              color={theme.colors.primary}
            />
            <Space w={12} />
            <Icon
              type="Entypo"
              name="instagram-with-circle"
              size={32}
              color={theme.colors.primary}
            />
            <Box flexBox align="flex-end">
              <Logo width={100} height={37} />
            </Box>
          </Box>
        </Box>

        <Space h={24} />
        <Box ph={16} pv={24} bgc={theme.colors.background300}>
          <Button h="60px" br={32} onPress={logout}>
            <Box align="center" flexDirection="row" justify="center">
              <Icon
                type="SimpleLineIcons"
                name="logout"
                size={32}
                color={theme.colors.textSecondary}
              />
              <Space w={16} />
              <TextBase
                color={theme.colors.textSecondary}
                ff={theme.fonts.lato700}
                fz={20}>
                Encerrar sessão
              </TextBase>
            </Box>
          </Button>
        </Box>
      </ScrollView>
    </Wrapper>
  )
}
