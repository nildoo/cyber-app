import React from 'react'
import { ImageBackground } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Box } from '../../../../../../components/Box'
import { Icon } from '../../../../../../components/Icon'
import { TextBase } from '../../../../../../components/TextBase'

type IPhotosProps = {
  photos: {
    url: string
    id: string
  }[]
}
export const Photos: React.FC<IPhotosProps> = props => {
  const theme = useTheme()
  return (
    <Box>
      <Box flexDirection="row">
        {props.photos.map(item => {
          return (
            <Box h="65px" br={10} ovf mr={6} flexBox key={item.id}>
              <Images source={{ uri: item.url }}>
                <Icon
                  type="Octicons"
                  name="play"
                  size={22}
                  color={theme.colors.primary400}
                />
              </Images>
            </Box>
          )
        })}

        <Box
          flexBox
          h="65px"
          br={10}
          ovf
          bgc={theme.colors.mono300}
          align="center"
          justify="center">
          <TextBase color={theme.colors.mono500} ff={theme.fonts.lato700}>
            +4
          </TextBase>
        </Box>
      </Box>
    </Box>
  )
}

const Images = styled(ImageBackground)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
