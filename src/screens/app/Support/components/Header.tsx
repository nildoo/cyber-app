import React from 'react'
import { Pressable } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Box } from '../../../../components/Box'
import { Space } from '../../../../components/Space'
import { TextBase } from '../../../../components/TextBase'
import { Icon } from '../../../../components/Icon'
import LogoIcon from '../../../../assets/logo-light.svg'
import { StatusBarColor } from '../../../../components/StatusBarColor'
type IHeaderProps = {
  goBack: () => void
  handleAllImagesApprovedNavige: () => void
}
export const Header: React.FC<IHeaderProps> = props => {
  const theme = useTheme()
  return (
    <Box>
      <StatusBarColor
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Box bgc={theme.colors.primary} ph={16}>
        <Box flexDirection="row" align="center" pv={16} justify="space-between">
          <Box flexDirection="row" align="center" flexBox>
            <Box flexBox flexDirection="row" align="center">
              <Pressable onPress={props.goBack}>
                <Icon
                  color={theme.colors.background}
                  type="AntDesign"
                  name="arrowleft"
                  size={22}
                />
              </Pressable>
              <Space w={16} />
              <Box flexBox>
                <TextBase
                  numberOfLines={1}
                  fz={20}
                  ff={theme.fonts.lato700}
                  color={theme.colors.background}>
                  Suporte
                </TextBase>
              </Box>
              <Box flexBox flexDirection="row">
                <Space w={16} />
                <LogoIcon height={20} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
