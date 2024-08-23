import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
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
    <Path
      d="M3 11.5C3 15.6422 6.80558 19 11.5 19C12.8337 19 14.0955 18.7291 15.2188 18.2461L19.4688 19L18.9375 15.1337C19.6145 14.0573 20 12.8184 20 11.5C20 7.35787 16.1944 4 11.5 4C6.80558 4 3 7.35787 3 11.5Z"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
