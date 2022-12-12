import React from 'react'
import {
  ColorValue,
  StatusBar,
  StatusBarStyle,
  StatusBarProps,
  Platform,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import styled from 'styled-components/native'

type Props = StatusBarProps & {
  barStyle?: StatusBarStyle
  backgroundColor?: ColorValue
  props?: StatusBar
  translucent?: boolean
}

export const StatusBarColor = ({
  barStyle,
  backgroundColor,
  props,
  translucent,
}: Props) => {
  const isFocused = useIsFocused()
  return isFocused ? (
    <BarStyle
      {...props}
      translucent={translucent}
      barStyle={
        barStyle
          ? barStyle
          : Platform.OS === 'ios'
          ? 'dark-content'
          : 'light-content'
      }
      backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
    />
  ) : null
}

const BarStyle = styled(StatusBar)`
  flex: 1;
`
