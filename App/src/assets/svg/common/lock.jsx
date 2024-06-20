import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';
import {memo} from 'react';

const SvgComponent = ({size = 24, color = colors.white}) => (
  <Svg
    width={moderateScale(size)}
    height={moderateScale(size)}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg">
    <Path
      fill-rule="evenodd"
      d="M12,2 C14.6887547,2 16.8818181,4.12230671 16.9953805,6.78311038 L17,7 L17,10 C18.6568542,10 20,11.3431458 20,13 L20,19 C20,20.6568542 18.6568542,22 17,22 L7,22 C5.34314575,22 4,20.6568542 4,19 L4,13 C4,11.3431458 5.34314575,10 7,10 L7,7 C7,4.23857625 9.23857625,2 12,2 Z M17,12 L7,12 C6.44771525,12 6,12.4477153 6,13 L6,19 C6,19.5522847 6.44771525,20 7,20 L17,20 C17.5522847,20 18,19.5522847 18,19 L18,13 C18,12.4477153 17.5522847,12 17,12 Z M12.1762728,4.00509269 L12,4 C10.4023191,4 9.09633912,5.24891996 9.00509269,6.82372721 L9,7 L9,10 L15,10 L15,7 C15,5.40231912 13.75108,4.09633912 12.1762728,4.00509269 L12,4 L12.1762728,4.00509269 Z"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
