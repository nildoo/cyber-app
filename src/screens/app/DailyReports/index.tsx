import React, { useState } from 'react'
import { AppStackScrenProps } from '../../../@types/navigation'
import { TextBase } from '../../../components/TextBase'
import { Pressable, ScrollView } from 'react-native'
import { Box } from '../../../components/Box'
import styled, { useTheme } from 'styled-components/native'
import { Icon } from '../../../components/Icon'
import { Space } from '../../../components/Space'
import { ScrollWrapperView } from '../../../components/ScrollWrapperView'
import { CardsIcons } from '../../../components/app/CardsIcons'
import { WeeklyChart } from './components/WeeklyChart'
import { YearlyChart } from './components/YearlyChart'
import { Wrapper } from '../../../components/Wrapper'
import { useDataHistoriesQuery } from '../../../generated/graphql'
import dayjs from 'dayjs'
import { Loading } from '../../../components/app/Loading'
import { Error } from '../../../components/app/Error'
import { CardNetwork } from '../../../components/app/CardNetwork'
import { numberFormat } from '../../../components/NumberFormat'

export const DailyReports: React.FC<AppStackScrenProps<'DailyReports'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme()

  const client = route.params.client

  const client_id = client?.clientMe?._id as string
  const network = client?.clientMe?.networks[0].name as string

  const [networkType, setNetworkType] = useState(network)
  const [networkTypeGraph, setNetworkTypeGraph] = useState('followers')
  const [chartIndex, setChartIndex] = useState(0)

  const { data, loading, error } = useDataHistoriesQuery({
    variables: {
      input: {
        id: client_id,
        name: networkType,
        date: dayjs().format('YYYY-MM-DD'),
      },
    },
  })

  const networkData = client?.clientMe?.networks.filter(
    item => item.name === networkType,
  )[0]

  const card = [
    {
      id: 0,
      title: 'Seguidores',
      icon: (
        <Icon
          type="AntDesign"
          name="adduser"
          size={20}
          color={theme.colors.primary}
        />
      ),
      value: Number(networkData?.insights.followers),
    },
    {
      id: 1,
      title: 'Curtidas',
      icon: (
        <Icon
          type="AntDesign"
          name="hearto"
          size={20}
          color={theme.colors.primary}
        />
      ),
      value: Number(networkData?.insights.likes),
    },

    {
      id: 2,
      title: 'Comentários',
      icon: (
        <Icon
          type="Feather"
          name="message-circle"
          size={20}
          color={theme.colors.primary}
        />
      ),
      value: Number(networkData?.insights.comments),
    },
    {
      id: 3,
      title: 'Alcance',
      icon: (
        <Icon
          type="AntDesign"
          name="sharealt"
          size={20}
          color={theme.colors.primary}
        />
      ),
      value: Number(networkData?.insights.reached),
    },
    {
      id: 4,
      title: 'Postagens',
      icon: (
        <Icon
          type="MaterialCommunityIcons"
          name="post-outline"
          size={20}
          color={theme.colors.primary}
        />
      ),
      value: Number(networkData?.insights?.posts),
    },
    {
      id: 5,
      title: 'Visitas ao perfil',
      icon: (
        <Icon
          type="MaterialCommunityIcons"
          name="account-eye-outline"
          size={20}
          color={theme.colors.primary}
        />
      ),
      value: Number(networkData?.insights?.profileViews),
    },
  ]

  const [graphType, setGraphType] = useState<'Weekly' | 'Yearly'>('Weekly')
  const [dataType, setDataType] = useState('Seguidores')

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGraphWeekly = () => {
    setGraphType('Weekly')
  }

  const handleGraphYearly = () => {
    setGraphType('Yearly')
  }

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
        flexDirection="row"
        align="center"
        justify="space-between"
        pd={16}
        bgc={theme.colors.primary}>
        <Box flexDirection="row" align="center" flexBox>
          <Pressable onPress={handleGoBack}>
            <Icon
              color={theme.colors.background}
              type="AntDesign"
              name="arrowleft"
              size={22}
            />
          </Pressable>
          <Space w={16} />
          <TextBase
            fz={25}
            ff={theme.fonts.lato700}
            color={theme.colors.background}>
            {/* {route.params?.campaignType}  */}
            Relatório diário{' '}
          </TextBase>
        </Box>
      </Box>
      <ScrollWrapperView
        style={{ backgroundColor: theme.colors.background300 }}>
        <Space h={16} />
        <Box ph={16}>
          <TextBase fz={20} ff={theme.fonts.lato700}>
            Relatório do{' '}
            <TextBase
              fz={20}
              ff={theme.fonts.lato700}
              style={{
                textTransform: 'capitalize',
              }}>
              {networkType}
            </TextBase>
          </TextBase>
        </Box>
        <Space h={16} />
        <CardNetwork
          onPress={setDataType}
          data={client}
          networkType={networkType}
          setNetworkType={setNetworkType}
        />
        <Space h={20} />
        <Box>
          <Box ph={16}>
            <TextBase fz={20} ff={theme.fonts.lato700}>
              Relatório de{' '}
              <TextBase
                fz={20}
                ff={theme.fonts.lato700}
                style={{
                  textTransform: 'capitalize',
                }}>
                {networkTypeGraph === 'followers' && 'Seguidores'}
                {networkTypeGraph === 'likes' && 'Curtidas'}
                {networkTypeGraph === 'comments' && 'Comentários'}
                {networkTypeGraph === 'reached' && 'Alcance'}
                {networkTypeGraph === 'posts' && 'Postagens'}
                {networkTypeGraph === 'profileViews' && 'Visitas ao perfil'}
              </TextBase>
            </TextBase>
          </Box>
          <Space h={10} />
          <CardsIcons
            onPress={setDataType}
            data={data}
            setChartIndex={setChartIndex}
            networkTypeGraph={networkTypeGraph}
            setNetworkTypeGraph={setNetworkTypeGraph}
          />
          <Space h={16} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Box ph={16}>
              {graphType === 'Weekly' && (
                <WeeklyChart
                  dataType={dataType}
                  data={data}
                  chartIndex={chartIndex}
                />
              )}
              {graphType === 'Yearly' && (
                <YearlyChart
                  dataType={dataType}
                  data={data}
                  chartIndex={chartIndex}
                />
              )}
            </Box>
          </ScrollView>
          <Box
            flexDirection="row"
            align="center"
            mt={16}
            ph={16}
            justify="center">
            <GraphTypeButton
              onPress={handleGraphWeekly}
              style={{
                borderWidth: 1,
                borderColor:
                  graphType === 'Weekly'
                    ? theme.colors.background
                    : theme.colors.primary,
                backgroundColor:
                  graphType === 'Weekly'
                    ? theme.colors.primary
                    : theme.colors.background,
              }}>
              <TextBase
                onPress={handleGraphWeekly}
                color={
                  graphType === 'Weekly'
                    ? theme.colors.background
                    : theme.colors.primary
                }>
                Semanal
              </TextBase>
            </GraphTypeButton>
            <Space w={10} />
            <GraphTypeButton
              onPress={handleGraphYearly}
              style={{
                borderWidth: 1,
                borderColor:
                  graphType === 'Yearly'
                    ? theme.colors.background
                    : theme.colors.primary,
                backgroundColor:
                  graphType === 'Yearly'
                    ? theme.colors.primary
                    : theme.colors.background,
              }}>
              <TextBase
                onPress={handleGraphYearly}
                color={
                  graphType === 'Yearly'
                    ? theme.colors.background
                    : theme.colors.primary
                }>
                Anual
              </TextBase>
            </GraphTypeButton>
          </Box>
        </Box>
        <Space h={16} />
        <Box
          ph={16}
          flexDirection="row"
          justify="space-between"
          style={{
            flexWrap: 'wrap',
          }}>
          {card.map(item => (
            <Box key={item.id} w="48%" mt={5}>
              <Box
                mb={16}
                br={16}
                bgc={theme.colors.background}
                pd={16}
                style={{
                  elevation: 3,
                }}>
                <Box justify="space-between" flexDirection="row" flexBox>
                  <TextBase ff={theme.fonts.lato700} fz={25}>
                    {numberFormat(item.value)}
                  </TextBase>
                  {item.icon}
                </Box>
                <Space h={16} />
                <TextBase
                  numberOfLines={1}
                  ff={theme.fonts.lato700}
                  color={theme.colors.mono500}
                  fz={18}>
                  {item.title}
                </TextBase>
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollWrapperView>
    </Wrapper>
  )
}

const GraphTypeButton = styled(Pressable)`
  padding-horizontal: 16px;
  padding-vertical: 5px;
  border-radius: 5px;
`
