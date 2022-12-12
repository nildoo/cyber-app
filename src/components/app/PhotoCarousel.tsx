import React, {useRef, useState} from 'react'
import {
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  ScrollView,
} from 'react-native'
import styled from 'styled-components/native'
import {Box} from '../../components/Box'
// import {TextBase} from '../../components/TextBase'
// import {Space} from '../Space'

const {width} = Dimensions.get('window')
type IPhotoCaouselProps = {
  photos:
    | {
        id: string
        url: string
      }[]

  imageNumber: number | undefined
}

export const PhotoCarousel: React.FC<IPhotoCaouselProps> = props => {
  const pages = props.imageNumber as number
  const [page, setPage] = useState(pages)

  // const [w, setW] = useState(0)
  // const theme = useTheme()

  const ref = useRef<ScrollView>(null)

  const onChange = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      )
      if (slide !== page) {
        setPage(slide)
      }
    }
  }

  // const handleNext = () => {
  //   if (ref.current) {
  //     if (page === 0) {
  //       ref.current.scrollTo({
  //         x: width,
  //         y: 0,
  //         animated: true,
  //       })
  //     }
  //     if (page === 1) {
  //       ref.current.scrollTo({
  //         x: width * 2,
  //         y: 0,
  //         animated: true,
  //       })
  //       setW(width * 2)
  //     }
  //     if (page === 2) {
  //       ref.current.scrollTo({
  //         x: 0,
  //         y: 0,
  //         animated: true,
  //       })
  //     }
  //   }
  // }

  // const handleBack = () => {
  //   if (ref.current) {
  //     if (page === 0) {
  //       return
  //     }
  //     if (page === 1) {
  //       ref.current.scrollTo({
  //         x: 0,
  //         y: -width,
  //         animated: true,
  //       })
  //     }
  //     if (page === 2) {
  //       ref.current.scrollTo({
  //         x: 0,
  //         y: width / 1,
  //         animated: true,
  //       })
  //     }
  //   }
  // }

  return (
    <Box>
      <ScrollView
        ref={ref}
        horizontal
        snapToOffsets={[...Array(props.photos?.length)].map(
          (x, i) => i * width + (i - 1) * 20,
        )}
        showsHorizontalScrollIndicator={false}
        style={{width: width}}
        onScroll={({nativeEvent}) => onChange(nativeEvent)}>
        <Box h="221px" flexDirection="row" style={{width: width}}>
          <Image
            source={{
              uri: props?.photos[page]?.url,
            }}
          />
        </Box>
      </ScrollView>
      {/* <Space h={10} />
      <Box justify="center" flexDirection="row">
        {props.photos?.map((item, index) => (
          <TextBase
            key={item.id}
            ff={theme.fonts.lato700}
            style={{marginRight: 5}}
            fz={17}
            color={
              index === page ? theme.colors.primary : theme.colors.background
            }>
            ●
          </TextBase>
        ))}
      </Box> */}
    </Box>
  )
}

const Image = styled(ImageBackground)`
  height: 100%;
  width: 100%;
`

// const FloatButton = styled(Pressable)`
//   height: 32px;
//   align-items: center;
//   justify-content: center;
//   width: 32px;
//   border-radius: 32px;
//   background-color: rgba(255, 255, 255, 0.2);
// `
