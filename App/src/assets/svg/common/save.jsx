import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';

const SvgComponent = ({size = 24, color = colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="2"
      strokeLinecap="round"
      d="M18 20L12 15.2778L6 20V4.88889C6 4.38792 6.18061 3.90748 6.5021 3.55324C6.82359 3.19901 7.25963 3 7.71429 3H16.2857C16.7404 3 17.1764 3.19901 17.4979 3.55324C17.8194 3.90748 18 4.38792 18 4.88889V20Z"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
