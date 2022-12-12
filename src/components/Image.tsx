import {Image as Img, ImageProps} from 'react-native'
import styled from 'styled-components/native'

type Props = ImageProps & {}

export const Image: React.FC<Props> = props => {
  return <Container {...props} />
}

const Container = styled(Img)`
  height: 100%;
  width: 100%;
`
