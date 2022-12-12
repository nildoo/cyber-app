import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type AdResults = {
  __typename?: 'AdResults'
  _id?: Maybe<Scalars['String']>
  amountSpent: Scalars['Float']
  costPerResults: Array<Result>
  reach: Scalars['Int']
  results: Array<Result>
}

export type AddAdminInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  role: Scalars['String']
}

export type AddCampaingInput = {
  client: Scalars['String']
  consultant: Scalars['String']
  endDate: Scalars['DateTime']
  socialMediaNames: Array<Scalars['String']>
  startDate: Scalars['DateTime']
  title: Scalars['String']
  type: Scalars['String']
}

export type AddClientInput = {
  address: AddressInput
  cnpj: Scalars['String']
  consultant: Scalars['String']
  contractType: ContractTypeInput
  email: Scalars['String']
  name: Scalars['String']
  othersContracts: ContractsInput
  password: Scalars['String']
  phone: Scalars['String']
  whatsapp: Scalars['String']
}

export type AddConsultantInput = {
  email: Scalars['String']
  name: Scalars['String']
  office: Scalars['String']
  password: Scalars['String']
  role: Scalars['String']
}

export type AddFileCampaingInput = {
  approved?: InputMaybe<Scalars['Boolean']>
  firebasePath: Scalars['String']
  folder: Scalars['String']
  id: Scalars['String']
  size: Scalars['Float']
  thumb: Scalars['String']
  title: Scalars['String']
  type: Scalars['String']
  url: Scalars['String']
}

export type AddLinkInput = {
  id: Scalars['String']
  link: Scalars['String']
  title: Scalars['String']
}

export type AddMeetInput = {
  campaingId: Scalars['String']
  date: Scalars['DateTime']
  title: Scalars['String']
}

export type AddNotificationInput = {
  client: Scalars['String']
  message: Scalars['String']
  title: Scalars['String']
}

export type AddResultsCampaingInput = {
  amountSpent: Scalars['Float']
  campaingId: Scalars['String']
  costPerResults: Array<ResultInput>
  network: Scalars['String']
  reach: Scalars['Int']
  results: Array<ResultInput>
}

export type AddressInput = {
  city: Scalars['String']
  complement?: InputMaybe<Scalars['String']>
  neighborhood: Scalars['String']
  number?: InputMaybe<Scalars['String']>
  state: Scalars['String']
  street: Scalars['String']
  zipcode: Scalars['String']
}

export type Admin = {
  __typename?: 'Admin'
  _id?: Maybe<Scalars['String']>
  email: Scalars['String']
  name: Scalars['String']
  office: Scalars['String']
  role: Scalars['String']
}

export type ApproveFileInput = {
  approved: Scalars['Boolean']
  id_campaing: Scalars['String']
  id_file: Scalars['String']
  typeFile: Scalars['String']
}

export type Campaing = {
  __typename?: 'Campaing'
  _id?: Maybe<Scalars['String']>
  client: Client
  consultant: Consultant
  endDate: Scalars['DateTime']
  files: Files
  links: Array<Link>
  meet?: Maybe<Meet>
  socialMediasResults: Array<SocialMedia>
  startDate: Scalars['DateTime']
  status: Scalars['String']
  title: Scalars['String']
  type: Scalars['String']
}

export type Client = {
  __typename?: 'Client'
  _id?: Maybe<Scalars['String']>
  address: ClientAddress
  cnpj: Scalars['String']
  consultant: Consultant
  contractType: ContractType
  email: Scalars['String']
  name: Scalars['String']
  networks: Array<Network>
  notificationId: Scalars['String']
  othersContracts: ExtraContracts
  phone: Scalars['String']
  whatsapp: Scalars['String']
}

export type ClientAddress = {
  __typename?: 'ClientAddress'
  _id?: Maybe<Scalars['String']>
  city: Scalars['String']
  complement?: Maybe<Scalars['String']>
  neighborhood: Scalars['String']
  number?: Maybe<Scalars['String']>
  state: Scalars['String']
  street: Scalars['String']
  zipcode: Scalars['String']
}

export type ClientToken = {
  __typename?: 'ClientToken'
  token: Scalars['String']
}

export type Consultant = {
  __typename?: 'Consultant'
  _id?: Maybe<Scalars['String']>
  email: Scalars['String']
  name: Scalars['String']
  office: Scalars['String']
  role: Scalars['String']
}

export type ContractType = {
  __typename?: 'ContractType'
  title: Scalars['String']
  type: Scalars['String']
}

export type ContractTypeInput = {
  title: Scalars['String']
  type: Scalars['String']
}

export type ContractsInput = {
  extra_art?: InputMaybe<Scalars['Boolean']>
  extra_network?: InputMaybe<Scalars['Boolean']>
  landing_page?: InputMaybe<Scalars['Boolean']>
  site_development?: InputMaybe<Scalars['Boolean']>
  site_maintenance?: InputMaybe<Scalars['Boolean']>
}

export type ExtraContracts = {
  __typename?: 'ExtraContracts'
  _id?: Maybe<Scalars['String']>
  extra_art?: Maybe<Scalars['Boolean']>
  extra_network?: Maybe<Scalars['Boolean']>
  landing_page?: Maybe<Scalars['Boolean']>
  site_development?: Maybe<Scalars['Boolean']>
  site_maintenance?: Maybe<Scalars['Boolean']>
}

export type File = {
  __typename?: 'File'
  _id?: Maybe<Scalars['String']>
  approved: Scalars['Boolean']
  firebasePath: Scalars['String']
  folder: Scalars['String']
  size: Scalars['Float']
  thumb: Scalars['String']
  title: Scalars['String']
  type: Scalars['String']
  url: Scalars['String']
}

export type Files = {
  __typename?: 'Files'
  _id?: Maybe<Scalars['String']>
  images: Array<File>
  signature: Array<File>
  videos: Array<File>
}

export type History = {
  __typename?: 'History'
  networkType: Scalars['String']
  week: Array<Scalars['Float']>
  year: Array<Scalars['Float']>
}

export type HistoryInput = {
  date?: InputMaybe<Scalars['DateTime']>
  id: Scalars['String']
  name: Scalars['String']
}

export type Insight = {
  __typename?: 'Insight'
  date?: Maybe<Scalars['DateTime']>
  quantity: Scalars['Int']
}

export type Insights = {
  __typename?: 'Insights'
  _id?: Maybe<Scalars['String']>
  comments: Scalars['Int']
  commentsHistory: Array<Insight>
  followers: Scalars['Int']
  followersHistory: Array<Insight>
  likes: Scalars['Int']
  likesHistory: Array<Insight>
  posts: Scalars['Int']
  postsHistory: Array<Insight>
  profileViews: Scalars['Int']
  profileViewsHistory: Array<Insight>
  reached: Scalars['Int']
  reachedHistory: Array<Insight>
}

export type Link = {
  __typename?: 'Link'
  _id?: Maybe<Scalars['String']>
  link: Scalars['String']
  title: Scalars['String']
}

export type Meet = {
  __typename?: 'Meet'
  date: Scalars['DateTime']
  hour: Scalars['DateTime']
  title: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addAdmin: Admin
  addCampaing: Campaing
  addClient: Client
  addConsultant: Consultant
  addFilesToCampaing: Campaing
  addLink?: Maybe<Campaing>
  addMeet?: Maybe<Campaing>
  addNetwork?: Maybe<Client>
  addNotificationIdClient?: Maybe<Client>
  addResultsCampaing: Scalars['Boolean']
  approveFile: Scalars['Boolean']
  clientLogin: ClientToken
  removeFileFromCampaing: Scalars['Boolean']
  removeLink: Scalars['Boolean']
  sendNotificationToClient: Scalars['Boolean']
  signIn: TokenDash
  udpateNetwork?: Maybe<Client>
  udpatePassword?: Maybe<Consultant>
  updateClient?: Maybe<Client>
}

export type MutationAddAdminArgs = {
  input: AddAdminInput
}

export type MutationAddCampaingArgs = {
  input: AddCampaingInput
}

export type MutationAddClientArgs = {
  input: AddClientInput
}

export type MutationAddConsultantArgs = {
  input: AddConsultantInput
}

export type MutationAddFilesToCampaingArgs = {
  input: AddFileCampaingInput
}

export type MutationAddLinkArgs = {
  input: AddLinkInput
}

export type MutationAddMeetArgs = {
  input: AddMeetInput
}

export type MutationAddNetworkArgs = {
  input: NetworkInput
}

export type MutationAddNotificationIdClientArgs = {
  input: SetNotificationIdInput
}

export type MutationAddResultsCampaingArgs = {
  input: AddResultsCampaingInput
}

export type MutationApproveFileArgs = {
  input: ApproveFileInput
}

export type MutationClientLoginArgs = {
  input: SignInServiceClientInput
}

export type MutationRemoveFileFromCampaingArgs = {
  input: RemoveImageCampaingInput
}

export type MutationRemoveLinkArgs = {
  input: RemoveLinkInput
}

export type MutationSendNotificationToClientArgs = {
  input: AddNotificationInput
}

export type MutationSignInArgs = {
  input: SignInInputMain
}

export type MutationUdpateNetworkArgs = {
  input: NetworkInput
}

export type MutationUdpatePasswordArgs = {
  input: UpdatePasswordInput
}

export type MutationUpdateClientArgs = {
  input: UpdateClientInput
}

export type Network = {
  __typename?: 'Network'
  _id?: Maybe<Scalars['String']>
  insights: Insights
  lastUpdate: Scalars['DateTime']
  name: Scalars['String']
}

export type NetworkInput = {
  comments: Scalars['Int']
  followers: Scalars['Int']
  id: Scalars['String']
  likes: Scalars['Int']
  name: Scalars['String']
  posts: Scalars['Int']
  profileViews: Scalars['Int']
  reached: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  adminMe?: Maybe<Admin>
  client?: Maybe<Client>
  clientByName: Array<Client>
  clientMe?: Maybe<Client>
  clients: Array<Client>
  consultant?: Maybe<Consultant>
  consultantMe?: Maybe<Consultant>
  consultants: Array<Consultant>
  dataHistories: Array<History>
  getAllCampaings: Array<Campaing>
  getCampaingByClient: Array<Campaing>
  getCampaingById: Campaing
  getMe?: Maybe<UserInContext>
  totalCampaings: Scalars['Int']
  totalClients: Scalars['Int']
}

export type QueryClientArgs = {
  id: Scalars['String']
}

export type QueryClientByNameArgs = {
  name: Scalars['String']
}

export type QueryConsultantArgs = {
  id: Scalars['String']
}

export type QueryDataHistoriesArgs = {
  input: HistoryInput
}

export type QueryGetCampaingByClientArgs = {
  client: Scalars['String']
}

export type QueryGetCampaingByIdArgs = {
  id: Scalars['String']
}

export type RemoveImageCampaingInput = {
  campaingId: Scalars['String']
  fileId: Scalars['String']
  folder: Scalars['String']
}

export type RemoveLinkInput = {
  campaingId: Scalars['String']
  linkId: Scalars['String']
}

export type Result = {
  __typename?: 'Result'
  _id?: Maybe<Scalars['String']>
  title: Scalars['String']
  value: Scalars['Int']
}

export type ResultInput = {
  title: Scalars['String']
  value: Scalars['Int']
}

export type SetNotificationIdInput = {
  client_id: Scalars['String']
  notificationId: Scalars['String']
}

export type SignInInputMain = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignInServiceClientInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SocialMedia = {
  __typename?: 'SocialMedia'
  _id?: Maybe<Scalars['String']>
  adResults?: Maybe<AdResults>
  name: Scalars['String']
}

export type TokenDash = {
  __typename?: 'TokenDash'
  role: Scalars['String']
  token: Scalars['String']
}

export type UpdateClientInput = {
  address: AddressInput
  cnpj: Scalars['String']
  contractType: ContractTypeInput
  id: Scalars['String']
  name: Scalars['String']
  othersContracts: ContractsInput
  phone: Scalars['String']
  whatsapp: Scalars['String']
}

export type UpdatePasswordInput = {
  consultantId: Scalars['String']
  password: Scalars['String']
}

export type UserInContext = {
  __typename?: 'UserInContext'
  email: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
  office: Scalars['String']
  role: Scalars['String']
}

export type ClientLoginMutationVariables = Exact<{
  input: SignInServiceClientInput
}>

export type ClientLoginMutation = {
  __typename?: 'Mutation'
  clientLogin: { __typename?: 'ClientToken'; token: string }
}

export type ClientMeQueryVariables = Exact<{ [key: string]: never }>

export type ClientMeQuery = {
  __typename?: 'Query'
  clientMe?: {
    __typename?: 'Client'
    _id?: string | null
    cnpj: string
    whatsapp: string
    email: string
    name: string
    contractType: { __typename?: 'ContractType'; title: string; type: string }
    othersContracts: {
      __typename?: 'ExtraContracts'
      extra_art?: boolean | null
      extra_network?: boolean | null
      landing_page?: boolean | null
      site_development?: boolean | null
      site_maintenance?: boolean | null
    }
    networks: Array<{
      __typename?: 'Network'
      name: string
      lastUpdate: any
      insights: {
        __typename?: 'Insights'
        comments: number
        followers: number
        likes: number
        reached: number
        posts: number
        profileViews: number
        commentsHistory: Array<{
          __typename?: 'Insight'
          date?: any | null
          quantity: number
        }>
        followersHistory: Array<{
          __typename?: 'Insight'
          date?: any | null
          quantity: number
        }>
        likesHistory: Array<{
          __typename?: 'Insight'
          date?: any | null
          quantity: number
        }>
        reachedHistory: Array<{
          __typename?: 'Insight'
          date?: any | null
          quantity: number
        }>
        postsHistory: Array<{
          __typename?: 'Insight'
          date?: any | null
          quantity: number
        }>
        profileViewsHistory: Array<{
          __typename?: 'Insight'
          date?: any | null
          quantity: number
        }>
      }
    }>
  } | null
}

export type DataHistoriesQueryVariables = Exact<{
  input: HistoryInput
}>

export type DataHistoriesQuery = {
  __typename?: 'Query'
  dataHistories: Array<{
    __typename?: 'History'
    networkType: string
    week: Array<number>
    year: Array<number>
  }>
}

export type GetAllCampaingsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllCampaingsQuery = {
  __typename?: 'Query'
  getAllCampaings: Array<{
    __typename?: 'Campaing'
    _id?: string | null
    title: string
    type: string
    status: string
    startDate: any
    endDate: any
    client: { __typename?: 'Client'; name: string }
    socialMediasResults: Array<{ __typename?: 'SocialMedia'; name: string }>
  }>
}

export type GetCampaingByClientQueryVariables = Exact<{
  client: Scalars['String']
}>

export type GetCampaingByClientQuery = {
  __typename?: 'Query'
  getCampaingByClient: Array<{
    __typename?: 'Campaing'
    _id?: string | null
    title: string
    type: string
    status: string
    startDate: any
    endDate: any
    client: {
      __typename?: 'Client'
      _id?: string | null
      name: string
      email: string
    }
    consultant: {
      __typename?: 'Consultant'
      office: string
      email: string
      name: string
      _id?: string | null
    }
    files: {
      __typename?: 'Files'
      images: Array<{
        __typename?: 'File'
        url: string
        thumb: string
        title: string
        approved: boolean
      }>
      videos: Array<{
        __typename?: 'File'
        url: string
        thumb: string
        title: string
        approved: boolean
      }>
      signature: Array<{
        __typename?: 'File'
        url: string
        thumb: string
        title: string
        approved: boolean
      }>
    }
  }>
}

export type GetCampaingByIdQueryVariables = Exact<{
  getCampaingByIdId: Scalars['String']
}>

export type GetCampaingByIdQuery = {
  __typename?: 'Query'
  getCampaingById: {
    __typename?: 'Campaing'
    _id?: string | null
    client: { __typename?: 'Client'; _id?: string | null }
    links: Array<{ __typename?: 'Link'; link: string; title: string }>
    meet?: { __typename?: 'Meet'; date: any; hour: any; title: string } | null
    socialMediasResults: Array<{
      __typename?: 'SocialMedia'
      name: string
      adResults?: {
        __typename?: 'AdResults'
        _id?: string | null
        amountSpent: number
        reach: number
        costPerResults: Array<{
          __typename?: 'Result'
          title: string
          value: number
        }>
        results: Array<{ __typename?: 'Result'; title: string; value: number }>
      } | null
    }>
  }
}

export type AddFilesToCampaingMutationVariables = Exact<{
  input: AddFileCampaingInput
}>

export type AddFilesToCampaingMutation = {
  __typename?: 'Mutation'
  addFilesToCampaing: {
    __typename?: 'Campaing'
    files: {
      __typename?: 'Files'
      signature: Array<{
        __typename?: 'File'
        url: string
        thumb: string
        title: string
        approved: boolean
        folder: string
        firebasePath: string
      }>
    }
  }
}

export type AddNotificationIdClientMutationVariables = Exact<{
  input: SetNotificationIdInput
}>

export type AddNotificationIdClientMutation = {
  __typename?: 'Mutation'
  addNotificationIdClient?: {
    __typename?: 'Client'
    notificationId: string
  } | null
}

export const ClientLoginDocument = gql`
  mutation ClientLogin($input: SignInServiceClientInput!) {
    clientLogin(input: $input) {
      token
    }
  }
`
export type ClientLoginMutationFn = Apollo.MutationFunction<
  ClientLoginMutation,
  ClientLoginMutationVariables
>

/**
 * __useClientLoginMutation__
 *
 * To run a mutation, you first call `useClientLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClientLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clientLoginMutation, { data, loading, error }] = useClientLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useClientLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ClientLoginMutation,
    ClientLoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ClientLoginMutation, ClientLoginMutationVariables>(
    ClientLoginDocument,
    options,
  )
}
export type ClientLoginMutationHookResult = ReturnType<
  typeof useClientLoginMutation
>
export type ClientLoginMutationResult =
  Apollo.MutationResult<ClientLoginMutation>
export type ClientLoginMutationOptions = Apollo.BaseMutationOptions<
  ClientLoginMutation,
  ClientLoginMutationVariables
>
export const ClientMeDocument = gql`
  query ClientMe {
    clientMe {
      _id
      cnpj
      whatsapp
      contractType {
        title
        type
      }
      othersContracts {
        extra_art
        extra_network
        landing_page
        site_development
        site_maintenance
      }
      email
      name
      networks {
        name
        lastUpdate
        insights {
          comments
          commentsHistory {
            date
            quantity
          }
          followers
          followersHistory {
            date
            quantity
          }
          likes
          likesHistory {
            date
            quantity
          }
          reached
          reachedHistory {
            date
            quantity
          }
          posts
          postsHistory {
            date
            quantity
          }
          profileViews
          profileViewsHistory {
            date
            quantity
          }
        }
      }
    }
  }
`

/**
 * __useClientMeQuery__
 *
 * To run a query within a React component, call `useClientMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientMeQuery(
  baseOptions?: Apollo.QueryHookOptions<ClientMeQuery, ClientMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ClientMeQuery, ClientMeQueryVariables>(
    ClientMeDocument,
    options,
  )
}
export function useClientMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientMeQuery,
    ClientMeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ClientMeQuery, ClientMeQueryVariables>(
    ClientMeDocument,
    options,
  )
}
export type ClientMeQueryHookResult = ReturnType<typeof useClientMeQuery>
export type ClientMeLazyQueryHookResult = ReturnType<
  typeof useClientMeLazyQuery
>
export type ClientMeQueryResult = Apollo.QueryResult<
  ClientMeQuery,
  ClientMeQueryVariables
>
export const DataHistoriesDocument = gql`
  query DataHistories($input: HistoryInput!) {
    dataHistories(input: $input) {
      networkType
      week
      year
    }
  }
`

/**
 * __useDataHistoriesQuery__
 *
 * To run a query within a React component, call `useDataHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDataHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDataHistoriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDataHistoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    DataHistoriesQuery,
    DataHistoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DataHistoriesQuery, DataHistoriesQueryVariables>(
    DataHistoriesDocument,
    options,
  )
}
export function useDataHistoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DataHistoriesQuery,
    DataHistoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DataHistoriesQuery, DataHistoriesQueryVariables>(
    DataHistoriesDocument,
    options,
  )
}
export type DataHistoriesQueryHookResult = ReturnType<
  typeof useDataHistoriesQuery
>
export type DataHistoriesLazyQueryHookResult = ReturnType<
  typeof useDataHistoriesLazyQuery
>
export type DataHistoriesQueryResult = Apollo.QueryResult<
  DataHistoriesQuery,
  DataHistoriesQueryVariables
>
export const GetAllCampaingsDocument = gql`
  query GetAllCampaings {
    getAllCampaings {
      _id
      client {
        name
      }
      title
      type
      status
      startDate
      endDate
      socialMediasResults {
        name
      }
    }
  }
`

/**
 * __useGetAllCampaingsQuery__
 *
 * To run a query within a React component, call `useGetAllCampaingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCampaingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCampaingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCampaingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllCampaingsQuery,
    GetAllCampaingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllCampaingsQuery, GetAllCampaingsQueryVariables>(
    GetAllCampaingsDocument,
    options,
  )
}
export function useGetAllCampaingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllCampaingsQuery,
    GetAllCampaingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetAllCampaingsQuery,
    GetAllCampaingsQueryVariables
  >(GetAllCampaingsDocument, options)
}
export type GetAllCampaingsQueryHookResult = ReturnType<
  typeof useGetAllCampaingsQuery
>
export type GetAllCampaingsLazyQueryHookResult = ReturnType<
  typeof useGetAllCampaingsLazyQuery
>
export type GetAllCampaingsQueryResult = Apollo.QueryResult<
  GetAllCampaingsQuery,
  GetAllCampaingsQueryVariables
>
export const GetCampaingByClientDocument = gql`
  query GetCampaingByClient($client: String!) {
    getCampaingByClient(client: $client) {
      _id
      title
      type
      status
      startDate
      endDate
      client {
        _id
        name
        email
      }
      consultant {
        office
        email
        name
        _id
      }
      files {
        images {
          url
          thumb
          title
          approved
        }
        videos {
          url
          thumb
          title
          approved
        }
        signature {
          url
          thumb
          title
          approved
        }
      }
    }
  }
`

/**
 * __useGetCampaingByClientQuery__
 *
 * To run a query within a React component, call `useGetCampaingByClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaingByClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaingByClientQuery({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useGetCampaingByClientQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCampaingByClientQuery,
    GetCampaingByClientQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetCampaingByClientQuery,
    GetCampaingByClientQueryVariables
  >(GetCampaingByClientDocument, options)
}
export function useGetCampaingByClientLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCampaingByClientQuery,
    GetCampaingByClientQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetCampaingByClientQuery,
    GetCampaingByClientQueryVariables
  >(GetCampaingByClientDocument, options)
}
export type GetCampaingByClientQueryHookResult = ReturnType<
  typeof useGetCampaingByClientQuery
>
export type GetCampaingByClientLazyQueryHookResult = ReturnType<
  typeof useGetCampaingByClientLazyQuery
>
export type GetCampaingByClientQueryResult = Apollo.QueryResult<
  GetCampaingByClientQuery,
  GetCampaingByClientQueryVariables
>
export const GetCampaingByIdDocument = gql`
  query GetCampaingById($getCampaingByIdId: String!) {
    getCampaingById(id: $getCampaingByIdId) {
      _id
      client {
        _id
      }
      links {
        link
        title
      }
      meet {
        date
        hour
        title
      }
      socialMediasResults {
        name
        adResults {
          _id
          amountSpent
          reach
          costPerResults {
            title
            value
          }
          results {
            title
            value
          }
        }
      }
    }
  }
`

/**
 * __useGetCampaingByIdQuery__
 *
 * To run a query within a React component, call `useGetCampaingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaingByIdQuery({
 *   variables: {
 *      getCampaingByIdId: // value for 'getCampaingByIdId'
 *   },
 * });
 */
export function useGetCampaingByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCampaingByIdQuery,
    GetCampaingByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCampaingByIdQuery, GetCampaingByIdQueryVariables>(
    GetCampaingByIdDocument,
    options,
  )
}
export function useGetCampaingByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCampaingByIdQuery,
    GetCampaingByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetCampaingByIdQuery,
    GetCampaingByIdQueryVariables
  >(GetCampaingByIdDocument, options)
}
export type GetCampaingByIdQueryHookResult = ReturnType<
  typeof useGetCampaingByIdQuery
>
export type GetCampaingByIdLazyQueryHookResult = ReturnType<
  typeof useGetCampaingByIdLazyQuery
>
export type GetCampaingByIdQueryResult = Apollo.QueryResult<
  GetCampaingByIdQuery,
  GetCampaingByIdQueryVariables
>
export const AddFilesToCampaingDocument = gql`
  mutation AddFilesToCampaing($input: AddFileCampaingInput!) {
    addFilesToCampaing(input: $input) {
      files {
        signature {
          url
          thumb
          title
          approved
          folder
          firebasePath
        }
      }
    }
  }
`
export type AddFilesToCampaingMutationFn = Apollo.MutationFunction<
  AddFilesToCampaingMutation,
  AddFilesToCampaingMutationVariables
>

/**
 * __useAddFilesToCampaingMutation__
 *
 * To run a mutation, you first call `useAddFilesToCampaingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFilesToCampaingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFilesToCampaingMutation, { data, loading, error }] = useAddFilesToCampaingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFilesToCampaingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddFilesToCampaingMutation,
    AddFilesToCampaingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddFilesToCampaingMutation,
    AddFilesToCampaingMutationVariables
  >(AddFilesToCampaingDocument, options)
}
export type AddFilesToCampaingMutationHookResult = ReturnType<
  typeof useAddFilesToCampaingMutation
>
export type AddFilesToCampaingMutationResult =
  Apollo.MutationResult<AddFilesToCampaingMutation>
export type AddFilesToCampaingMutationOptions = Apollo.BaseMutationOptions<
  AddFilesToCampaingMutation,
  AddFilesToCampaingMutationVariables
>
export const AddNotificationIdClientDocument = gql`
  mutation AddNotificationIdClient($input: SetNotificationIdInput!) {
    addNotificationIdClient(input: $input) {
      notificationId
    }
  }
`
export type AddNotificationIdClientMutationFn = Apollo.MutationFunction<
  AddNotificationIdClientMutation,
  AddNotificationIdClientMutationVariables
>

/**
 * __useAddNotificationIdClientMutation__
 *
 * To run a mutation, you first call `useAddNotificationIdClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNotificationIdClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNotificationIdClientMutation, { data, loading, error }] = useAddNotificationIdClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNotificationIdClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddNotificationIdClientMutation,
    AddNotificationIdClientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddNotificationIdClientMutation,
    AddNotificationIdClientMutationVariables
  >(AddNotificationIdClientDocument, options)
}
export type AddNotificationIdClientMutationHookResult = ReturnType<
  typeof useAddNotificationIdClientMutation
>
export type AddNotificationIdClientMutationResult =
  Apollo.MutationResult<AddNotificationIdClientMutation>
export type AddNotificationIdClientMutationOptions = Apollo.BaseMutationOptions<
  AddNotificationIdClientMutation,
  AddNotificationIdClientMutationVariables
>
