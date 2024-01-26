'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Box } from '../box';
import { Toggle } from '../toggle';
import { useAppshellContext } from './context';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
    setNavbarWidth,
    initialNavbarWidth,
    navbarMinimizedWidth,
    setIsNavbarMinimized,
    isnavbarMinimized,
  } = useAppshellContext();

  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <>
      <Box
        as='nav'
        className={cn(
          `absolute w-[var(--appshell-navbar-width)] top-[var(--appshell-header-height)] h-[calc(100vh-var(--appshell-header-height))] pt-4 border-solid border-r border-b-gray-300 transition-all duration-100  
                ease-out hidden lg:block`,
          className
        )}
        style={
          {
            '--appshell-header-height': height,
            '--appshell-navbar-width': isnavbarMinimized
              ? navbarMinimizedWidth.width
              : width,
          } as React.CSSProperties
        }
      >
        <Box className='flex justify-end'>
          <Toggle
            pressed={isnavbarMinimized}
            onClick={() => {
              setNavbarWidth({
                width: isnavbarMinimized
                  ? initialNavbarWidth.width
                  : navbarMinimizedWidth.width,
              });
              setIsNavbarMinimized((prevState) => !prevState);
            }}
          >
            {isnavbarMinimized ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
          </Toggle>
        </Box>
        {children}
      </Box>
      <Box className='lg:hidden'>
        <Sheet
          open={isMobile && !isnavbarMinimized}
          onOpenChange={() => setIsNavbarMinimized((prevState) => !prevState)}
        >
          <SheetTrigger></SheetTrigger>
          <SheetContent side={'left'}>{children}</SheetContent>
        </Sheet>
      </Box>
    </>
  );
};
