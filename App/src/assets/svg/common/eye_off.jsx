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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9814 18.9819C19.1533 18.81 19.2498 18.5769 19.2498 18.3338C19.2498 18.0907 19.1533 17.8576 18.9814 17.6857L4.31475 3.01904C4.14186 2.85206 3.91031 2.75966 3.66997 2.76175C3.42962 2.76384 3.19971 2.86025 3.02975 3.0302C2.85979 3.20016 2.76339 3.43007 2.7613 3.67042C2.75921 3.91077 2.8516 4.14232 3.01858 4.3152L4.77125 6.06879C2.55292 7.64362 1.375 9.7932 1.375 11.0005C1.375 13.063 4.8125 17.8755 11 17.8755C12.7563 17.8755 14.2908 17.4877 15.5888 16.8855L17.6852 18.9819C17.8571 19.1537 18.0903 19.2503 18.3333 19.2503C18.5764 19.2503 18.8095 19.1537 18.9814 18.9819ZM14.1891 15.4857L12.5629 13.8595C11.8798 14.1821 11.1136 14.2858 10.3693 14.1564C9.62495 14.027 8.93875 13.6709 8.40454 13.1367C7.87032 12.6024 7.51416 11.9163 7.38477 11.1719C7.25538 10.4276 7.35907 9.66145 7.68167 8.97829L6.09033 7.38695C5.73878 7.61868 5.40482 7.87605 5.09117 8.15695C3.92333 9.19829 3.20833 10.466 3.20833 11.0005C3.20833 11.5358 3.92425 12.8026 5.08933 13.8449C6.62842 15.2217 8.6515 16.0421 11 16.0421C12.1458 16.0421 13.2147 15.8469 14.1891 15.4857ZM18.6267 14.7386C19.9384 13.393 20.625 11.9226 20.625 11.0005C20.625 8.93795 17.1875 4.12545 11 4.12545C10.0439 4.12545 9.15292 4.24004 8.33067 4.44262L9.90825 6.01929C10.2639 5.97987 10.6278 5.95879 11 5.95879C13.3485 5.95879 15.3725 6.7792 16.9107 8.15604C18.0748 9.19829 18.7917 10.466 18.7917 11.0005C18.7917 11.468 18.2453 12.4946 17.3296 13.4415L18.6267 14.7386Z"
      fill={color}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
