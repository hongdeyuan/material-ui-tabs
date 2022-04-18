import React from 'react';

import { NAVIGATION } from '~/.storybook/category';

import Tabs from './index';

export default {
  component: Tabs,
  title: `${NAVIGATION}/Tabs`,
};

export const Basic = (args) => {
  const tabs = [
    {
      key: 'tab1',
      title: 'Item One',
      children: <div>Item One</div>,
    },
    {
      key: 'tab2',
      title: 'Item Two',
      children: <div>Item Two</div>,
    },
  ];

  return <Tabs tabs={tabs} />;
};

export const BasicTabsWithActiveKey = (args) => {
  const tabs = [
    {
      key: 'tab1',
      title: 'Item One',
      children: <div>Item One</div>,
    },
    {
      key: 'tab2',
      title: 'Item Two',
      children: <div>Item Two</div>,
    },
  ];

  return <Tabs tabs={tabs} activeKey="tab2" />;
};

export const BasicTabsWithMaxWidth = (args) => {
  const tabs = [
    {
      key: 'tab1',
      title: '我是一个比较长的Tab名字',
      children: <div>Item One</div>,
    },
    {
      key: 'tab2',
      title: '我也是一个比较长的Tab名字',
      children: <div>Item Two</div>,
    },
  ];

  return <Tabs tabs={tabs} tabWidth="100px" />;
};

export const BasicTabsWithScroll = (args) => {
  const tabs = [1, 2, 3, 4, 5, 6, , 7, 8, 9, 10].map((a) => {
    return {
      key: a,
      title: `我也是一个比较长的${a}Tab名字`,
      children: <div>Item {a}</div>,
    };
  });

  return <Tabs tabs={tabs} scroll />;
};

export const BasicTabsWithAddButton = (args) => {
  const curTabs = [
    {
      key: 'tab1',
      title: 'Item One',
      children: <div>Item One</div>,
    },
    {
      key: 'tab2',
      title: 'Item Two',
      children: <div>Item Two</div>,
    },
  ];
  const [tabs, setTabs] = React.useState(curTabs);

  const handleAddTab = () => {
    setTabs((pre) => {
      const index = (pre.length) + 1;
      const newTab = {
        key: `tab-${index}`,
        title: `Item-${index}`,
        children: <div>Item: {index}</div>,
      };
      return [...pre, newTab];
    });
  };

  return <Tabs addTip="添加" onAdd={handleAddTab} showAdd tabs={tabs} activeKey="tab2" />;
};

export const BasicTabsWithDrag = (args) => {
  const curTabs = [
    {
      key: '0',
      title: 'Item-1',
      children: <div>Item 1</div>,
    },
    {
      key: '1',
      title: 'Item-2',
      children: <div>Item Two</div>,
    },
  ];
  const [tabs, setTabs] = React.useState(curTabs);

  const handleAddTab = () => {
    setTabs((pre) => {
      const index = (pre.length) + 1;
      const newTab = {
        key: `${index}`,
        title: `Item-${index}`,
        children: <div>Item: {index}</div>,
      };
      return [...pre, newTab];
    });
  };

  const handleOrder = (data) => {
    setTabs(data);
  };

  return (
    <>
      order: {tabs.map((tab) => tab.key).join(', ')}
      <Tabs
        isDragTabs
        scroll
        addTip="添加"
        onAdd={handleAddTab}
        onOrder={handleOrder}
        showAdd
        tabs={tabs}
      />
    </>
  );
};
