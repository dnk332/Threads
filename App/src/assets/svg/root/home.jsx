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
      d="M27.8738 24.1633V15.3474C27.8738 14.0239 27.3452 12.7538 26.3839 11.8441C25.2571 10.7777 23.6938 9.33905 22.4316 8.33146C20.0442 6.42551 18.8527 4.86826 16 4.86826C13.1473 4.86826 11.9557 6.42551 9.56828 8.33146C8.30616 9.33905 6.74281 10.7777 5.61599 11.8441C4.65473 12.7538 4.1261 14.0239 4.1261 15.3474V24.1633C4.1261 25.8027 5.45513 27.1317 7.09456 27.1317H11.0525C12.1455 27.1317 13.0315 26.2457 13.0315 25.1528V20.8045C13.0315 19.812 13.5275 18.8851 14.3534 18.3346C15.3505 17.6699 16.6495 17.6699 17.6466 18.3346C18.4724 18.8851 18.9684 19.812 18.9684 20.8045V25.1528C18.9684 26.2457 19.8544 27.1317 20.9474 27.1317H24.9054C26.5448 27.1317 27.8738 25.8027 27.8738 24.1633Z"
      fill={color}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
