import React from 'react'
import {TextProps, Text} from 'react-native'
import styled, {css} from 'styled-components/native'

type Props = TextProps & {
  color?: string
  fz?: number
  ff?: string
  a?: 'center' | 'flex-start' | 'flex-end'
  ta?: 'left' | 'right' | 'center' | 'justify'
  tt?: 'capitalize' | 'lowercase' | 'uppercase'
  flex?: boolean
}

export const TextBase: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const Container = styled(Text)<Props>`
  color: ${p => (p.color ? p.color : p.theme.colors.mono900)};
  font-size: ${({fz}) => (fz ? fz : 16)}px;
  font-family: ${p => (p.ff ? p.ff : p.theme.fonts.lato400)};
  text-transform: ${p => (p.tt ? p.tt : 'none')};
  ${props =>
    props.a &&
    css`
      align-self: ${props.a};
    `}

  ${props =>
    props.ta &&
    css`
      text-align: ${props.ta};
    `}

    ${props =>
    props.flex &&
    css`
      flex: 1;
    `}
`
