import React from 'react';
import styled from 'styled-components'

import { Tabs } from './index.js';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: stretch;
  align-items: stretch;
  margin: 0;
  padding: 0%;
  list-style: none;
`

function App() {

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
      <div>
        <div>action test</div>
        <Container>
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
        </Container>
      </div>
    )
}

export default List;