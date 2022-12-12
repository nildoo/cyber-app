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
}

export const AdditionalProducts: React.FC<Props> = props => {
  const theme = useTheme()

  const cardIcons = [
    {
      id: 0,
      title: 'Desenvolvimento  de \n sites',
      otherContracts: props.data?.clientMe?.othersContracts.site_development,
      icon: (
        <Icon
          type="Entypo"
          name="tools"
          size={32}
          color={theme.colors.primary}
        />
      ),
    },
    {
      id: 1,
      title: 'Manutenção de \n sites',
      otherContracts: props.data?.clientMe?.othersContracts.site_maintenance,
      icon: (
        <Icon
          type="MaterialIcons"
          name="support"
          size={32}
          color={theme.colors.primary}
        />
      ),
    },

    {
      id: 2,
      title: 'Landing Page \n',
      otherContracts: props.data?.clientMe?.othersContracts.landing_page,
      icon: (
        <Icon
          type="MaterialCommunityIcons"
          name="developer-board"
          size={32}
          color={theme.colors.primary}
        />
      ),
    },
    {
      id: 3,
      title: 'Arte extra \n',
      otherContracts: props.data?.clientMe?.othersContracts.extra_art,
      icon: (
        <Icon
          type="Ionicons"
          name="color-palette"
          size={32}
          color={theme.colors.primary}
        />
      ),
    },
    {
      id: 4,
      title: 'Network extra \n',
      otherContracts: props.data?.clientMe?.othersContracts.extra_network,
      icon: (
        <Icon
          type="FontAwesome5"
          name="network-wired"
          size={32}
          color={theme.colors.primary}
        />
      ),
    },
  ]

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cardIcons.map(item => {
        if (item.otherContracts === false) {
          return
        }
        return (
          <Pressable key={item.id}>
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
              w="200px">
              {item.icon}
              <Space h={8} />
              <TextBase numberOfLines={2} ta="center" ff={theme.fonts.lato700}>
                {item.title}
              </TextBase>
            </Box>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}
