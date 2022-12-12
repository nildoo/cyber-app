import React from 'react'
import { AppStackScrenProps } from '../../../@types/navigation'
import { TextBase } from '../../../components/TextBase'
import { Pressable } from 'react-native'
import { Box } from '../../../components/Box'
import { useTheme } from 'styled-components/native'
import { Icon } from '../../../components/Icon'
import { Space } from '../../../components/Space'
import { ScrollWrapperView } from '../../../components/ScrollWrapperView'
import { Metrics } from '../../../components/app/Metrics'
import { Wrapper } from '../../../components/Wrapper'
import { useGetCampaingByIdQuery } from '../../../generated/graphql'
import { Loading } from '../../../components/app/Loading'
import { Error } from '../../../components/app/Error'
import { Links } from '../../../components/app/Links'
import { Meet } from '../../../components/app/Meet'

export const Report: React.FC<AppStackScrenProps<'Report'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme()
  const getCampaingByIdId = route.params?.getCampaingByIdId as string
  const {
    data,
    loading: loading,
    error,
  } = useGetCampaingByIdQuery({
    // fetchPolicy: 'no-cache',
    variables: {
      getCampaingByIdId,
    },
  })
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
            Relatório
          </TextBase>
        </Box>
      </Box>
      <ScrollWrapperView
        style={{ backgroundColor: theme.colors.background300 }}>
        <Space h={16} />
        <Metrics data={data} />

        <Box ph={16}>
          <Meet meet={data?.getCampaingById.meet} />
        </Box>

        <Box ph={16}>
          <Links links={data?.getCampaingById.links} />
        </Box>
      </ScrollWrapperView>
    </Wrapper>
  )
}
