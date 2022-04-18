/**
 * Tabs lib
 */
import { css } from '@emotion/react';

export function tabProps(index) {
  return {
    id: `pluto-tab-${index}`,
    'aria-controls': `tabPanel-${index}`,
  };
}

export const tabCSS = {
  minWidth: '60px',
  minHeight: '30px',
  padding: '8px 16px 4px 16px',
  lineHeight: '22px',
};

export const tabWithWidthCSS = {
  display: 'inline-block',
  flexDirection: 'unset',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export const tabListCSS = {
  minHeight: '30px',
};

export const tabPanelCSS = {
  padding: '16px 0px 0px',
};

export const getCursorCSS = (isHover) => {
  return css({
    cursor: 'move',
    opacity: isHover ? 1 : 0,
  });
};

export const reorder = (list, sourceIndex, destinationIndex) => {
  const temp = [...list];
  const target = temp[sourceIndex];
  temp.splice(sourceIndex, 1);
  temp.splice(destinationIndex, 0, target);
  return temp;
};
