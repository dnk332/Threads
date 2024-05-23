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
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.4999 4.96677C15.7806 2.79129 12.9999 4.96677 11.9999 5.96677C10.9999 4.96677 8.2193 2.79129 5.49996 4.96677C2.78062 7.14226 2.18961 11.6564 5.99996 15.4667C9.81031 19.2771 11.9999 19.9667 11.9999 19.9667C11.9999 19.9667 14.1896 19.2771 17.9999 15.4667C21.8103 11.6564 21.2193 7.14226 18.4999 4.96677Z"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
