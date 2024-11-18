import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
const WorkShopCompleted = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={21}
    height={19}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h21v19H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.01613 0 0 .01786 -.065 0)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={71}
        height={72}
        
      />
    </Defs>
  </Svg>
)
export default WorkShopCompleted
