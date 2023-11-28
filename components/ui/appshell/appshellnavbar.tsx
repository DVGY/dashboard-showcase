'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Box } from '../box';
import { Toggle } from '../toggle';
import { useAppshellContext } from './context';

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

  const {
    setNavbarWidth,
    initialNavbarWidth,
    setIsNavbarMinimized,
    isnavbarMinimized,
  } = useAppshellContext();

  return (
    <Box
      as='nav'
      className={cn(
        `absolute w-[var(--appshell-navbar-width)] top-[var(--appshell-header-height)] h-[calc(100vh-var(--appshell-header-height))] pt-4 border-solid border-r border-b-gray-300 transition-all duration-100  
                ease-out`,
        className
      )}
      style={
        {
          '--appshell-header-height': height,
          '--appshell-navbar-width': width,
        } as React.CSSProperties
      }
    >
      <Box className='flex justify-end'>
        <Toggle
          pressed={isnavbarMinimized}
          onClick={() => {
            setNavbarWidth({
              width: isnavbarMinimized ? initialNavbarWidth.width : '4rem',
            });
            setIsNavbarMinimized((prevState) => !prevState);
          }}
        >
          {isnavbarMinimized ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
        </Toggle>
      </Box>
      {children}
    </Box>
  );
};
