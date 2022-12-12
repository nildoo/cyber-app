import React, { useState } from 'react'
import { Pressable, RefreshControl, ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../@types/navigation'
import { Box } from '../../../components/Box'
import { Icon } from '../../../components/Icon'
import { Space } from '../../../components/Space'
import { TextBase } from '../../../components/TextBase'
import { Wrapper } from '../../../components/Wrapper'
import LogoLight from '../../../assets/logo-light.svg'
import { Button } from '../../../components/Button'

import { Calendar as CalendarLib, LocaleConfig } from 'react-native-calendars'
import dayjs from 'dayjs'
import { CardSocialMedia } from '../../../components/app/CardSocialMedia'
import { AdditionalProducts } from '../../../components/app/AdditionalProducts'
import { useGetCampaingByIdQuery } from '../../../generated/graphql'
import { Loading } from '../../../components/app/Loading'
import { Error } from '../../../components/app/Error'

LocaleConfig.locales.br = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Domingo',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: "Aujourd'hui",
}
LocaleConfig.defaultLocale = 'br'

export const Calendar: React.FC<AppStackScrenProps<'Calendar'>> = ({
  navigation,
  route,
}) => {
  const [date, setDate] = useState(dayjs())
  const theme = useTheme()

  const getCampaingByIdId = route.params?.getCampaingByIdId as string
  const {
    data,
    loading: loading,
    error,
    refetch,
  } = useGetCampaingByIdQuery({
    variables: {
      getCampaingByIdId,
    },
  })

  const handleGoBack = () => {
    navigation.goBack()
  }
  const handleAboutNavigate = () => {
    navigation.navigate('About')
  }

  const monthLabel = dayjs(date).format('MMMM')
  const month =
    monthLabel.substring(0, 1).toUpperCase() +
    monthLabel.substring(1, monthLabel.length) +
    ' ' +
    dayjs(date).format('YYYY')

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <Wrapper
      style={{
        backgroundColor: theme.colors.primary,
      }}>
      <Box
        bgc={theme.colors.primary}
        pv={8}
        ph={16}
        flexDirection="row"
        align="center">
        <Pressable onPress={handleGoBack}>
          <Icon
            type="Ionicons"
            name="chevron-back-circle"
            size={30}
            color={theme.colors.textSecondary}
          />
        </Pressable>
        <Box flexBox align="center" justify="center" flexDirection="row">
          <LogoLight width={95} height={44} />
          <Space w={18} />
        </Box>
        <Pressable onPress={handleAboutNavigate}>
          <Icon
            type="Feather"
            name="menu"
            size={28}
            color={theme.colors.textSecondary}
          />
        </Pressable>
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            colors={[theme.colors.primary, '#FF9C37']}
            onRefresh={refetch}
          />
        }
        style={{
          backgroundColor: theme.colors.background300,
        }}>
        <Space h={24} />
        <TextBase
          color={theme.colors.primary}
          a="center"
          fz={24}
          ff={theme.fonts.lato700}>
          Calendário
        </TextBase>
        <Space h={24} />
        <Box align="center">
          <Button bc={theme.colors.background} w="50%" h="40px">
            <TextBase
              color={theme.colors.primary}
              a="center"
              fz={18}
              ff={theme.fonts.lato700}>
              {month}
            </TextBase>
          </Button>
        </Box>
        <Space h={24} />
        <Box flexDirection="row" align="center" ph={16}>
          <Box flexBox>
            <CalendarLib
              onPressArrowRight={addMonth => {
                addMonth()
                setDate(dayjs(date).add(1, 'month'))
              }}
              onPressArrowLeft={subtractMonth => {
                subtractMonth()
                setDate(dayjs(date).subtract(1, 'month'))
              }}
              theme={{
                arrowColor: theme.colors.primary,
              }}
              dayComponent={({ date: calendarDate }) => (
                <>
                  <Box flexBox align="center">
                    {calendarDate?.dateString ===
                    dayjs().format('YYYY-MM-DD') ? (
                      <Box
                        bgc={theme.colors.primary}
                        align="center"
                        justify="center"
                        br={30}
                        h="30px"
                        w="30px">
                        <TextBase color={theme.colors.background}>
                          {calendarDate?.day}
                        </TextBase>
                      </Box>
                    ) : (
                      <Box
                        bgc={theme.colors.background}
                        align="center"
                        justify="center"
                        br={30}
                        h="30px"
                        w="30px">
                        <TextBase
                          color={
                            dayjs(calendarDate?.dateString).format('MM') ===
                            dayjs().format('MM')
                              ? theme.colors.primary
                              : theme.colors.mono300
                          }>
                          {calendarDate?.day}
                        </TextBase>
                      </Box>
                    )}
                  </Box>
                </>
              )}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                elevation: 3,
                margin: 2,
              }}
              renderHeader={() => {
                return <></>
              }}
              initialDate={dayjs(date).format('YYYY-MM-DD')}
            />
          </Box>
        </Box>
        <Space h={24} />
        <TextBase
          color={theme.colors.primary}
          a="center"
          fz={24}
          ff={theme.fonts.lato700}>
          Análises
        </TextBase>
        <Space h={24} />
        <Box>
          <CardSocialMedia navigation={navigation} data={data} />
        </Box>
        <Space h={24} />
        <TextBase
          color={theme.colors.primary}
          a="center"
          fz={24}
          ff={theme.fonts.lato700}>
          Produtos adicionais
        </TextBase>
        <Space h={24} />
        <AdditionalProducts onPress={() => {}} />
        <Space h={24} />
      </ScrollView>
    </Wrapper>
  )
}
