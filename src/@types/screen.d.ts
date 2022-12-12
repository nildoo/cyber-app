import {ParamListBase} from '@react-navigation/native'

declare type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>
      navigation: any
    }>
  | React.ComponentType<{}>
