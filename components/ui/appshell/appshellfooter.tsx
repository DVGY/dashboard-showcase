'use client';

import React, { ReactNode } from 'react';
import { Box } from '../box';
import { cn } from '@/lib/utils';
import { useAppshellContext } from './context';

interface IAppshellFooterProps {
  className?: string;
  children?: ReactNode;
}

export const AppshellFooter = ({
  className,
  children,
}: IAppshellFooterProps) => {
  const { headerHeight, mainContentHeight } = useAppshellContext();

  return (
    <Box
      as='footer'
      className={cn(
        'appshell-footer mt-[calc(100vh-var(--appshell-header-height)+var(--appshell-main-height))]',
        className
      )}
      style={
        {
          '--appshell-header-height': headerHeight.height,
          '--appshell-main-height': mainContentHeight,
        } as React.CSSProperties
      }
    >
      {children}
    </Box>
  );
};
