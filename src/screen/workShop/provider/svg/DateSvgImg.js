import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DateSvgImg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#363636"
      d="M15.3 1.8h-1.8V.9a.9.9 0 1 0-1.8 0v.9H6.3V.9a.9.9 0 1 0-1.8 0v.9H2.7A2.7 2.7 0 0 0 0 4.5v10.8A2.7 2.7 0 0 0 2.7 18h12.6a2.7 2.7 0 0 0 2.7-2.7V4.5a2.7 2.7 0 0 0-2.7-2.7Zm.9 13.5a.9.9 0 0 1-.9.9H2.7a.9.9 0 0 1-.9-.9V9h14.4v6.3Zm0-8.1H1.8V4.5a.9.9 0 0 1 .9-.9h1.8v.9a.9.9 0 0 0 1.8 0v-.9h5.4v.9a.9.9 0 1 0 1.8 0v-.9h1.8a.9.9 0 0 1 .9.9v2.7Z"
    />
  </Svg>
)
export default DateSvgImg
