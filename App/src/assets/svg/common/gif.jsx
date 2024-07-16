import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import {colors} from '@themes/color';

const SvgComponent = ({size = 25, color = colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <G clipPath="url(#clip0_431_441)">
      <Path
        d="M15.5556 2L20 7V20.993C20 21.549 19.6044 22 19.1173 22H4.88267C4.39556 22 4 21.545 4 21.008V2.992C4 2.444 4.39733 2 4.888 2H15.5556ZM14.6667 4H5.77778V20H18.2222V8H14.6667V4ZM12.8889 10V15H12V10H12.8889ZM11.1111 10V11H9.33333C8.84267 11 8.44444 11.448 8.44444 12V13C8.44444 13.552 8.84267 14 9.33333 14H10.2222V13H9.33333V12H11.1111V14C11.1111 14.552 10.7129 15 10.2222 15H9.33333C8.35111 15 7.55556 14.105 7.55556 13V12C7.55556 10.895 8.35111 10 9.33333 10H11.1111ZM16.4444 10V11H14.6667V12H16.4444V13H14.6667V15H13.7778V10H16.4444Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_431_441">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
