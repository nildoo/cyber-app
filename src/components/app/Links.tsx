import React from 'react'
import { useTheme } from 'styled-components/native'
import { Box } from '../Box'
import { Hr } from '../Hr'
import { Space } from '../Space'
import { TextBase } from '../TextBase'
import { Linking } from 'react-native'

type Props = {
  links:
    | {
        __typename?: 'Link' | undefined
        link: string
        title: string
      }[]
    | undefined
}

export const Links: React.FC<Props> = props => {
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
        Links
      </TextBase>
      {props.links?.length === 0 ? (
        <TextBase
          ta="center"
          ff={theme.fonts.lato700}
          fz={16}
          color={theme.colors.mono500}>
          Sem dados cadastrados.
        </TextBase>
      ) : (
        <>
          {props.links?.map((item, index) => (
            <Box key={index}>
              <Space h={8} />
              <TextBase
                ff={theme.fonts.lato700}
                fz={14}
                color={theme.colors.mono500}>
                Título:
              </TextBase>
              <TextBase
                ff={theme.fonts.lato700}
                fz={20}
                color={theme.colors.primary}>
                {item.title}
              </TextBase>
              <Space h={16} />
              <TextBase
                ff={theme.fonts.lato700}
                fz={14}
                color={theme.colors.mono500}>
                Link:
              </TextBase>
              <TextBase
                numberOfLines={1}
                style={{ textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL(item.link)}
                ff={theme.fonts.lato700}
                fz={20}
                color={theme.colors.primary}>
                {item.link}
              </TextBase>
              <Space h={10} />
              {props.links && (
                <>
                  {props.links[props.links.length - 1] !== item && (
                    <>
                      <Space h={16} />
                      <Hr c={theme.colors.primary400} />
                      <Space h={8} />
                    </>
                  )}
                </>
              )}
              <Space h={10} />
            </Box>
          ))}
        </>
      )}
    </Box>
  )
}
