/**
 * Pluto Tabs
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import RenderTabs from './RenderTabs.jsx';
import RenderDraggableTabs from './RenderDraggableTabs.jsx';

const TAB_PANEL_HEIGHT = 'calc(100% - 42px)';

export default function Tabs(props) {
  const {
    tabs,
    onChange,
    activeKey,
    tabWidth,
    showAdd,
    onAdd,
    addTip,
    isDragTabs,
    onOrder,
    scroll,
  } = props;
  const [currentValue, setValue] = React.useState(activeKey || tabs[0].key);

  const handleChange = React.useCallback(
    (_, newValue) => {
      onChange && onChange(newValue);
      setValue(newValue);
    },
    [onChange]
  );

  useEffect(() => {
    if (activeKey) {
      setValue(activeKey);
    }
  }, [activeKey]);

  return isDragTabs ? (
    <RenderDraggableTabs
      tabs={tabs}
      onAdd={onAdd}
      addTip={addTip}
      showAdd={showAdd}
      scroll={scroll}
      tabWidth={tabWidth}
      value={currentValue}
      onOrder={onOrder}
      handleChange={handleChange}
      tabPanelProps={{
        style: {
          height: TAB_PANEL_HEIGHT,
        },
      }}
    />
  ) : (
    <RenderTabs
      tabs={tabs}
      onAdd={onAdd}
      addTip={addTip}
      showAdd={showAdd}
      scroll={scroll}
      tabWidth={tabWidth}
      value={currentValue}
      handleChange={handleChange}
      tabPanelProps={{
        style: {
          height: TAB_PANEL_HEIGHT,
        },
      }}
    />
  );
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  activeKey: PropTypes.string,
  tabWidth: PropTypes.number,
  showAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  addTip: PropTypes.string,
  isDragTabs: PropTypes.bool,
  onOrder: PropTypes.func,
  scroll: PropTypes.bool,
}
