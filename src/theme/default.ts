import { Platform } from 'react-native'

const ios = Platform.OS === 'ios'
export const theme = {
  platformIos: ios,
  colors: {
    background: '#fff',
    background300: '#F0F0F1',
    primary: '#FF6400',
    primary400: '#FFE1BD',
    primary200: '#FFEBD4',
    mono300: '#BDBFC1',
    mono500: '#747474',
    mono700: '#3d3d3d',
    mono900: '#000000',
    textSecondary: '#fff',
    danger: '#FF6347',
  },
  fonts: {
    lato300: 'Lato-Light',
    lato400: 'Lato-Regular',
    lato700: 'Lato-Bold',
    lato900: 'Lato-Black',
  },
}

// #25292e
