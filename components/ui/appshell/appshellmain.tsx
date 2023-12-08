'use client';

import React, { ReactNode } from 'react';
import { Box } from '../box';
import { cn } from '@/lib/utils';
import { useAppshellContext } from './context';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface IAppshellMainProps {
  className?: string;
  children: ReactNode;
}

export const AppshellMain = ({ children, className }: IAppshellMainProps) => {
  const { navbarWidth, isnavbarMinimized, navbarMinimizedWidth } =
    useAppshellContext();
  const isMobile = useMediaQuery('(max-width: 475px)');

  return (
    <Box
      as='main'
      className={cn('appshell-main ml-[--appshell-navbar-width]', className)}
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
