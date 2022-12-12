import React, { useEffect, useState } from 'react'
import { TextBase } from '../../../components/TextBase'
import { Wrapper } from '../../../components/Wrapper'
import { AppStackScrenProps } from '../../../@types/navigation'
import styled, { useTheme } from 'styled-components/native'
import { Box } from '../../../components/Box'
import { Platform, Pressable, StatusBar } from 'react-native'
import { Icon } from '../../../components/Icon'
import { Space } from '../../../components/Space'
import { StatusBarColor } from '../../../components/StatusBarColor'
import VideoPlayer from 'react-native-media-console'
import Orientation, {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker'

export const ViewVideos: React.FC<AppStackScrenProps<'ViewVideos'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme()
  const [orientationType, setOrientationType] = useState('PORTRAIT')
  const [fullScreen, setFullScreen] = useState(true)
  const imageNumber = route.params?.imageNumber as number
  const videos = route.params.videos

  const handleGoBack = () => {
    navigation.goBack()
  }

  const toggleOrientation = (e: string) => {
    setFullScreen(!fullScreen)
    setOrientationType(e.split('-')[0])
  }

  const handleChatNavigate = (
    image: string,
    status: 'Aprovado' | 'Feedback',
  ) => {
    navigation.navigate('Chat', { image, status })
  }

  useEffect(() => {
    if (orientationType === LANDSCAPE) {
      StatusBar.setHidden(true, 'none')
      Orientation.lockToLandscape()
    }
    if (orientationType === PORTRAIT) {
      StatusBar.setHidden(false, 'slide')
      Orientation.lockToPortrait()
    }
  }, [orientationType])

  return (
    <Wrapper style={{ backgroundColor: theme.colors.mono900 }}>
      <OrientationLocker
        orientation={PORTRAIT}
        onDeviceChange={e => toggleOrientation(e)}
      />
      {orientationType === PORTRAIT && (
        <StatusBarColor
          backgroundColor={theme.colors.mono900}
          barStyle="light-content"
        />
      )}

      {orientationType === PORTRAIT && (
        <Box
          flexDirection="row"
          align="center"
          pd={16}
          bgc={theme.colors.mono900}
          mt={Platform.OS === 'ios' ? 40 : 20}>
          <Pressable onPress={handleGoBack}>
            <Icon
              color={theme.colors.background}
              type="AntDesign"
              name="arrowleft"
              size={22}
            />
          </Pressable>
          <Space w={16} />
          <TextBase color={theme.colors.background}>
            Video top {imageNumber + 1}
          </TextBase>
        </Box>
      )}

      <Box flexBox bgc={theme.colors.mono900} align="center" justify="center">
        <Box flexBox>
          <VideoPlayer
            onExitFullscreen={() => toggleOrientation('PORTRAIT')}
            onEnterFullscreen={() => toggleOrientation('LANDSCAPE')}
            onBack={handleGoBack}
            toggleResizeModeOnFullscreen
            fullscreen={Platform.OS === 'ios' ? false : fullScreen}
            showTimeRemaining={false}
            seekColor={theme.colors.primary}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            source={{ uri: `${videos?.url}` }}
          />
        </Box>
      </Box>
      {orientationType === PORTRAIT && (
        <>
          <Space h={16} />
          {!videos?.approved && (
            <Box ph={16} flexDirection="row" justify="space-between" mb={60}>
              <ApproveAndFeedback
                onPress={() =>
                  handleChatNavigate(`${videos?.thumb}`, 'Aprovado')
                }
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
                onPress={() =>
                  handleChatNavigate(`${videos?.thumb}`, 'Feedback')
                }
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.background,
                }}>
                <TextBase ff={theme.fonts.lato700} color={theme.colors.primary}>
                  Dar feedback
                </TextBase>
              </ApproveAndFeedback>
            </Box>
          )}
        </>
      )}
    </Wrapper>
  )
}

const ApproveAndFeedback = styled(Pressable)`
  padding-horizontal: 16px;
  padding-vertical: 5px;
  border-radius: 5px;
`
