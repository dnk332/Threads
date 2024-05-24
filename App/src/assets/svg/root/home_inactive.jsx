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
      d="M26.7633 23.3452V15.3539C26.7633 14.1542 26.2841 13.0029 25.4128 12.1783C24.3913 11.2116 22.9742 9.90754 21.8301 8.9942C19.666 7.26652 18.5859 5.85492 16.0001 5.85492C13.4142 5.85492 12.3341 7.26652 10.17 8.9942C9.0259 9.90754 7.60877 11.2116 6.58735 12.1783C5.716 13.0029 5.23682 14.1542 5.23682 15.3539V23.3452C5.23682 24.8313 6.44153 25.6378 7.92763 25.6378H11.7639C12.3162 25.6378 12.7639 25.19 12.7639 24.6378V20.3006V19.3398C12.7639 17.5289 14.2319 16.0609 16.0428 16.0609C17.8536 16.0609 19.3216 17.5289 19.3216 19.3398V20.3006V24.6378C19.3216 25.19 19.7693 25.6378 20.3216 25.6378H24.0725C25.5586 25.6378 26.7633 24.8313 26.7633 23.3452Z"
      stroke={color}
      strokeWidth={3}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
