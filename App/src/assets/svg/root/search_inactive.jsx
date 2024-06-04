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
      d="M21.4332 21.1672C23.0977 19.4946 24.1265 17.1887 24.1265 14.6425C24.1265 9.53385 19.9851 5.39249 14.8765 5.39249C9.76783 5.39249 5.62646 9.53385 5.62646 14.6425C5.62646 19.7511 9.76783 23.8925 14.8765 23.8925C17.4389 23.8925 19.758 22.8505 21.4332 21.1672ZM21.4332 21.1672L26.8735 26.6075"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
