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
      d="M9 0.75C8.40326 0.75 7.83097 0.987053 7.40901 1.40901C6.98705 1.83097 6.75 2.40326 6.75 3V9C6.75 9.59674 6.98705 10.169 7.40901 10.591C7.83097 11.0129 8.40326 11.25 9 11.25C9.59674 11.25 10.169 11.0129 10.591 10.591C11.0129 10.169 11.25 9.59674 11.25 9V3C11.25 2.40326 11.0129 1.83097 10.591 1.40901C10.169 0.987053 9.59674 0.75 9 0.75V0.75Z"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.25 7.5V9C14.25 10.3924 13.6969 11.7277 12.7123 12.7123C11.7277 13.6969 10.3924 14.25 9 14.25C7.60761 14.25 6.27226 13.6969 5.28769 12.7123C4.30312 11.7277 3.75 10.3924 3.75 9V7.5"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 14.25V17.25"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 17.25H12"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
