import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Files } from '../context/setFiles'
import { ClientMeQuery } from '../generated/graphql'

type IViewVideos = {
  videos: Files | undefined
  imageNumber: number
}

type IReport = {
  getCampaingByIdId: string
}

type ICampaignType = {
  getCampaingByIdId: string
}

type IChatType = {
  image: string
  status: string
}

type IDailyReportsType = {
  client: ClientMeQuery | undefined
}

type ISuportChat = {
  client: ClientMeQuery | undefined
}

type ICalendar = {
  getCampaingByIdId: string
}

type IFiles = {
  data: string
}

export type RootStackParamList = {
  SignIn: undefined
}

export type AppStackParamList = {
  Campaigns: undefined
  Calendar: ICalendar | undefined
  About: undefined
  Files: IFiles | undefined
  Chat: IChatType | undefined
  Images: undefined
  Videos: undefined
  Notifications: undefined
  Support: ISuportChat | undefined
  Report: IReport | undefined
  ViewVideos: IViewVideos
  CampaignType: IReport | undefined
  Client: undefined
  DailyReports: IDailyReportsType
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type AppStackScrenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
