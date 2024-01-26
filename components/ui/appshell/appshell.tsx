'use client';

import React, { ReactNode, CSSProperties, useState } from 'react';
import { Box } from '../box';
import { AppshellContext } from './context';
import {
  defaultHeaderHeight,
  defaultNavbarMinimizedWidth,
  defaultNavbarWidth,
} from './constant';
import { cn } from '@/lib/utils';

export interface AppshellProps {
  header?: ReactNode;
  navbar?: ReactNode;
  children: ReactNode;
  className?: string;
  headerHeight: Pick<CSSProperties, 'height'>;
  navbarWidth: Pick<CSSProperties, 'width'>;
  navbarMinimizedWidth?: Pick<CSSProperties, 'width'>;
}

const Appshell = ({
  children,
  className,
  headerHeight,
  navbarWidth,
  navbarMinimizedWidth = defaultNavbarMinimizedWidth,
}: AppshellProps) => {
  const [isnavbarMinimized, setIsNavbarMinimized] = useState(true);
  const [navWidth, setNavWidth] = useState(
    () => navbarWidth ?? defaultNavbarWidth
  );
  const [mainContentHeight, setMainContentHeight] = useState(100);

  return (
    <AppshellContext.Provider
      value={{
        headerHeight: headerHeight ?? defaultHeaderHeight,
        navbarWidth: navWidth,
        initialNavbarWidth: navbarWidth ?? defaultNavbarWidth,
        setNavbarWidth: (navbarWidth) => setNavWidth(navbarWidth),
        setIsNavbarMinimized: (value) => setIsNavbarMinimized(value),
        setMainContentHeight: (value) => setMainContentHeight(value),
        navbarMinimizedWidth,
        isnavbarMinimized,
        mainContentHeight,
      }}
    >
      <Box className={cn('appshell-root relative w-full h-screen', className)}>
        {children}
      </Box>
    </AppshellContext.Provider>
  );
};

Appshell.displayname = 'Appshell';

export { Appshell };
