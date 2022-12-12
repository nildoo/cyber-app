import React, { useEffect, useState } from 'react'
import {
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import styled, { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../../../@types/navigation'
import { Box } from '../../../../../components/Box'
import { Icon } from '../../../../../components/Icon'
import { Space } from '../../../../../components/Space'
import { TextBase } from '../../../../../components/TextBase'
import { Wrapper } from '../../../../../components/Wrapper'
import { ModalAddImage } from './components/ModalAddImage'
import { useFiles } from '../../../../../hooks/useFiles'
import { Asset } from 'react-native-image-picker'
import { StatusBarColor } from '../../../../../components/StatusBarColor'

export const Client: React.FC<AppStackScrenProps<'Client'>> = ({}) => {
  const theme = useTheme()
  const [image, setImage] = useState<Asset[] | undefined>()
  const { signature: photos } = useFiles()
  const [page, setPage] = useState(0)
  const [images, setImages] = useState<any>()
  const [visible, setIsVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const handleViewImagesNavigate = (imageNumber: number) => {
    setPage(imageNumber + 1)
    if (photos) {
      const img = [{ uri: photos[imageNumber].url }]
      setImages(img)
      setIsVisible(true)
    }

    // navigation.navigate('ViewImages', {photos, imageNumber})
  }

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Permissão de Câmera',
        message: 'O App precisa de acesso à câmera.',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      })
    }
  }

  const requestLibraryPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
        {
          title: 'App Permissão para lê mídia do seu celular',
          message: 'O App precisa de acesso à galeria.',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      )
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    requestCameraPermission()
    requestLibraryPermission()
  }, [])

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
      />

      {photos?.length === 0 ? (
        <Box flexBox align="center" justify="center">
          <TextBase fz={20} ta="center">
            Adicione imagens {'\n'} para inspiração do design.
          </TextBase>
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

      <ModalAddImage
        image={image}
        setImage={setImage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <FloatingButton onPress={() => setModalVisible(!modalVisible)}>
        <Icon
          type="Feather"
          name="plus"
          color={theme.colors.background}
          size={32}
        />
      </FloatingButton>
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

const FloatingButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: 16px;
  margin-bottom: 30px;
  height: 60px;
  width: 60px;
  border-radius: 60px;
  background-color: ${p => p.theme.colors.primary};
  elevation: 5;
`
