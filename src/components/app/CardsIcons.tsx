import React from 'react'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { TextBase } from '../TextBase'

import { Pressable, ScrollView } from 'react-native'
import { DataHistoriesQuery } from '../../generated/graphql'

type Props = {
  onPress: (data: string) => void
  data: DataHistoriesQuery | undefined
  networkTypeGraph: string
  setNetworkTypeGraph: (data: string) => void
  setChartIndex: (data: number) => void
}

export const CardsIcons: React.FC<Props> = props => {
  const theme = useTheme()

  const icons = {
    followers: (
      <Icon
        type="AntDesign"
        name="adduser"
        size={32}
        color={theme.colors.primary}
      />
    ),
    likes: (
      <Icon
        type="AntDesign"
        name="hearto"
        size={32}
        color={theme.colors.primary}
      />
    ),
    comments: (
      <Icon
        type="Feather"
        name="message-circle"
        size={32}
        color={theme.colors.primary}
      />
    ),
    reached: (
      <Icon
        type="AntDesign"
        name="sharealt"
        size={32}
        color={theme.colors.primary}
      />
    ),
    posts: (
      <Icon
        type="MaterialCommunityIcons"
        name="post-outline"
        size={32}
        color={theme.colors.primary}
      />
    ),
    profileViews: (
      <Icon
        type="MaterialCommunityIcons"
        name="account-eye-outline"
        size={32}
        color={theme.colors.primary}
      />
    ),
  }

  const handlePress = (item: string, index: number) => {
    props.setNetworkTypeGraph(item)
    props.setChartIndex(index)
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {props.data?.dataHistories.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(item.networkType, index)}>
          <Box
            style={{
              elevation: 3,
              borderColor:
                props.networkTypeGraph === item.networkType
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
            {icons[item.networkType as keyof typeof icons]}
            <Space h={8} />
            <TextBase numberOfLines={1}>
              {item.networkType === 'followers' && 'Seguidores'}
              {item.networkType === 'likes' && 'Curtidas'}
              {item.networkType === 'comments' && 'Comentários'}
              {item.networkType === 'reached' && 'Alcance'}
              {item.networkType === 'posts' && 'Postagens'}
              {item.networkType === 'profileViews' && 'Visitas ao perfil'}
            </TextBase>
          </Box>
        </Pressable>
      ))}
    </ScrollView>
  )
}
