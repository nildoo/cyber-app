import React from 'react'
import { Pressable, View } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Box } from '../Box'
// import { Button } from '../Button'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { TextBase } from '../TextBase'

type Props = {
  handleCalendarNavigate: () => void
  title: string
}

export const CardCampanings: React.FC<Props> = props => {
  const theme = useTheme()
  return (
    <Pressable onPress={props.handleCalendarNavigate}>
      <Container
        {...props}
        style={{
          elevation: 3,
        }}>
        <Box pd={4} bgc={theme.colors.primary} br={4} w="45px" align="center">
          <Icon
            type="Ionicons"
            name="md-megaphone-sharp"
            size={32}
            color={theme.colors.textSecondary}
          />
        </Box>
        <Space w={12} />
        <TextBase flex fz={18} numberOfLines={2} ff={theme.fonts.lato700}>
          {props.title}
        </TextBase>
        {/* <Button w="30%" h="40px" br={8}>
          <TextBase color={theme.colors.textSecondary}>Entrar</TextBase>
        </Button> */}
      </Container>
    </Pressable>
  )
}

const Container = styled(View)<Props>`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`
