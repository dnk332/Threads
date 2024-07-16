import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import {colors} from '@themes/color';

const SvgComponent = ({size = 32, color = colors.white}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      d="M24.6481 7.38466C21.3437 4.71991 17.9649 7.38465 16.7497 8.60955C15.5346 7.38465 12.1558 4.71991 8.85144 7.38466C5.5471 10.0494 4.82895 15.5788 9.459 20.2461C14.0891 24.9134 16.7497 25.7581 16.7497 25.7581C16.7497 25.7581 19.4104 24.9134 24.0405 20.2461C28.6705 15.5788 27.9524 10.0494 24.6481 7.38466Z"
      stroke={color}
      strokeWidth={3}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
