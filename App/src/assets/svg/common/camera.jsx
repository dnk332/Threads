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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 6C16.2425 6 15.5499 5.572 15.2111 4.89443L15.0403 4.55279C14.8709 4.214 14.5247 4 14.1459 4H9.8541C9.47533 4 9.12907 4.214 8.95967 4.55279L8.78885 4.89443C8.45007 5.572 7.75754 6 7 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V7C20 6.44772 19.5523 6 19 6H17ZM17 4L16.8292 3.65836C16.321 2.64201 15.2822 2 14.1459 2H9.8541C8.71779 2 7.679 2.64201 7.17082 3.65836L7 4H5C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H17Z"
      fill={color}
    />
    <Path
      d="M18.5 8.5C18.5 9.05228 18.0523 9.5 17.5 9.5C16.9477 9.5 16.5 9.05228 16.5 8.5C16.5 7.94772 16.9477 7.5 17.5 7.5C18.0523 7.5 18.5 7.94772 18.5 8.5Z"
      fill={color}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
