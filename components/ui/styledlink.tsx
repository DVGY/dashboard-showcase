import { cn } from '@/lib/utils';
import { Url } from 'next/dist/shared/lib/router/router';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

interface IStyledLink extends LinkProps {
  children?: ReactNode;
  className?: string;
  href: Url;
}

export const StyledLink = ({ className, children, href }: IStyledLink) => {
  return (
    <Link
      href={href}
      className={cn(
        'px-3 flex items-center rounded-lg hover:bg-slate-100 h-full',
        className
      )}
    >
      {children}
    </Link>
  );
};
