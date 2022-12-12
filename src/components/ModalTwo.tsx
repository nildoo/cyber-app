import React from 'react'
import { Box } from './Box'
import { TextBase } from './TextBase'
import Modal from 'react-native-modal'
import styled, { useTheme } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { StatusBarColor } from './StatusBarColor'

type IModalProps = {
  close: () => void
  color: string
  title?: string
  text: string
  optionOne: string
  optionTwo: string
  visible: boolean
  onYes: () => void
  onNo: () => void
}

export const ModalTwo: React.FC<IModalProps> = props => {
  const theme = useTheme()
  return (
    <Modal
      isVisible={props.visible}
      backdropOpacity={0.5}
      onBackdropPress={props.close}>
      <StatusBarColor backgroundColor={props.color} barStyle="dark-content" />
      <Box
        align="center"
        justify="center"
        bgc={theme.colors.background}
        br={10}
        ovf={true}
        style={{ elevation: 10 }}>
        <Box
          pd={16}
          align="center"
          justify="center"
          style={{ maxHeight: 300, minHeight: 90 }}>
          <TextBase ta="center" ff={theme.fonts.lato400} fz={18}>
            {props.text}
          </TextBase>
        </Box>
        <Box flexDirection="row">
          <Button onPress={props.onNo} activeOpacity={0.9} color={props.color}>
            <TextBase
              ta="center"
              ff={theme.fonts.lato700}
              fz={18}
              color={theme.colors.background}>
              {props.optionOne}
            </TextBase>
          </Button>
          <Button activeOpacity={0.9} onPress={props.onYes} color={props.color}>
            <TextBase
              ta="center"
              ff={theme.fonts.lato700}
              fz={18}
              color={theme.colors.background}>
              {props.optionTwo}
            </TextBase>
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const Button = styled(TouchableOpacity)<any>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${p => p.color};
`
