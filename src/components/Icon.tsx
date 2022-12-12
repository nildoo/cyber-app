import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

type Props = {
  type:
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'FontAwesome'
    | 'Fontisto'
    | 'Ionicons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Feather'
    | 'Foundation'
    | 'FontAwesome5'

  name: string
  size?: number
  color?: string
}

const icons = [
  { name: 'MaterialCommunityIcons', Component: MaterialCommunityIcons },
  { name: 'MaterialIcons', Component: MaterialIcons },
  { name: 'AntDesign', Component: AntDesign },
  { name: 'Entypo', Component: Entypo },
  { name: 'EvilIcons', Component: EvilIcons },
  { name: 'FontAwesome', Component: FontAwesome },
  { name: 'Fontisto', Component: Fontisto },
  { name: 'Ionicons', Component: Ionicons },
  { name: 'Octicons', Component: Octicons },
  { name: 'SimpleLineIcons', Component: SimpleLineIcons },
  { name: 'Feather', Component: Feather },
  { name: 'Foundation', Component: Foundation },
  { name: 'FontAwesome5', Component: FontAwesome5 },
]

export const Icon = ({ type, size, name, color }: Props) => {
  const { Component }: any = icons.find(icon => icon.name === type)

  return <Component name={name} size={size} color={color} />
}
