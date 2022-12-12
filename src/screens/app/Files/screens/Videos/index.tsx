import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  Pressable,
} from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import ImageView from 'react-native-image-viewing'
import { Wrapper } from '../../../../../components/Wrapper'
import { Box } from '../../../../../components/Box'
import { Icon } from '../../../../../components/Icon'
import { Space } from '../../../../../components/Space'
import { TextBase } from '../../../../../components/TextBase'
import { AppStackScrenProps } from '../../../../../@types/navigation'
import { useFiles } from '../../../../../hooks/useFiles'
import { Files } from '../../../../../context/setFiles'

export const Videos: React.FC<AppStackScrenProps<'Videos'>> = ({
  navigation,
}) => {
  const theme = useTheme()
  const { videos } = useFiles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<any>()

  const [visible, setIsVisible] = useState(false)

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleViewVideosNavigate = (imageNumber: number, item: Files) => {
    navigation.navigate('ViewVideos', { imageNumber, videos: item })
  }

  return (
    <Wrapper>
      <ImageView
        HeaderComponent={() => (
          <Box flexDirection="row" align="center" pd={16} mt={20}>
            <Pressable onPress={handleClose}>
              <Icon
                color={theme.colors.background}
                type="AntDesign"
                name="arrowleft"
                size={22}
              />
            </Pressable>
            <Space w={16} />
            <TextBase
              onPress={handleClose}
              color={theme.colors.background}
              ff={theme.fonts.lato700}>
              Imagem top {page}
            </TextBase>
          </Box>
        )}
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      {videos?.length === 0 ? (
        <Box flexBox align="center" justify="center">
          <TextBase fz={20}>Sem vídeos no momento.</TextBase>
        </Box>
      ) : (
        <FlatList
          data={videos}
          style={{
            paddingTop: 16,
          }}
          keyExtractor={(item, index) => JSON.stringify(index)}
          numColumns={2}
          horizontal={false}
          renderItem={({ item, index }) => (
            <CardWrraper>
              <Button onPress={() => handleViewVideosNavigate(index, item)}>
                <ActivityIndicator
                  size={Platform.OS === 'ios' ? 70 : 20}
                  color={theme.colors.primary}
                />
                <Images source={{ uri: item.thumb }}>
                  <Icon
                    type="Octicons"
                    name="play"
                    size={50}
                    color={theme.colors.primary400}
                  />
                </Images>
                {item.approved && (
                  <TextBase
                    ff={theme.fonts.lato700}
                    fz={12}
                    color={theme.colors.background}
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      backgroundColor: theme.colors.primary,
                      position: 'absolute',
                      left: 12,
                      top: 12,
                      borderRadius: 30,
                    }}>
                    Aprovado
                  </TextBase>
                )}
              </Button>
            </CardWrraper>
          )}
          ListFooterComponent={() => <Space h={30} />}
        />
      )}
    </Wrapper>
  )
}

const CardWrraper = styled.View`
  width: 50%;
  flex-direction: row;
`

const Button = styled(Pressable)`
  flex: 1;
  margin: 4px;
  height: 188px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${p => p.theme.colors.primary200};
  align-items: center;
  justify-content: center;
`

const Images = styled(ImageBackground)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
`
