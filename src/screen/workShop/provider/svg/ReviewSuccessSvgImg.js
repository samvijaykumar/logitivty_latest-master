import * as React from "react"
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  RadialGradient,
  Stop,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const ReviewSuccessSvgImg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={215}
    height={215}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={139} height={139} x={38} y={38} fill="url(#b)" rx={69.5} />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
        d="m78.334 107.5 19.445 19.446 38.887-38.891"
      />
    </G>
    <Defs>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(90 0 107.5) scale(69.5)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#79E659" />
        <Stop offset={1} stopColor="#34A513" />
      </RadialGradient>
    </Defs>
  </Svg>
)
export default ReviewSuccessSvgImg
