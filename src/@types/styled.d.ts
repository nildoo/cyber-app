import 'styled-components'
import {theme} from '../theme/default'

export type Theme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
