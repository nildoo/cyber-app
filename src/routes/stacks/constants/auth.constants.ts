import { RootStackParamList } from './../../../@types/navigation'
import { ScreenComponentType } from '../../../@types/screen'

import { SignIn } from './../../../screens/auth/SignIn'

export type AuthStackList = {
  id: number
  name: string
  component: ScreenComponentType<RootStackParamList, 'SignIn'>
}
const AuthListScreen = { SignIn }

export const AUTH_STACK: AuthStackList[] = Object.keys(AuthListScreen).map(
  (i, index) => {
    return {
      id: index,
      name: i,
      component: AuthListScreen[i as keyof RootStackParamList],
    }
  },
)
