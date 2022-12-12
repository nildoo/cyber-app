import React from 'react'
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native'
import styled from 'styled-components/native'

type Props = PressableProps & {
  accessibilityRole?: 'button'
  b?: number
  bc?: string
  br?: number
  bdc?: string
  w?: string
  h?: string
  align?: 'flex-start' | 'center' | 'flex-end'
  justify?:
    | 'flex-end'
    | 'flex-start'
    | 'center'
    | 'space-between'
    | 'space-around'
}

const opacityStyle = ({
  pressed,
}: PressableStateCallbackType): StyleProp<ViewStyle> => ({
  opacity: pressed ? 0.5 : 1,
  elevation: 4,
})

export const Button: React.FC<Props> = (props): JSX.Element => {
  return <Container style={opacityStyle} {...props} />
}

const Container = styled(Pressable)<Props>`
  flex-direction: row;
  width: ${props => props.w || '100%'};
  background-color: ${props =>
    props.bc ? props.bc : props.theme.colors.primary};
  height: ${props => (props.h ? props.h : '50px')};
  border: ${props => (props.b ? props.b : 0)}px;
  border-radius: ${props => (props.br ? props.br : 16)}px;
  border: 1px solid ${props => props.bdc || 'transparent'};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
`
