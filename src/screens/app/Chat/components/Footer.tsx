import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Box } from '../../../../components/Box'
import { Input } from '../../../../components/Input'
import SenderIcon from '../../../../assets/sender.svg'

type IFooterProps = {
  sendMsg: () => void
  message: string
  setMessage: (msg: string) => void
}
export const Footer: React.FC<IFooterProps> = props => {
  const theme = useTheme()
  return (
    <Box
      flexDirection="row"
      align="center"
      mb={16}
      pt={4}
      bgc={theme.colors.background}>
      <InputContainer>
        <Input
          defaultValue={props.message}
          onChangeText={text => props.setMessage(text)}
          placeholder="Digite uma mensagem..."
          style={{
            borderWidth: 0,
            paddingHorizontal: 16,
            flex: 1,
          }}
        />
        <Send onPress={props.sendMsg} activeOpacity={0.7}>
          <SenderIcon />
        </Send>
      </InputContainer>
    </Box>
  )
}

const InputContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  color: ${p => p.theme.colors.mono900};
  background: ${p => p.theme.colors.background300};
  height: 44px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  elevation: 3;
`

const Send = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 59px;
  height: 44px;
  background-color: ${p => p.theme.colors.primary};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`
