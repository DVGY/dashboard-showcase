'use client';

import React from 'react';

import { LanguagesIcon, BellIcon, SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Box } from './box';
import barchart from '../../assets/barchart.png';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';
import { AvatarImage, Avatar, AvatarFallback } from './avatar';

export const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export const Header = () => {
  return (
    <Box className='flex items-center justify-between h-full'>
      <Box className='company-logo pl-4 flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={barchart.src} alt='@shadcn' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>

        <span className=' inline text-2xl  font-semibold'>
          Jvnapa Analytics
        </span>
      </Box>
      <Box className='action-center'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <LanguagesIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='flex flex-col flex-nowrap w-min'>
                  <ListItem>English </ListItem>
                  <ListItem>Hindi</ListItem>
                  <ListItem>Espanol</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BellIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <ListItem>English</ListItem>
                </ul>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <ListItem>Spanish</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <SettingsIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <ListItem>English</ListItem>
                </ul>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <ListItem>Spanish</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className='h-full'>
                <Box className='flex gap-4 items-center '>
                  <Avatar>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='@shadcn'
                    />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <Box>
                    <p className='text-xs text-muted-foreground'>
                      Project Manager
                    </p>
                    <span className='text-sm font-medium'>Gaurav Yadav</span>
                  </Box>
                </Box>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <ListItem>English</ListItem>
                </ul>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                  <ListItem>Spanish</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Box>
    </Box>
  );
};
