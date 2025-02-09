import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CheckmarkSVG = (props: any) => (
  <Svg
    width="24px"
    height="24px"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000000"
    {...props}
  >
    <Path
      d="M5 13L9 17L19 7"
      stroke="#000000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CheckmarkSVG;
