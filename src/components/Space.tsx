import React from 'react'
import {ViewProps, View} from 'react-native'
import styled from 'styled-components/native'

type Props = ViewProps & {
  w?: number
  h?: number
}

export const Space: React.FC<Props> = (props): JSX.Element => (
  <Wrapper {...props} />
)

const Wrapper = styled(View)<Props>`
  width: ${({w}) => (w ? w : 0)}px;
  height: ${({h}) => (h ? h : 0)}px;
`
