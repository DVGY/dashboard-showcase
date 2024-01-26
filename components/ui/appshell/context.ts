'use client';

import { createContext, useContext } from 'react';
import {
  defaultHeaderHeight,
  defaultNavbarMinimizedWidth,
  defaultNavbarWidth,
} from './constant';
import { Dispatcher } from '@/types';

type TAppShellContextValue = {
  headerHeight: Pick<React.CSSProperties, 'height'>;
  navbarWidth: Pick<React.CSSProperties, 'width'>;
  initialNavbarWidth: Pick<React.CSSProperties, 'width'>;
  navbarMinimizedWidth: Pick<React.CSSProperties, 'width'>;
  setNavbarWidth: Dispatcher<Pick<React.CSSProperties, 'width'>>;
  setIsNavbarMinimized: Dispatcher<boolean>;
  setMainContentHeight: Dispatcher<number>;
  mainContentHeight: number;
  isnavbarMinimized: boolean;
};

export const AppshellContext = createContext<TAppShellContextValue>({
  headerHeight: { height: defaultHeaderHeight.height },
  navbarWidth: { width: defaultNavbarWidth.width },
  navbarMinimizedWidth: { width: defaultNavbarMinimizedWidth.width },
  initialNavbarWidth: { width: defaultNavbarWidth.width },
  setNavbarWidth: () => {},
  setMainContentHeight: () => {},
  setIsNavbarMinimized: () => {},
  mainContentHeight: 100,
  isnavbarMinimized: false,
});

export const useAppshellContext = () => useContext(AppshellContext);
