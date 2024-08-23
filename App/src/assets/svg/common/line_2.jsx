import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import {colors} from '@themes/color';

const SvgComponent = ({size = 24, color = colors.white}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path d="M1 7H23" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path
      d="M9.55566 15H23.0001"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
