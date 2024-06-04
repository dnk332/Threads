import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';

const SvgComponent = ({size = 25, color = colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7.75C4 7.33579 4.44772 7 5 7H15C15.5523 7 16 7.33579 16 7.75C16 8.16422 15.5523 8.5 15 8.5H5C4.44772 8.5 4 8.16422 4 7.75Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 12.25C4 11.8358 4.3731 11.5 4.83333 11.5H18.1667C18.6269 11.5 19 11.8358 19 12.25C19 12.6642 18.6269 13 18.1667 13H4.83333C4.3731 13 4 12.6642 4 12.25Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 16.75C4 16.3358 4.44772 16 5 16H15C15.5523 16 16 16.3358 16 16.75C16 17.1642 15.5523 17.5 15 17.5H5C4.44772 17.5 4 17.1642 4 16.75Z"
      fill={color}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
