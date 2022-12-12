import React from 'react'
import { Pressable } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Box } from '../../../../components/Box'
import { Space } from '../../../../components/Space'
import { TextBase } from '../../../../components/TextBase'
import { Icon } from '../../../../components/Icon'
import { IChatConsultant } from '../../../../context/setChatPerson'

type IHeaderProps = {
  goBack: () => void
  handleAllImagesApprovedNavige: () => void
  consultant: IChatConsultant
}
export const Header: React.FC<IHeaderProps> = props => {
  const theme = useTheme()
  return (
    <Box>
      <Box bgc={theme.colors.background} ph={16}>
        <Box flexDirection="row" align="center" pv={16}>
          <Pressable onPress={props.goBack}>
            <Icon
              color={theme.colors.mono900}
              type="AntDesign"
              name="arrowleft"
              size={20}
            />
          </Pressable>
          <Space w={16} />
          <TextBase
            fz={20}
            ff={theme.fonts.lato700}
            color={theme.colors.mono900}>
            {props?.consultant?.name}
          </TextBase>
        </Box>
      </Box>
    </Box>
  )
}
