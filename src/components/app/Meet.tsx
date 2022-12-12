import React from 'react'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Space } from '../Space'
import { TextBase } from '../TextBase'
import dayjs from 'dayjs'

type Props = {
  meet?:
    | {
        __typename?: 'Meet' | undefined
        date: any
        hour: any
        title: string
      }
    | null
    | undefined
}

export const Meet: React.FC<Props> = props => {
  const theme = useTheme()

  return (
    <Box
      flexDirection="column"
      mb={16}
      bgc={theme.colors.background}
      br={16}
      pd={16}
      style={{
        elevation: 3,
      }}>
      <TextBase ff={theme.fonts.lato700} fz={24} color={theme.colors.mono500}>
        Reunião
      </TextBase>
      <Space h={8} />
      {!props.meet ? (
        <TextBase
          ta="center"
          ff={theme.fonts.lato700}
          fz={16}
          color={theme.colors.mono500}>
          Sem dados cadastrados.
        </TextBase>
      ) : (
        <Box>
          <Space h={16} />
          <TextBase
            ff={theme.fonts.lato700}
            fz={14}
            color={theme.colors.mono500}>
            Título:
          </TextBase>

          <TextBase
            numberOfLines={1}
            ff={theme.fonts.lato700}
            fz={20}
            color={theme.colors.primary}>
            {props.meet?.title || '--'}
          </TextBase>
          <Space h={16} />
          <TextBase
            ff={theme.fonts.lato700}
            fz={14}
            color={theme.colors.mono500}>
            Data:
          </TextBase>
          <TextBase
            ff={theme.fonts.lato700}
            fz={20}
            color={theme.colors.primary}>
            {dayjs(props.meet?.date).format('DD/MM/YYYY') || '--'}
          </TextBase>
          <Space h={16} />
          <TextBase
            ff={theme.fonts.lato700}
            fz={14}
            color={theme.colors.mono500}>
            Hora:
          </TextBase>
          <TextBase
            ff={theme.fonts.lato700}
            fz={20}
            color={theme.colors.primary}>
            {dayjs(props.meet?.hour).format('HH:mm') || '--'}
          </TextBase>
        </Box>
      )}
    </Box>
  )
}
