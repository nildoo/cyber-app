import React from 'react'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { TextBase } from '../TextBase'
import { Pressable, ScrollView } from 'react-native'
import { ClientMeQuery } from '../../generated/graphql'

type Props = {
  onPress: (data: string) => void
  data: ClientMeQuery | undefined
  setNetworkType: (data: string) => void
  networkType: string
}

export const CardNetwork: React.FC<Props> = props => {
  const theme = useTheme()

  const icons = {
    facebook: (
      <Icon
        type="Fontisto"
        name="facebook"
        size={32}
        color={theme.colors.primary}
      />
    ),
    instagram: (
      <Icon
        type="Fontisto"
        name="instagram"
        size={32}
        color={theme.colors.primary}
      />
    ),
    tiktok: (
      <Icon
        type="FontAwesome5"
        name="tiktok"
        size={32}
        color={theme.colors.primary}
      />
    ),
    twitter: (
      <Icon
        type="Entypo"
        name="twitter"
        size={32}
        color={theme.colors.primary}
      />
    ),
    linkedin: (
      <Icon
        type="Entypo"
        name="linkedin"
        size={32}
        color={theme.colors.primary}
      />
    ),
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {props.data?.clientMe?.networks.map((item, index) => (
        <Pressable key={index} onPress={() => props.setNetworkType(item.name)}>
          <Box
            style={{
              elevation: 3,
              borderColor:
                props.networkType === item.name
                  ? theme.colors.primary
                  : theme.colors.background,
              borderWidth: 1,
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
            <TextBase
              style={{
                textTransform: 'capitalize',
              }}
              numberOfLines={1}>
              {item.name}
            </TextBase>
          </Box>
        </Pressable>
      ))}
    </ScrollView>
  )
}
