import React from 'react'
import {TextInput, TextInputProps} from 'react-native'
import styled, {css, useTheme} from 'styled-components/native'
import {Icon} from './Icon'

type Props = TextInputProps & {
  placeholder?: string
  ff?: string
  w?: string
  fz?: number
  enable: boolean
  setEnable: (enable: boolean) => void
}

export const InputPassword: React.FC<Props> = props => {
  const toggle = () => {
    props.setEnable(!props.enable)
  }
  const theme = useTheme()
  return (
    <Wrapper>
      <Container
        {...props}
        placeholder={props.placeholder || ''}
        secureTextEntry={props.enable ? false : true}
        placeholderTextColor={theme.colors.mono300}
      />
      <Button onPress={toggle}>
        {props.enable ? (
          <Icon
            type="Feather"
            name="eye-off"
            size={24}
            color={theme.colors.primary}
          />
        ) : (
          <Icon
            type="Feather"
            name="eye"
            size={24}
            color={theme.colors.primary}
          />
        )}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.View<Props>`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.primary};
  font-family: ${props => props.ff || props.theme.fonts.lato400};
  padding-horizontal: 24px;
  padding-vertical: 8px;
  border-radius: 16px;

  ${props =>
    props.w &&
    css`
      width: ${props.w};
    `};
`

const Container = styled(TextInput)<Props>`
  flex: 1;
  height: 50px;
  font-size: ${props => props.fz ?? 16}px;
  color: ${p => p.theme.colors.mono700};
`

const Button = styled.Pressable``
