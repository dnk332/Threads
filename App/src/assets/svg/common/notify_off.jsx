import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';

const SvgComponent = ({size = 25, color = colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 26"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      d="M15.9062 8.83125V10.5047C15.9062 11.6228 16.1186 12.7288 16.5303 13.7532L17.1855 15.384C17.5106 16.1934 16.9661 17.1 16.1547 17.1H8.3125M9.99987 2.4C6.73798 2.4 4.09366 5.27937 4.09366 8.83125V10.5047C4.09366 11.6228 3.8812 12.7288 3.46961 13.7532L2.81437 15.384C2.48919 16.1934 3.03376 17.1 3.84505 17.1H5.5M9.99987 2.4C12.4332 2.4 14.5228 4.00223 15.4274 6.29063M9.99987 2.4V1M19 2.4L1 22M12.25 19.55C12.25 20.9031 11.2426 22 10 22C8.75736 22 7.75 20.9031 7.75 19.55"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
