import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';
import {memo} from 'react';

const SvgComponent = ({size = 24, color = colors.white}) => (
  <Svg
    width={moderateScale(size)}
    height={moderateScale(size)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 10C12.5523 10 13 10.4477 13 11V16.0009C13 16.5532 12.5523 17.0009 12 17.0009C11.4477 17.0009 11 16.5532 11 16.0009V11C11 10.4477 11.4477 10 12 10Z"
      fill={color}
    />
    <Circle cx={12} cy={8} r={1} fill={color} />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
