'use client';

import React, { ReactNode } from 'react';
import { Box } from '../box';
import { useAppshellContext } from './context';
import { cn } from '@/lib/utils';

interface IAppshellNavbarProps {
  className?: string;
  children?: ReactNode;
}

export const AppshellNavbar = ({
  children,
  className,
}: IAppshellNavbarProps) => {
  const {
    headerHeight: { height },
    navbarWidth: { width },
  } = useAppshellContext();

  return (
    <Box
      as='nav'
      className={cn(
        `absolute w-[var(--appshell-navbar-width)] top-[var(--appshell-header-height)] h-[calc(100vh-var(--appshell-header-height))] pt-4 border-solid border-r border-b-gray-300`,
        className
      )}
      style={
        {
          '--appshell-header-height': height,
          '--appshell-navbar-width': width,
        } as React.CSSProperties
      }
    >
      {children}
    </Box>
  );
};
