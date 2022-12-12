import React from 'react'
import { useTheme } from 'styled-components/native'
import { GetCampaingByIdQuery } from '../../generated/graphql'
import { Box } from '../Box'
import currency from 'currency-formatter'
import { Space } from '../Space'
import { TextBase } from '../TextBase'
import { numberFormat } from '../NumberFormat'
import { ScrollView, View } from 'react-native'

type Props = {
  data: GetCampaingByIdQuery | undefined
}

export const Metrics: React.FC<Props> = props => {
  const theme = useTheme()

  return (
    <Box>
      {props.data?.getCampaingById.socialMediasResults.map((item, index) => (
        <Box key={index}>
          <TextBase
            style={{
              paddingHorizontal: 16,
              textTransform: 'capitalize',
            }}
            ff={theme.fonts.lato700}
            fz={24}
            color={theme.colors.mono500}>
            {item.name}
          </TextBase>
          <Space h={8} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Space h={16} />

              <View
                style={{
                  elevation: 3,
                  marginTop: 5,
                  marginBottom: 16,
                  backgroundColor: theme.colors.background,
                  borderRadius: 16,
                  padding: 16,
                  minWidth: 250,
                  marginLeft: 16,
                }}>
                <TextBase
                  ff={theme.fonts.lato700}
                  fz={20}
                  color={theme.colors.mono500}>
                  Custo por resultado
                </TextBase>
                <Space h={16} />
                {!item.adResults?.costPerResults ? (
                  <TextBase
                    ta="center"
                    ff={theme.fonts.lato700}
                    fz={16}
                    color={theme.colors.mono500}>
                    Sem dados cadastrados.
                  </TextBase>
                ) : (
                  <>
                    {item.adResults?.costPerResults.map((subItem, subIndex) => (
                      <Box key={subIndex} mb={16}>
                        <TextBase
                          ff={theme.fonts.lato700}
                          fz={16}
                          color={theme.colors.mono500}>
                          {subItem.title}
                        </TextBase>
                        <Space h={8} />
                        <TextBase
                          ff={theme.fonts.lato700}
                          fz={21}
                          color={theme.colors.primary}>
                          {currency.format(subItem.value, { locale: 'pt-BR' })}
                        </TextBase>
                      </Box>
                    ))}
                  </>
                )}
              </View>
              <Space w={16} />
              <View
                style={{
                  elevation: 3,
                  marginTop: 5,
                  marginBottom: 16,
                  backgroundColor: theme.colors.background,
                  borderRadius: 16,
                  padding: 16,
                  minWidth: 250,
                }}>
                <TextBase
                  ff={theme.fonts.lato700}
                  fz={20}
                  color={theme.colors.mono500}>
                  Resultado
                </TextBase>
                <Space h={16} />
                {!item.adResults?.results ? (
                  <TextBase
                    ta="center"
                    ff={theme.fonts.lato700}
                    fz={16}
                    color={theme.colors.mono500}>
                    Sem dados cadastrados.
                  </TextBase>
                ) : (
                  <>
                    {item.adResults?.results.map((subItem, subIndex) => (
                      <Box key={subIndex} mb={16}>
                        <TextBase
                          ff={theme.fonts.lato700}
                          fz={16}
                          color={theme.colors.mono500}>
                          {subItem.title}
                        </TextBase>
                        <Space h={8} />
                        <TextBase
                          ff={theme.fonts.lato700}
                          fz={21}
                          color={theme.colors.primary}>
                          {currency.format(subItem.value, { locale: 'pt-BR' })}
                        </TextBase>
                      </Box>
                    ))}
                  </>
                )}
              </View>
              <Space w={16} />
            </View>
          </ScrollView>

          <View
            style={{
              elevation: 3,
              marginTop: 5,
              marginBottom: 16,
              backgroundColor: theme.colors.background,
              borderRadius: 16,
              padding: 16,
              marginHorizontal: 16,
            }}>
            <TextBase
              ff={theme.fonts.lato700}
              fz={20}
              color={theme.colors.mono500}>
              Valor gasto
            </TextBase>
            <Space h={8} />
            {!item.adResults?.amountSpent ? (
              <TextBase
                ta="center"
                ff={theme.fonts.lato700}
                fz={16}
                color={theme.colors.mono500}>
                Sem dados cadastrados.
              </TextBase>
            ) : (
              <TextBase
                ff={theme.fonts.lato700}
                fz={21}
                color={theme.colors.primary}>
                {currency.format(Number(item.adResults?.amountSpent), {
                  locale: 'pt-BR',
                })}
              </TextBase>
            )}
          </View>
          <View
            style={{
              elevation: 3,
              marginTop: 5,
              marginBottom: 16,
              backgroundColor: theme.colors.background,
              borderRadius: 16,
              padding: 16,
              marginHorizontal: 16,
            }}>
            <TextBase
              ff={theme.fonts.lato700}
              fz={20}
              color={theme.colors.mono500}>
              Alcance
            </TextBase>
            <Space h={8} />
            {!item.adResults?.reach ? (
              <TextBase
                ta="center"
                ff={theme.fonts.lato700}
                fz={16}
                color={theme.colors.mono500}>
                Sem dados cadastrados.
              </TextBase>
            ) : (
              <TextBase
                ff={theme.fonts.lato700}
                fz={21}
                color={theme.colors.primary}>
                {numberFormat(Number(item.adResults?.reach))}
              </TextBase>
            )}
          </View>
        </Box>
      ))}
    </Box>
  )
}
