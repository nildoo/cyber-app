import React from 'react'
import {useTheme} from 'styled-components/native'
import {Box} from '../Box'
import {Icon} from '../Icon'
import {TextBase} from '../TextBase'

type Props = {}

export const Investiment: React.FC<Props> = () => {
  const theme = useTheme()
  return (
    <Box flexDirection="row" align="center">
      <Icon
        type="MaterialIcons"
        name="attach-money"
        size={80}
        color={theme.colors.primary}
      />
      <Box>
        <TextBase color={theme.colors.primary}>Investimento inicial</TextBase>
        <TextBase color={theme.colors.primary} ff={theme.fonts.lato900} fz={42}>
          R$ 3.500,00
        </TextBase>
      </Box>
    </Box>
  )
}
