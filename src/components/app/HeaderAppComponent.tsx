import React from 'react'
import { Pressable } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import LogoLight from '../../assets/logo-light.svg'
import Logo from '../../assets/logo.svg'
type IProps = {
  handleAboutNavigate: () => void
}

export const HeaderAppComponent: React.FC<IProps> = props => {
  const theme = useTheme()
  return (
    <Box
      pd={16}
      align="center"
      flexDirection="row"
      bgc={
        theme.platformIos ? theme.colors.background300 : theme.colors.primary
      }
      justify="space-between">
      {theme.platformIos ? (
        <Logo width={95} height={44} />
      ) : (
        <LogoLight width={95} height={44} />
      )}

      <Pressable onPress={props.handleAboutNavigate}>
        <Icon
          type="Feather"
          name="menu"
          size={32}
          color={
            theme.platformIos
              ? theme.colors.mono900
              : theme.colors.textSecondary
          }
        />
      </Pressable>
    </Box>
  )
}
