import * as React from 'react'
import {
  Animated,
  ScrollViewProps,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import styled from 'styled-components/native'

type Props = ScrollViewProps & {
  ph?: number
  bgc?: string
}

export const ScrollWrapperView: React.FC<Props> = props => {
  return (
    <SafeArea {...props}>
      <Container showsVerticalScrollIndicator={false}>
        <Animated.ScrollView>{props.children}</Animated.ScrollView>
      </Container>
    </SafeArea>
  )
}

const SafeArea = styled(SafeAreaView)<Props>`
  flex: 1;
  background-color: ${props => props.bgc || props.theme.colors.background};
  padding-horizontal: ${props => (props.ph ? props.ph : 0)}px;
`
const Container = styled(ScrollView)``
