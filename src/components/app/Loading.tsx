import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { ScrollWrapperView } from '../ScrollWrapperView'

const { height } = Dimensions.get('window')

export const Loading: React.FC = () => {
  const theme = useTheme()
  const [color, setColor] = useState(theme.colors.primary)

  const handleColor = () => {
    setTimeout(() => {
      if (color === theme.colors.primary400) {
        return setColor(theme.colors.primary)
      }
      if (color === theme.colors.primary400) {
        return setColor(theme.colors.primary400)
      }
    }, 1500)
  }

  useEffect(() => {
    handleColor()
  }, [color])

  return (
    <ScrollWrapperView>
      <Box
        style={{
          height: height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={70} color={color} />
      </Box>
    </ScrollWrapperView>
  )
}
