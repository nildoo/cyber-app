import React from 'react'
import { SafeAreaView } from 'react-native'
import { SafeAreaViewProps } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

type Props = SafeAreaViewProps & {
  ph?: number
  bgc?: string
}

import { getStatusBarHeight } from 'react-native-status-bar-height'
console.log(getStatusBarHeight())

export const Wrapper: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const Container = styled(SafeAreaView)<Props>`
  flex: 1;
  background-color: ${props =>
    props.bgc ? props.bgc : props.theme.colors.background};
  padding-horizontal: ${props => (props.ph ? props.ph : 0)}px;
`
