import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MessageSvgImg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M16.32 2.648a8.97 8.97 0 0 0-14.603 9.867.95.95 0 0 1 .08.575l-.789 3.794a.897.897 0 0 0 .543 1.013.897.897 0 0 0 .354.064h.18l3.839-.772a1.13 1.13 0 0 1 .574.08 8.97 8.97 0 0 0 9.867-14.603l-.044-.018Zm-9.93 7.24a.897.897 0 1 1 0-1.795.897.897 0 0 1 0 1.794Zm3.589 0a.897.897 0 1 1 0-1.795.897.897 0 0 1 0 1.794Zm3.588 0a.897.897 0 1 1 0-1.795.897.897 0 0 1 0 1.794Z"
    />
  </Svg>
)
export default MessageSvgImg
