import React from 'react'
import { Dimensions } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { ScrollWrapperView } from '../ScrollWrapperView'
import { Space } from '../Space'
import { TextBase } from '../TextBase'

const { height } = Dimensions.get('window')

export const Error: React.FC = () => {
  const theme = useTheme()

  return (
    <ScrollWrapperView>
      <Box
        style={{
          height: height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name="error-outline"
          color={theme.colors.primary}
          size={80}
          type="MaterialIcons"
        />
        <Space h={16} />
        <TextBase ta="center" ff={theme.fonts.lato400} fz={20}>
          Sua sessão foi expirada. {'\n'} Por favor, reinicie o aplicativo.
        </TextBase>
      </Box>
    </ScrollWrapperView>
  )
}
