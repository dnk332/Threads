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
      d="M4 13C4 16.866 7.80558 20 12.5 20C13.8337 20 15.0955 19.7471 16.2188 19.2963L20.4688 20L19.9375 16.3915C20.6145 15.3868 21 14.2305 21 13C21 9.13401 17.1944 6 12.5 6C7.80558 6 4 9.13401 4 13Z"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
