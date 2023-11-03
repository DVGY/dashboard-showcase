'use client';

import React, { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { useAppshellContext } from './context';
import { cn } from '@/lib/utils';

export interface AppshellHeaderProps {
  children?: ReactNode;
  className?: string | undefined;
}

export const AppshellHeader = ({
  children,
  className,
}: AppshellHeaderProps) => {
  const {
    headerHeight: { height },
  } = useAppshellContext();

  return (
    <Box
      as='header'
      className={cn(
        `w-full h-[var(--appshell-header-height)] border-solid border-b border-b-gray-300`,
        className
      )}
      style={
        {
          '--appshell-header-height': height,
        } as React.CSSProperties
      }
    >
      {children}
    </Box>
  );
};

AppshellHeader.displayName = 'AppshellHeader';
