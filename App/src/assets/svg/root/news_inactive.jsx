import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';

const SvgComponent = ({size = 32, color = colors.white}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      d="M16.5 6.25H12.75C9.43629 6.25 6.75 8.93629 6.75 12.25V19.75C6.75 23.0637 9.43629 25.75 12.75 25.75H20.25C23.5637 25.75 26.25 23.0637 26.25 19.75V16M16.981 15.4534L25.396 7.03838"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
