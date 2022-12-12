import React from 'react'
import { Wrapper } from '../../../components/Wrapper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Videos } from './screens/Videos'
import { Images } from './screens/Images'
import { Box } from '../../../components/Box'
import { Icon } from '../../../components/Icon'
import { TextBase } from '../../../components/TextBase'
import { useTheme } from 'styled-components/native'
import { Space } from '../../../components/Space'
import { All } from './screens/All'
import { AppStackScrenProps } from '../../../@types/navigation'
import { Pressable } from 'react-native'
import { StatusBarColor } from '../../../components/StatusBarColor'
import { Client } from './screens/Client'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const components = [
  // { id: 0, component: All, name: 'Todos' },
  { id: 0, component: Images, name: 'Imagens' },
  { id: 1, component: Videos, name: 'Vídeos' },
  { id: 2, component: Client, name: 'Cliente' },
]

export const Files: React.FC<AppStackScrenProps<'Files'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme()
  const data = route.params?.data
  // console.log(data)

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <Wrapper>
      <StatusBarColor
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <Box flexDirection="row" align="center" ph={16} pv={16}>
        <Pressable onPress={handleGoBack}>
          <Icon
            color={theme.colors.mono900}
            type="AntDesign"
            name="arrowleft"
            size={22}
          />
        </Pressable>
        <Space w={16} />
        <TextBase fz={18} ff={theme.fonts.lato700} color={theme.colors.mono900}>
          Arquivos de campanha
        </TextBase>
      </Box>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mono300,
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarPressColor: '#F4F5F5',
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontFamily: theme.fonts.lato700,
            fontSize: 15,
          },
        }}>
        {components.map(item => (
          <Screen
            key={item.id}
            name={item.name}
            component={item.component}
            initialParams={{ data }}
          />
        ))}
      </Navigator>
    </Wrapper>
  )
}
