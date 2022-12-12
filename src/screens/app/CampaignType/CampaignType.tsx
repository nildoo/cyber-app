import React from 'react'
import { Pressable } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { AppStackScrenProps } from '../../../@types/navigation'
import { Box } from '../../../components/Box'
import { Icon } from '../../../components/Icon'
import { ScrollWrapperView } from '../../../components/ScrollWrapperView'
import { Space } from '../../../components/Space'
import { TextBase } from '../../../components/TextBase'
import { Wrapper } from '../../../components/Wrapper'

export const CampaignType: React.FC<AppStackScrenProps<'CampaignType'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme()
  const socialName = route.params?.socialName

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleChatNavigation = () => {
    navigation.navigate('Chat')
  }

  const handleFilesNavigation = () => {
    navigation.navigate('Files')
  }

  const handleGraphNavigate = (campaignType: string) => {
    navigation.navigate('Report', { socialName, campaignType })
  }

  const card = [
    {
      id: 0,
      title: 'Seguidores',
    },
    {
      id: 1,
      title: 'Curtidas',
    },

    {
      id: 2,
      title: 'Comentários',
    },
    {
      id: 3,
      title: 'Alcance',
      navigate: 'Reach',
    },
  ]

  return (
    <Wrapper
      style={{
        backgroundColor: theme.colors.primary,
      }}>
      <ScrollWrapperView
        style={{
          backgroundColor: theme.colors.background300,
        }}>
        <Box bgc={theme.colors.primary}>
          <Box pd={16}>
            <Box
              flexDirection="row"
              align="center"
              justify="space-between"
              flexBox>
              <Box flexDirection="row" align="center" flexBox>
                <Pressable onPress={handleGoBack}>
                  <Icon
                    color={theme.colors.background}
                    type="AntDesign"
                    name="arrowleft"
                    size={22}
                  />
                </Pressable>
                <Space w={16} />
                <TextBase
                  fz={25}
                  ff={theme.fonts.lato700}
                  color={theme.colors.background}>
                  Campanhas ativas
                </TextBase>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box ph={16} pt={16}>
          {card.map(item => (
            <Pressable
              key={item.id}
              style={{
                elevation: 3,
                backgroundColor: theme.colors.background,
                borderRadius: 10,
                marginBottom: 16,
              }}>
              <Box h="100px" pd={16}>
                <Box flexDirection="row" justify="space-between" flexBox>
                  <TextBase fz={20} ff={theme.fonts.lato700}>
                    {item.title}
                  </TextBase>
                  <Pressable onPress={handleChatNavigation}>
                    <Icon
                      color={theme.colors.primary}
                      type="Ionicons"
                      name="chatbubble-ellipses"
                      size={24}
                    />
                  </Pressable>
                </Box>
                <Box flexDirection="row">
                  <ReportAndFiles
                    onPress={() => handleGraphNavigate(item.title)}
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.primary,
                      backgroundColor: theme.colors.primary,
                    }}>
                    <TextBase
                      fz={16}
                      ff={theme.fonts.lato700}
                      color={theme.colors.background}>
                      Relatório
                    </TextBase>
                  </ReportAndFiles>
                  <Space w={16} />
                  <ReportAndFiles
                    onPress={handleFilesNavigation}
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}>
                    <TextBase
                      fz={16}
                      ff={theme.fonts.lato700}
                      color={theme.colors.primary}>
                      Arquivos
                    </TextBase>
                  </ReportAndFiles>
                </Box>
              </Box>
            </Pressable>
          ))}
        </Box>
      </ScrollWrapperView>
    </Wrapper>
  )
}

const ReportAndFiles = styled(Pressable)`
  padding-horizontal: 16px;
  padding-vertical: 5px;
  border-radius: 5px;
`
