import React from 'react'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { TextBase } from '../TextBase'

import { Pressable, ScrollView } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../@types/navigation'
import { GetCampaingByIdQuery } from '../../generated/graphql'

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'Calendar',
    undefined
  >
  data: GetCampaingByIdQuery | undefined
}

export const CardSocialMedia: React.FC<Props> = props => {
  const theme = useTheme()

  const handleCampaignTypeNavigate = (socialName: string) => {
    props.navigation.navigate('CampaignType', { socialName, data: props.data })
  }

  const icons = {
    Facebook: (
      <Icon
        type="Fontisto"
        name="facebook"
        size={32}
        color={theme.colors.primary}
      />
    ),
    Instagram: (
      <Icon
        type="Fontisto"
        name="instagram"
        size={32}
        color={theme.colors.primary}
      />
    ),
    TikTok: (
      <Icon
        type="FontAwesome5"
        name="tiktok"
        size={32}
        color={theme.colors.primary}
      />
    ),
    Twitter: (
      <Icon
        type="Entypo"
        name="twitter"
        size={32}
        color={theme.colors.primary}
      />
    ),
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {props.data?.getCampaingById.socialMediasResults.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => handleCampaignTypeNavigate(item.name)}>
          <Box
            style={{
              elevation: 3,
            }}
            ml={16}
            mr={8}
            align="center"
            bgc={theme.colors.background}
            pd={16}
            br={8}
            mt={8}
            mb={8}
            w="112px">
            {icons[item.name as keyof typeof icons]}
            <Space h={8} />
            <TextBase numberOfLines={1} ff={theme.fonts.lato700}>
              {item.name}
            </TextBase>
          </Box>
        </Pressable>
      ))}
    </ScrollView>
  )
}
