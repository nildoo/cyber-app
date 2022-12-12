import React, { useMemo } from 'react'
import { TextBase } from '../../../../components/TextBase'
import { Pressable } from 'react-native'
import { Box } from '../../../../components/Box'
import styled, { useTheme } from 'styled-components/native'

import { Space } from '../../../../components/Space'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

type ICustomBottomSheet = {
  graphType: 'Weekly' | 'Yearly'
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>
  handleGraphWeekly: () => void
  handleGraphYearly: () => void
}

export const CustomBottomSheet: React.FC<ICustomBottomSheet> = props => {
  const theme = useTheme()

  const snapPoints = useMemo(() => ['25%', '40%'], [])

  return (
    <BottomSheetModalProvider>
      <Box>
        <BottomSheetModal
          ref={props.bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          overDragResistanceFactor={10}
          enableDismissOnClose={true}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.primary,
          }}
          backgroundStyle={{
            backgroundColor: theme.colors.background,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          <BottomSheetView
            style={{
              elevation: 5,
            }}>
            <Box ph={16}>
              <Space h={16} />
              <TextBase>Tipo do gráfico</TextBase>
              <Box mb={10} flexDirection="row" align="center" mt={16}>
                <GraphTypeButton
                  onPress={props.handleGraphWeekly}
                  style={{
                    borderWidth: 1,
                    borderColor:
                      props.graphType === 'Weekly'
                        ? theme.colors.background
                        : theme.colors.primary,
                    backgroundColor:
                      props.graphType === 'Weekly'
                        ? theme.colors.primary
                        : theme.colors.background,
                  }}>
                  <TextBase
                    onPress={props.handleGraphWeekly}
                    color={
                      props.graphType === 'Weekly'
                        ? theme.colors.background
                        : theme.colors.primary
                    }>
                    Semanal
                  </TextBase>
                </GraphTypeButton>
                <Space w={10} />
                <GraphTypeButton
                  onPress={props.handleGraphYearly}
                  style={{
                    borderWidth: 1,
                    borderColor:
                      props.graphType === 'Yearly'
                        ? theme.colors.background
                        : theme.colors.primary,
                    backgroundColor:
                      props.graphType === 'Yearly'
                        ? theme.colors.primary
                        : theme.colors.background,
                  }}>
                  <TextBase
                    onPress={props.handleGraphYearly}
                    color={
                      props.graphType === 'Yearly'
                        ? theme.colors.background
                        : theme.colors.primary
                    }>
                    Anual
                  </TextBase>
                </GraphTypeButton>
              </Box>
            </Box>
          </BottomSheetView>
        </BottomSheetModal>
      </Box>
    </BottomSheetModalProvider>
  )
}

const GraphTypeButton = styled(Pressable)`
  padding-horizontal: 16px;
  padding-vertical: 5px;
  border-radius: 5px;
`
