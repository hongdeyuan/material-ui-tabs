import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, Tab, Tooltip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Icon from '../Icon/index.jsx';

import { reorder, tabCSS, tabListCSS, tabPanelCSS, tabWithWidthCSS, getCursorCSS } from './lib.js';

export default function RenderDraggableTabs(props) {
  const {
    tabs,
    value,
    handleChange,
    tabPanelProps,
    tabWidth,
    showAdd,
    addTip,
    onAdd,
    onOrder,
    scroll,
  } = props;

  const [showIcon, setShowIcon] = useState(false);

  const handleDragEnd = (result) => {
    setShowIcon(false);
    if (!result.destination) return;

    const items = reorder(tabs, result.source.index, result.destination.index);

    onOrder && onOrder(items);
  };

  const handleDragStart = () => {
    setShowIcon(true);
  };

  return (
    <TabContext value={value}>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Box pl={1} pr={1} display="flex">
          <Droppable droppableId="dropTabs" direction="horizontal">
            {(droppableProvided, droppableSnapshot) => (
              <TabList
                ref={droppableProvided.innerRef}
                variant={scroll ? 'scrollable' : 'standard'}
                allowScrollButtonsMobile={scroll}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="pTabs"
                css={tabListCSS}
                sx={{
                  backgroundColor:
                    droppableSnapshot.isDraggingOver || droppableSnapshot.draggingFromThisWith
                      ? '#e3e6f3'
                      : 'inherit',
                }}
                {...droppableProvided.droppableProps}
              >
                {tabs.map((tabItem, index) => (
                  <RenderTab
                    key={index}
                    index={index}
                    value={tabItem.key}
                    label={tabItem.title}
                    tabWidth={tabWidth}
                    showIcon={showIcon}
                  />
                ))}
                <Box sx={{ opacity: 0 }}>{droppableProvided.placeholder}</Box>
              </TabList>
            )}
          </Droppable>
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
      </DragDropContext>
    </TabContext>
  );
}

RenderDraggableTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  tabPanelProps: PropTypes.object,
  tabWidth: PropTypes.number,
  showAdd: PropTypes.bool,
  addTip: PropTypes.string,
  onAdd: PropTypes.func,
  onOrder: PropTypes.func,
  scroll: PropTypes.bool,
}

function RenderTab(props) {
  const { label, tabWidth, value, index, showIcon, ...rest } = props;

  const [hover, setHover] = useState(false);

  return (
    <Draggable key={value} draggableId={value} index={index} isDragDisabled={false}>
      {(draggableProvided, draggableSnapshot) => (
        <Tab
          ref={draggableProvided.innerRef}
          {...rest}
          css={[tabCSS, tabWidth && tabWithWidthCSS]}
          sx={{
            width: tabWidth,
            padding: '0 16px 0 0 !important',
            background: draggableSnapshot.isDragging ? '#eef0f8' : 'none',
          }}
          value={value}
          label={
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" {...draggableProvided.dragHandleProps}>
                <Icon
                  name="Drag"
                  css={getCursorCSS(draggableSnapshot.isDragging || hover || showIcon)}
                  viewSize={16}
                />
              </Box>
              <Box>{label}</Box>
            </Box>
          }
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          data-e2e={`p-draggableTab-${value}`}
          {...draggableProvided.draggableProps}
        />
      )}
    </Draggable>
  );
}

RenderTab.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  tabWidth: PropTypes.string,
  index: PropTypes.number.isRequired,
  showIcon: PropTypes.bool,
}
