import dayjs from 'dayjs'
import React from 'react'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { useTheme } from 'styled-components/native'
import { Box } from '../../../../components/Box'
import { TextBase } from '../../../../components/TextBase'
import weekday from 'dayjs/plugin/weekday'
import { DataHistoriesQuery } from '../../../../generated/graphql'
import { numberFormat } from '../../../../components/NumberFormat'
const { width } = Dimensions.get('window')
dayjs.extend(weekday)
type IWeeklyChart = {
  dataType: string
  data: DataHistoriesQuery | undefined
  chartIndex: number
}

export const WeeklyChart: React.FC<IWeeklyChart> = props => {
  const theme = useTheme()

  const customDataPoint = (item: number) => {
    return (
      <Box h="22px" w="100px" align="center">
        <TextBase
          color={theme.colors.primary}
          fz={12}
          ff={theme.fonts.lato700}
          style={{ marginBottom: 6, position: 'absolute' }}>
          {numberFormat(item)}
        </TextBase>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: theme.colors.primary400,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.colors.primary,
            marginTop: 15,
          }}
        />
      </Box>
    )
  }

  const customLabel = (val: string | number) => {
    return (
      <Box w="70px" ml={20}>
        <TextBase color={theme.colors.mono500} ff={theme.fonts.lato700} fz={14}>
          {val}
        </TextBase>
      </Box>
    )
  }

  const lable = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const graph = props.data?.dataHistories[props.chartIndex].week.map(
    (item, index) => {
      return {
        value: item,
        date: dayjs().weekday(index).format('DD-MM-YYYY'),
        labelComponent: () => customLabel(lable[index]),
        customDataPoint: () => customDataPoint(item),
      }
    },
  )

  return (
    <Box
      flexBox
      h="300px"
      justify="center"
      bgc={theme.colors.background}
      br={10}
      pr={16}>
      <LineChart
        areaChart
        curved
        isAnimated
        hideYAxisText
        animateOnDataChange
        animationDuration={2000}
        onDataChangeAnimationDuration={300}
        data={graph}
        // maxValue={8 * 1000}
        noOfSections={7}
        minValue={0}
        // stepValue={1000}
        width={width + width / 2}
        color1={theme.colors.primary400}
        startFillColor1={theme.colors.primary}
        endFillColor1={theme.colors.primary400}
        startOpacity={0.9}
        endOpacity={0.2}
        spacing={80}
        initialSpacing={52}
        yAxisColor="black"
        yAxisThickness={0}
        rulesColor={theme.colors.primary400}
        yAxisTextStyle={{ color: 'gray' }}
        // yAxisLabelSuffix="%"
        xAxisColor={theme.colors.primary400}
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: theme.colors.primary400,
          pointerStripWidth: 3,

          strokeDashArray: [2, 5],
          pointerColor: theme.colors.primary400,
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,

          pointerLabelComponent: items => {
            return (
              <View
                style={{
                  // height: 90,
                  justifyContent: 'center',
                  marginTop: -30,
                  marginLeft: -40,
                }}>
                <Box
                  align="center"
                  ph={16}
                  pv={8}
                  br={16}
                  bgc="#FF8533"
                  style={{
                    elevation: 3,
                  }}>
                  <TextBase
                    fz={14}
                    color={theme.colors.background}
                    ff={theme.fonts.lato700}>
                    {items[0]?.date}
                  </TextBase>
                  <TextBase
                    fz={14}
                    color={theme.colors.background}
                    ff={theme.fonts.lato700}>
                    Valor: {numberFormat(items[0]?.value)}
                  </TextBase>
                </Box>
              </View>
            )
          },
        }}
      />
    </Box>
  )
}
