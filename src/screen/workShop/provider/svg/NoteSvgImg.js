import * as React from "react"
import Svg, { Path } from "react-native-svg"
const NoteSvgImg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M19 7.693v10.342a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-12h7.343l6.001-6H3c-1.654 0-3 1.346-3 3v15c0 1.654 1.346 3 3 3h15c1.654 0 3-1.346 3-3V5.692l-2 2Z"
    />
    <Path
      fill="#fff"
      d="m17.767.439-7.07 7.07-.708 3.537 3.536-.708 7.07-7.07-2.828-2.83Z"
    />
  </Svg>
)
export default NoteSvgImg
