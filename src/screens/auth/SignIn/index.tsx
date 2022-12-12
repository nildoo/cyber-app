import React, { useState } from 'react'
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  ToastAndroid,
} from 'react-native'
import { RootStackScreenProps } from '../../../@types/navigation'
import { TextBase } from '../../../components/TextBase'
import { Wrapper } from '../../../components/Wrapper'
import Logo from '../../../assets/logo.svg'
import { Box } from '../../../components/Box'
import { Input } from '../../../components/Input'
import { InputPassword } from '../../../components/InputPass'
import { Space } from '../../../components/Space'
import { Button } from '../../../components/Button'
import { useTheme } from 'styled-components/native'
import { Loading } from '../../../components/app/Loading'
import { useAuth } from '../../../hooks/useAuth'
import { StatusBarColor } from '../../../components/StatusBarColor'
import { useClientLoginMutation } from '../../../generated/graphql'

const { height } = Dimensions.get('window')

export const SignIn: React.FC<RootStackScreenProps<'SignIn'>> = () => {
  const [enable, setEnable] = useState(false)
  const { handleSetToken } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [sigin, { error, loading }] = useClientLoginMutation()
  const theme = useTheme()

  const login = async () => {
    if (email === '' || password === '') {
      return Platform.OS === 'android'
        ? ToastAndroid.show('Preencha todos os campos.', ToastAndroid.SHORT)
        : Alert.alert('Preencha todos os campos.')
    }

    if (password.length < 6) {
      return Platform.OS === 'android'
        ? ToastAndroid.show(
            'A senha deve conter no mínimo 6 caracteres.',
            ToastAndroid.SHORT,
          )
        : Alert.alert('A senha deve conter no mínimo 6 caracteres.')
    }

    try {
      const { data } = await sigin({
        variables: {
          input: {
            email,
            password,
          },
        },
      })

      const token = data?.clientLogin.token as string
      handleSetToken(token)
    } catch (e: any) {
      console.log(error)
      return Platform.OS === 'android'
        ? ToastAndroid.show('Email ou senha inválido.', ToastAndroid.SHORT)
        : Alert.alert('Email ou senha inválido.')
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <StatusBarColor
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />
      <ScrollView>
        <Space h={height / 4} />
        <Box align="center" pb={24}>
          <Logo width={230} height={85} />
        </Box>
        <Space h={48} />
        <Box ph={16}>
          <Input placeholder="Email" onChangeText={setEmail} />
          <Space h={16} />
          <InputPassword
            onChangeText={setPassword}
            enable={enable}
            setEnable={setEnable}
            placeholder="Senha"
          />
        </Box>
        <Space h={24} />
        <Box ph={16} flexDirection="row" align="center" justify="space-between">
          <Button w="50%" onPress={login}>
            <TextBase color={theme.colors.textSecondary}>Acessar</TextBase>
          </Button>
          <TextBase>Esqueceu a senha?</TextBase>
        </Box>
        <Space h={50} />
        <TextBase ta="center">Politica de privacidade</TextBase>
        <Space h={24} />
      </ScrollView>
    </Wrapper>
  )
}
