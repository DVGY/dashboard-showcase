'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { Box } from '../box';
import { cn } from '@/lib/utils';
import { useAppshellContext } from './context';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface IAppshellMainProps {
  className?: string;
  children: ReactNode;
}

export const AppshellMain = ({ children, className }: IAppshellMainProps) => {
  const {
    navbarWidth,
    isnavbarMinimized,
    navbarMinimizedWidth,
    setMainContentHeight,
  } = useAppshellContext();
  const isMobile = useMediaQuery('(max-width: 475px)');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      setMainContentHeight(mainRef?.current?.offsetHeight);
    }
  }, [mainRef.current?.offsetHeight, setMainContentHeight]);

  return (
    <Box
      as='main'
      className={cn('appshell-main ml-[--appshell-navbar-width]', className)}
      id='appshellMain'
      ref={mainRef}
      style={
        {
          '--appshell-navbar-width': isMobile
            ? '0px'
            : isnavbarMinimized
            ? navbarMinimizedWidth.width
            : navbarWidth.width,
        } as React.CSSProperties
      }
    >
      {children}
    </Box>
  );
};
