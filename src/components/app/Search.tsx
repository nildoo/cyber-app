import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled, { useTheme, css } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'

type Props = TextInputProps & {
  placeholder?: string
  ff?: string
  w?: string
  fz?: number
}

export const Search: React.FC<Props> = props => {
  const theme = useTheme()
  return (
    <Box
      style={{
        elevation: 3,
      }}
      bgc={theme.colors.background}
      flexBox
      br={24}
      flexDirection="row"
      align="center"
      ph={8}>
      <Container
        {...props}
        placeholder={props.placeholder || ''}
        placeholderTextColor={theme.colors.mono300}
      />
      {/* <Icon
        type="Feather"
        name="search"
        size={24}
        color={theme.colors.primary}
      /> */}
    </Box>
  )
}

const Container = styled(TextInput)<Props>`
  height: 45px;
  font-family: ${props => props.ff || props.theme.fonts.lato400};
  padding-horizontal: 8px;
  padding-vertical: 8px;
  border-radius: 16px;
  font-size: ${props => props.fz ?? 16}px;
  color: ${p => p.theme.colors.mono700};
  flex: 1;

  ${props =>
    props.w &&
    css`
      width: ${props.w};
    `};
`
