import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import styled, { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../../../@types/navigation'
import { Box } from '../../../../../components/Box'
import { Icon } from '../../../../../components/Icon'
import { Space } from '../../../../../components/Space'
import { TextBase } from '../../../../../components/TextBase'
import { Wrapper } from '../../../../../components/Wrapper'
import { Platform } from 'react-native'
import { useFiles } from '../../../../../hooks/useFiles'
import { StatusBarColor } from '../../../../../components/StatusBarColor'

// const photos = [
//   {
//     id: 'asfsagasg',
//     url: 'https://acaifruitshow.com.br/wp-content/uploads/2021/09/FT-150.png',
//   },
//   {
//     id: 'asfsagadasdasg',
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWNI4_SKL8_-xxxiFcO1g60-AipdrnZTqq7-7XRgfmp0zNI-0Ji6FHOcioCqcS-7SaLw&usqp=CAU',
//   },
//   {
//     id: 'asfsagaddsasdasg',
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1OMzNmZ1X95EvNGw-ueB-mQDAJbCY7PfNH2CastLrOQRTusrs73-PVlcwspj-3z8ABA&usqp=CAU',
//   },
//   {
//     id: 'asfsuuksasdasg',
//     url: 'https://img.elo7.com.br/product/zoom/3EC530D/post-de-acai-para-midias-sociais-midias-sociais.jpg',
//   },
// ]

export const Images: React.FC<AppStackScrenProps<'Images'>> = ({
  navigation,
}) => {
  const theme = useTheme()
  const { images: photos } = useFiles()
  const [page, setPage] = useState(0)
  const [images, setImages] = useState<any>()

  const [visible, setIsVisible] = useState(false)
  const handleViewImagesNavigate = (imageNumber: number) => {
    setPage(imageNumber + 1)
    if (photos) {
      const img = [
        {
          uri: photos[imageNumber].url,
          approved: photos[imageNumber].approved,
        },
      ]
      setImages(img)
      setIsVisible(true)
    }

    // navigation.navigate('ViewImages', {photos, imageNumber})
  }

  const handleChatNavigate = (
    image: string,
    status: 'Aprovado' | 'Feedback',
  ) => {
    navigation.navigate('Chat', { image, status })
    handleClose()
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <Wrapper>
      <ImageView
        HeaderComponent={() => (
          <Box
            flexDirection="row"
            align="center"
            pd={16}
            mt={Platform.OS === 'ios' ? 70 : 20}>
            <StatusBarColor
              backgroundColor={theme.colors.mono900}
              barStyle="light-content"
            />
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
        FooterComponent={() => (
          <Box
            ph={16}
            flexDirection="row"
            justify="space-between"
            mb={50}
            pv={16}>
            {!images[0].approved && (
              <>
                <ApproveAndFeedback
                  onPress={() => handleChatNavigate(images[0].uri, 'Aprovado')}
                  style={{
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.primary,
                  }}>
                  <TextBase
                    ff={theme.fonts.lato700}
                    color={theme.colors.background}>
                    Aprovar
                  </TextBase>
                </ApproveAndFeedback>
                <ApproveAndFeedback
                  onPress={() => handleChatNavigate(images[0].uri, 'Feedback')}
                  style={{
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                  }}>
                  <TextBase
                    ff={theme.fonts.lato700}
                    color={theme.colors.primary}>
                    Dar feedback
                  </TextBase>
                </ApproveAndFeedback>
              </>
            )}
          </Box>
        )}
      />

      {photos?.length === 0 ? (
        <Box flexBox align="center" justify="center">
          <TextBase fz={20}>Sem imagens no momento.</TextBase>
        </Box>
      ) : (
        <FlatList
          style={{
            paddingTop: 16,
          }}
          data={photos}
          keyExtractor={(item, index) => JSON.stringify(index)}
          numColumns={2}
          horizontal={false}
          renderItem={({ item, index }) => (
            <CardWrraper>
              <Button onPress={() => handleViewImagesNavigate(index)}>
                <ActivityIndicator
                  size={Platform.OS === 'ios' ? 70 : 20}
                  color={theme.colors.primary}
                />
                <Image source={{ uri: item.url }} />
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
                    Aprovada
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
  background-color: ${p => p.theme.colors.primary200};
`

const Image = styled(ImageBackground)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
`
const ApproveAndFeedback = styled(Pressable)`
  padding-horizontal: 16px;
  padding-vertical: 5px;
  border-radius: 5px;
`
