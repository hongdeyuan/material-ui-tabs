/// <reference types="react" />
import { ComponentType, ReactNode } from 'react';

export interface TabsTab {
  key: string;
  title: ReactNode;
  children?: ReactNode;
}

type BindParams<T> = { [P in keyof T]?: never } | T;

type Props = {
  tabs: TabsTab[];
  scroll?: boolean;
  activeKey?: string;
  tabWidth?: string;
  isDragTabs?: boolean;
  onChange?: (val: string) => void;
}  & BindParams<{
  showAdd: boolean;
  addTip: string;
  onAdd: () => void;
  onOrder?: (id) => void;
}>;

export type Tabs = ComponentType<Props>;