'use client';

import { createContext, useContext } from 'react';
import { defaultHeaderHeight, defaultNavbarWidth } from './constant';

type TAppShellContextValue = {
  headerHeight: Pick<React.CSSProperties, 'height'>;
  navbarWidth: Pick<React.CSSProperties, 'width'>;
};

export const AppshellContext = createContext<TAppShellContextValue>({
  headerHeight: { height: defaultHeaderHeight.height },
  navbarWidth: { width: defaultNavbarWidth.width },
});

export const useAppshellContext = () => useContext(AppshellContext);
