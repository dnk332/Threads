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
    <Path
      fill={color}
      fillRule="evenodd"
      d="M8.892 3.919c-1.076 0-2.243 1.116-2.243 2.892 0 1.775 1.167 2.892 2.243 2.892 1.076 0 2.243-1.117 2.243-2.892 0-1.776-1.167-2.892-2.243-2.892zM4.65 6.811c0-2.523 1.737-4.892 4.243-4.892 2.507 0 4.243 2.369 4.243 4.892s-1.736 4.892-4.243 4.892c-2.506 0-4.243-2.369-4.243-4.892zm-1.656 8.283c.775-.93 1.87-1.5 3.061-1.5h5.676c1.19 0 2.286.57 3.061 1.5.772.926 1.182 2.148 1.182 3.393v1.946a1 1 0 01-2 0v-1.947c0-.82-.273-1.577-.718-2.111-.44-.53-.995-.78-1.525-.78H6.054c-.53 0-1.084.25-1.525.78-.445.534-.718 1.291-.718 2.111v1.947a1 1 0 01-2 0v-1.947c0-1.244.41-2.466 1.182-3.392zm12.791-5.391a1 1 0 100 2h4.865a1 1 0 100-2h-4.865z"
      clipRule="evenodd"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
