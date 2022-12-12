import React from 'react'
import {ViewProps, View} from 'react-native'
import styled, {css} from 'styled-components/native'

type Props = ViewProps & {
  /**
   * Background Color
   */
  bgc?: string
  /**
   * FlexBox
   */
  flexBox?: boolean
  /**
   * Padding Horizontal Color
   */
  ph?: number
  /**
   * Padding Horizontal Color
   */
  pd?: number
  /**
   * Padding
   */
  pv?: number
  /**
   * Padding Top
   */
  pt?: number
  /**
   * PaddingRight
   */
  pr?: number
  /**
   * PaddingBottom
   */
  pb?: number
  /**
   * Padding Left
   */
  pl?: number
  /**
   * Margin
   */
  mg?: number
  /**
   * Margin Top
   */
  mt?: number
  /**
   * Margin Right
   */
  mr?: number
  /**
   * Margin Bottom
   */
  mb?: number
  /**
   * Margin Left
   */
  ml?: number
  /**
   * Width
   */
  w?: string
  /**
   * Height
   */
  h?: string
  /**
   * Border Radius
   */
  br?: number
  /**
   * Overflow
   */
  ovf?: boolean
  /**
   * Flex-Direction
   */
  flexDirection?: 'row' | 'column'
  /**
   * Align Items
   */
  align?: 'flex-start' | 'center' | 'flex-end'
  /**
   * Border-Bottom-Left-Radius
   */
  bblr?: number
  /**
   * Border-Bottom-Rigth-Radius
   */
  bbrr?: number
  /**
   * Justfy-Content
   */
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
}

export const Box: React.FC<Props> = (props): JSX.Element => {
  return <Container {...props} />
}

const Container = styled(View)<Props>`
  width: 100%;
  background-color: ${props => props.bgc || 'transparent'};

  padding: ${props => (props.pd ? props.pd : 0)}px;
  padding-top: ${props => (props.pt ? props.pt : 0)}px;
  padding-right: ${props => (props.pr ? props.pr : 0)}px;
  padding-bottom: ${props => (props.pb ? props.pb : 0)}px;
  padding-left: ${props => (props.pl ? props.pl : 0)}px;

  margin: ${props => (props.mg ? props.mg : 0)}px;
  margin-top: ${props => (props.mt ? props.mt : 0)}px;
  margin-right: ${props => (props.mr ? props.mr : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;
  margin-left: ${props => (props.ml ? props.ml : 0)}px;

  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'column'};
  width: ${props => (props.w ? props.w : '100%')};

  border-radius: ${props => (props.br ? props.br : 0)}px;
  ${props =>
    props.flexBox &&
    css`
      flex: 1;
    `};

  ${props =>
    props.h &&
    css`
      height: ${props.h};
    `};

  ${props =>
    props.align &&
    css`
      align-items: ${props.align};
    `};

  ${props =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `};

  ${props =>
    props.ph &&
    css`
      padding-left: ${props.ph}px;
      padding-right: ${props.ph}px;
    `};

  ${props =>
    props.pv &&
    css`
      padding-top: ${props.pv}px;
      padding-bottom: ${props.pv}px;
    `};

  ${props =>
    props.pd &&
    css`
      padding: ${props.pd}px;
    `};

  ${props =>
    props.ovf &&
    css`
      overflow: hidden;
    `};
`
