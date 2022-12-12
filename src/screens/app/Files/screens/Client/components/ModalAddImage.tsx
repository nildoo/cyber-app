import React, { useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Box } from '../../../../../../components/Box'
import { ModalTwo } from '../../../../../../components/ModalTwo'
import { TextBase } from '../../../../../../components/TextBase'
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { StatusBarColor } from '../../../../../../components/StatusBarColor'
import { Icon } from '../../../../../../components/Icon'
import { Space } from '../../../../../../components/Space'
import {
  ImageUploadProps,
  upload,
} from '../../../../../../components/app/upload'
import {
  GetCampaingByClientDocument,
  useAddFilesToCampaingMutation,
} from '../../../../../../generated/graphql'
import { useFiles } from '../../../../../../hooks/useFiles'

type IPhotosProps = {
  modalVisible: boolean
  setModalVisible: (data: boolean) => void
  image: Asset[] | undefined
  setImage: (data: Asset[] | undefined) => void
}
export const ModalAddImage: React.FC<IPhotosProps> = props => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const { campingId, setSignature } = useFiles()
  const [openModal, setOpenModal] = useState(false)
  const [uploadImages, setUploadImages] = useState<ImageUploadProps>(
    {} as ImageUploadProps,
  )

  const [addFiles, { error: errorCam }] = useAddFilesToCampaingMutation()

  const openCamera = async () => {
    const response = await launchCamera({
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    })

    if (response?.assets) {
      props.setImage([response.assets[0]])
      setUploadImages({
        name: `${response.assets[0].fileName}`,
        type: `${response.assets[0].type}`,
        uri: `${response.assets[0].uri}`,
      })
      setOpenModal(false)
    }
  }

  const openLibrary = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
      selectionLimit: 1,
    })
    if (response?.assets) {
      props.setImage([response.assets[0]])
      setUploadImages({
        name: `${response.assets[0].fileName}`,
        type: `${response.assets[0].type}`,
        uri: `${response.assets[0].uri}`,
      })
      setOpenModal(false)
    }
  }

  const addImage = async () => {
    try {
      if (props.image) {
        const size = props.image[0].fileSize as number
        const title = props.image[0].fileName as string
        setLoading(true)
        const result = await upload({ uploadImages })

        const { data } = await addFiles({
          variables: {
            input: {
              id: campingId,
              size,
              thumb: result.uri,
              title,
              type: 'client',
              url: result.uri,
              approved: false,
              folder: result.folder,
              firebasePath: result.filename,
            },
          },
          refetchQueries: [{ query: GetCampaingByClientDocument }],
        })

        const state: any = data?.addFilesToCampaing.files.signature
        if (state) {
          setSignature(state)
          closeModal()
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(errorCam)
      setLoading(false)
    }
  }

  const closeModal = () => {
    props.setImage(undefined)
    setUploadImages({} as ImageUploadProps)
    props.setModalVisible(false)
  }

  const removeImage = () => {
    props.setImage(undefined)
    setUploadImages({} as ImageUploadProps)
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={closeModal}>
      <StatusBarColor
        backgroundColor={theme.colors.primary}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />

      <Box flexBox pd={16} bgc={theme.colors.background300}>
        {Platform.OS === 'ios' && <Space h={60} />}

        <ModalTwo
          visible={openModal}
          onNo={openCamera}
          onYes={openLibrary}
          optionOne="Câmera"
          optionTwo="Galeria"
          text="O que você deseja abrir?"
          color={theme.colors.primary}
          close={() => setOpenModal(!openModal)}
        />
        <Box flexDirection="row" align="center">
          <Pressable onPress={() => props.setModalVisible(!props.modalVisible)}>
            <Icon
              color={theme.colors.mono900}
              type="AntDesign"
              name="arrowleft"
              size={22}
            />
          </Pressable>
          <Space w={16} />
          <TextBase ff={theme.fonts.lato700} fz={20}>
            Adicione uma imagem
          </TextBase>
        </Box>
        <Space h={16} />
        <Box align="center" justify="center" flexBox>
          {loading && (
            <>
              <ActivityIndicator
                size={Platform.OS === 'ios' ? 70 : 20}
                color={theme.colors.primary}
              />
              {Platform.OS === 'android' && <Space h={16} />}
              <TextBase>Fazendo upload da imagem...</TextBase>
              {Platform.OS === 'ios' && <Space h={16} />}
            </>
          )}
          {Platform.OS === 'android' && <Space h={16} />}
          {props.image ? (
            <Box>
              <Box
                ovf
                bgc={theme.colors.background}
                align="center"
                justify="center"
                style={{
                  borderRadius: 10,
                  height: Dimensions.get('window').height / 2,
                }}>
                <Images
                  source={{
                    uri: props.image[0].uri,
                  }}
                />
              </Box>
              <Space h={20} />
              <Box
                flexDirection="row"
                align="center"
                justify="space-between"
                ph={16}>
                <RemoveButton onPress={() => (loading ? {} : removeImage())}>
                  <TextBase
                    ta="center"
                    ff={theme.fonts.lato700}
                    fz={16}
                    color={theme.colors.background}>
                    Remover
                  </TextBase>
                </RemoveButton>
                <AddButton onPress={() => (loading ? {} : addImage())}>
                  <TextBase
                    ta="center"
                    ff={theme.fonts.lato700}
                    fz={16}
                    color={theme.colors.background}>
                    Adicionar
                  </TextBase>
                </AddButton>
              </Box>
            </Box>
          ) : (
            <Pressable
              onPress={() => setOpenModal(true)}
              style={{
                width: '100%',
              }}>
              <Box
                style={{
                  elevation: 5,
                  height: Dimensions.get('window').height / 3,
                }}
                br={10}
                bgc={theme.colors.background}
                align="center"
                justify="center">
                <Icon
                  type="Entypo"
                  name="images"
                  color={theme.colors.primary}
                  size={60}
                />
                <Space h={16} />
                <TextBase ta="center">
                  Clique para escolher uma imagem.
                </TextBase>
              </Box>
            </Pressable>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

const Images = styled(ImageBackground)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const RemoveButton = styled(TouchableOpacity)`
  background-color: ${p => p.theme.colors.danger};
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 10px;
`

const AddButton = styled(TouchableOpacity)`
  background-color: ${p => p.theme.colors.primary};
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 10px;
`
