/**
 * Pluto RenderTabs
 */
import React from 'react';
import { Box, Button, Tab, Tooltip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Icon from '../Icon/index.jsx';
import { tabProps, tabCSS, tabPanelCSS, tabWithWidthCSS } from './lib.js';

export default function RenderTabs(props) {
  const { tabs, value, handleChange, tabPanelProps, tabWidth, showAdd, addTip, onAdd, scroll } =
    props;
  return (
    <TabContext value={value}>
      <Box pl={1} pr={1}>
        <TabList
          scrollButtons={scroll}
          variant={scroll ? 'scrollable' : 'standard'}
          allowScrollButtonsMobile={scroll}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="dTabs"
          sx={{...tabCSS, ...tabWithWidthCSS}}    
        >
          {tabs.map((listTabItem, index) => (
            <Tab
              sx={{ width: tabWidth}}
              key={listTabItem.key}
              value={listTabItem.key}
              label={listTabItem.title}
              {...tabProps(index)}
            />
          ))}
          {showAdd && (
            <Box display="flex" alignItems="center" p={1}>
               <Tooltip
                title={addTip}
                placement="top"
                disableHoverListener={!addTip?.length}
                onClick={onAdd}
              >
                <Button variant="contained" >
                   <Icon name="Plus" size={16} />
                </Button>
              </Tooltip>
            </Box>
          )}
        </TabList>
      </Box>
      {tabs.map((panelTabItem) => (
        <TabPanel
          {...tabPanelProps}
          css={tabPanelCSS}
          key={`tabPanel-${panelTabItem.key}`}
          value={panelTabItem.key}
        >
          {panelTabItem.children}
        </TabPanel>
      ))}
    </TabContext>
  );
}

RenderTabs.propTypes = {
  tabs: React.PropTypes.array.isRequired,
  value: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  tabPanelProps: React.PropTypes.object,
  tabWidth: React.PropTypes.number,
  showAdd: React.PropTypes.bool,
  addTip: React.PropTypes.string,
  onAdd: React.PropTypes.func,
  onOrder: React.PropTypes.func,
  scroll: React.PropTypes.bool,
}
