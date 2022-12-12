import React from 'react'
import { ActivityIndicator, ImageBackground, Platform } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Box } from '../../../../components/Box'
import { Icon } from '../../../../components/Icon'

import { TextBase } from '../../../../components/TextBase'

type IPhotosProps = {
  photos: {
    __typename?: 'File' | undefined
    url: string
    thumb: string
    title: string
  }[]
  videos: {
    __typename?: 'File' | undefined
    url: string
    thumb: string
    title: string
  }[]
}

export const Photos: React.FC<IPhotosProps> = props => {
  const theme = useTheme()

  const result = props.photos.length + props.videos.length

  return (
    <Box>
      <Box flexDirection="row">
        {result === 0 ? (
          <Box
            flexBox
            h="85px"
            br={10}
            ovf
            bgc={theme.colors.primary200}
            align="center"
            justify="center">
            <TextBase color={theme.colors.mono500} ff={theme.fonts.lato700}>
              Sem Arquivos
            </TextBase>
          </Box>
        ) : (
          <>
            {props.photos[props.photos.length - 1]?.url && (
              <Box
                align="center"
                justify="center"
                h="85px"
                br={10}
                ovf
                mr={6}
                flexBox
                bgc={theme.colors.primary200}>
                <ActivityIndicator
                  size={Platform.OS === 'ios' ? 70 : 20}
                  color={theme.colors.primary}
                />
                <Images
                  source={{ uri: props.photos[props.photos.length - 1]?.url }}
                />
              </Box>
            )}
            {props.videos[props.videos.length - 1]?.thumb && (
              <Box
                align="center"
                justify="center"
                h="85px"
                br={10}
                ovf
                mr={6}
                flexBox
                bgc={theme.colors.primary200}>
                <ActivityIndicator
                  size={Platform.OS === 'ios' ? 70 : 20}
                  color={theme.colors.primary}
                />
                <Images
                  source={{
                    uri: props.videos[props.videos.length - 1]?.thumb,
                  }}>
                  <Icon
                    type="Octicons"
                    name="play"
                    size={20}
                    color={theme.colors.primary400}
                  />
                </Images>
              </Box>
            )}
          </>
        )}

        {result >= 3 && (
          <Box
            flexBox
            h="85px"
            br={10}
            ovf
            bgc={theme.colors.mono300}
            align="center"
            justify="center">
            <TextBase color={theme.colors.mono500} ff={theme.fonts.lato700}>
              +{result - 2}
            </TextBase>
          </Box>
        )}
      </Box>
    </Box>
  )
}

const Images = styled(ImageBackground)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
`
