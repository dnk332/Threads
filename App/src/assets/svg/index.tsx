import React from 'react';
import {SVG_NAME} from '../svg/svg_list';

interface SVGNameProps {
  title: any;
  isInactive: boolean;
}

function SVGName({title, isInactive = false}: SVGNameProps) {
  let svgName = title.toUpperCase();

  if (!isInactive) {
    svgName = `INACTIVE_${svgName}`;
  }

  let SVGIcon = SVG_NAME[svgName];
  if (SVGIcon) {
    return SVGIcon;
  } else {
    return <></>;
  }
}

export {SVGName};
