import { AppStackParamList } from './../../../@types/navigation'
import { Campaigns } from '../../../screens/app/Campaigns'
import { Calendar } from '../../../screens/app/Calendar'
import { ScreenComponentType } from '../../../@types/screen'
import { About } from '../../../screens/app/About'
import { Files } from '../../../screens/app/Files'
import { Chat } from '../../../screens/app/Chat'
import { ViewVideos } from '../../../screens/app/ViewVideos'
import { Notifications } from '../../../screens/app/Notifications'
import { Support } from '../../../screens/app/Support'
import { Report } from '../../../screens/app/Report'
import { CampaignType } from '../../../screens/app/CampaignType/CampaignType'
import { Videos } from '../../../screens/app/Files/screens/Videos'
import { Images } from '../../../screens/app/Files/screens/Images'
import { DailyReports } from '../../../screens/app/DailyReports'
import { Client } from '../../../screens/app/Files/screens/Client'

export type AppStackList = {
  id: number
  name: string
  component:
    | ScreenComponentType<AppStackParamList, 'Campaigns'>
    | ScreenComponentType<AppStackParamList, 'Calendar'>
    | ScreenComponentType<AppStackParamList, 'About'>
    | ScreenComponentType<AppStackParamList, 'Files'>
    | ScreenComponentType<AppStackParamList, 'Chat'>
    | ScreenComponentType<AppStackParamList, 'Images'>
    | ScreenComponentType<AppStackParamList, 'ViewVideos'>
    | ScreenComponentType<AppStackParamList, 'Notifications'>
    | ScreenComponentType<AppStackParamList, 'Support'>
    | ScreenComponentType<AppStackParamList, 'Report'>
    | ScreenComponentType<AppStackParamList, 'Videos'>
    | ScreenComponentType<AppStackParamList, 'DailyReports'>
    | ScreenComponentType<AppStackParamList, 'Client'>
}
const AppListScreen = {
  Campaigns,
  Calendar,
  About,
  Files,
  Chat,
  Videos,
  ViewVideos,
  Notifications,
  Support,
  Report,
  Images,
  CampaignType,
  DailyReports,
  Client,
}

export const APP_STACK: AppStackList[] = Object.keys(AppListScreen).map(
  (i, index) => ({
    id: index,
    name: i,
    component: AppListScreen[i as keyof AppStackParamList],
  }),
)
