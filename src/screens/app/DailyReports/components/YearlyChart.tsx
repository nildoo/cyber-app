import React from 'react'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { useTheme } from 'styled-components/native'
import { Box } from '../../../../components/Box'
import { numberFormat } from '../../../../components/NumberFormat'
import { TextBase } from '../../../../components/TextBase'
import { DataHistoriesQuery } from '../../../../generated/graphql'
const { width } = Dimensions.get('window')

type IYearlyChart = {
  dataType: string
  data: DataHistoriesQuery | undefined
  chartIndex: number
}

export const YearlyChart: React.FC<IYearlyChart> = props => {
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

  const lable = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  const graph = props.data?.dataHistories[props.chartIndex].year.map(
    (item, index) => {
      return {
        value: item,
        labelComponent: () => customLabel(lable[index]),
        customDataPoint: () => customDataPoint(item),
        topLabelComponent: () => (
          <TextBase
            color={theme.colors.primary}
            fz={18}
            style={{ marginBottom: 6 }}>
            {numberFormat(item)}
          </TextBase>
        ),
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
        thickness={3}
        verticalLinesColor="red"
        isAnimated
        animateOnDataChange
        animationDuration={2000}
        onDataChangeAnimationDuration={300}
        data={graph}
        // maxValue={8 * 1000}
        // noOfSections={8}
        minValue={0}
        // stepValue={1000}
        hideYAxisText
        width={width + width - 30}
        color1={theme.colors.primary400}
        startFillColor1={theme.colors.primary}
        endFillColor1={theme.colors.primary400}
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={50}
        yAxisColor="black"
        yAxisThickness={0}
        rulesType="dash"
        rulesColor={theme.colors.primary400}
        yAxisTextStyle={{ color: 'gray' }}
        // yAxisLabelSuffix="%"
        xAxisColor={theme.colors.primary400}
        // pointerConfig={{
        //   pointerStripUptoDataPoint: true,
        //   pointerStripColor: theme.colors.primary400,
        //   pointerStripWidth: 3,

        //   strokeDashArray: [2, 5],
        //   pointerColor: theme.colors.primary400,
        //   radius: 4,
        //   pointerLabelWidth: 100,
        //   pointerLabelHeight: 120,

        //   // pointerLabelComponent: items => {
        //   //   return (
        //   //     <View
        //   //       style={{
        //   //         // height: 90,
        //   //         width: 100,
        //   //         justifyContent: 'center',
        //   //         marginTop: -30,
        //   //         marginLeft: -40,
        //   //       }}>
        //   //       <Box
        //   //         align="center"
        //   //         ph={16}
        //   //         pv={8}
        //   //         br={16}
        //   //         bgc="#FF8533"
        //   //         style={{
        //   //           elevation: 3,
        //   //         }}>
        //   //         <TextBase
        //   //           color={theme.colors.background}
        //   //           ff={theme.fonts.lato700}>
        //   //           Valor: {items[0]?.value}
        //   //         </TextBase>
        //   //       </Box>
        //   //     </View>
        //   //   )
        //   // },
        // }}
      />
    </Box>
  )
}
