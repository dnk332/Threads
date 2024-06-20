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
    <Circle
      cx={12}
      cy={12}
      r={9}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M18 6L14.8284 9.17157M6 18L9.17157 14.8284M6 6L9.17157 9.17157M18 18L14.8284 14.8284M14.8284 9.17157C14.1046 8.44772 13.1046 8 12 8C10.8954 8 9.89543 8.44772 9.17157 9.17157M14.8284 9.17157C14.9324 9.27552 15.0306 9.38517 15.1227 9.5C15.6716 10.1848 16 11.0541 16 12C16 13.1046 15.5523 14.1046 14.8284 14.8284M9.17157 9.17157C8.44772 9.89543 8 10.8954 8 12C8 13.1046 8.44772 14.1046 9.17157 14.8284M9.17157 14.8284C9.89543 15.5523 10.8954 16 12 16C13.1046 16 14.1046 15.5523 14.8284 14.8284"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
