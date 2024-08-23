import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import {colors} from '@themes/color';

const SvgComponent = ({size = 32, color = colors.white}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      d="M24.6483 7.38503C21.344 4.72027 17.9651 7.38502 16.75 8.60992C15.5348 7.38502 12.156 4.72027 8.85169 7.38503C5.54734 10.0498 4.82919 15.5791 9.45925 20.2464C14.0893 24.9137 16.75 25.7585 16.75 25.7585C16.75 25.7585 19.4107 24.9137 24.0407 20.2464C28.6708 15.5791 27.9526 10.0498 24.6483 7.38503Z"
      fill={color}
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
