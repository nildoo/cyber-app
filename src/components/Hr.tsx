import React from 'react'
import styled, {css} from 'styled-components/native'
import {View} from 'react-native'

type Props = {
  c?: string
  h?: number
  w?: string
  s?: number
}

export const Hr: React.FC<Props> = props => <Wrapper {...props} />

const Wrapper = styled(View)<Props>`
  width: ${props => props.w || '100%'};
  height: ${props => props.h || 1}px;
  background-color: ${props => props.c || props.theme.colors.background};

  ${props =>
    props.s &&
    css`
      margin-top: ${props.s}px;
      margin-bottom: ${props.s}px;
    `};
`
