import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'

type Props = TextInputProps & {
  placeholder?: string
  ff?: string
  w?: string
  fz?: number
}

export const Input: React.FC<Props> = props => {
  const theme = useTheme()
  return (
    <Container
      {...props}
      placeholder={props.placeholder || ''}
      placeholderTextColor={theme.colors.mono300}
      autoCapitalize="none"
    />
  )
}

const Container = styled(TextInput)<Props>`
  height: 50px;
  font-family: ${props => props.ff || props.theme.fonts.lato400};
  padding-horizontal: 24px;
  padding-vertical: 8px;
  border-radius: 16px;
  font-size: ${props => props.fz ?? 16}px;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${p => p.theme.colors.mono700};

  ${props =>
    props.w &&
    css`
      width: ${props.w};
    `};
`
