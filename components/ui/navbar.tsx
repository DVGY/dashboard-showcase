'use client';

import React, { useEffect, useState } from 'react';
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  GanttChartSquareIcon,
  UserCircle2Icon,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

import { Box } from './box';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';
import { StyledLink } from './styledlink';
import { useAppshellContext } from './appshell/context';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

export const Navbar = () => {
  const [isnavbarMinimized, setIsNavbarMinimized] = useState(false);
  const { setNavbarWidth, initialNavbarWidth } = useAppshellContext();

  useEffect(() => {
    setNavbarWidth({
      width: isnavbarMinimized ? '4rem' : initialNavbarWidth.width,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isnavbarMinimized]);

  return (
    <Box className={`${isnavbarMinimized ? 'px-0' : 'px-4'}`}>
      <Box className='flex justify-end'>
        <Toggle
          pressed={isnavbarMinimized}
          onClick={() => {
            setIsNavbarMinimized((prevState) => !prevState);
          }}
        >
          {isnavbarMinimized ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
        </Toggle>
      </Box>
      {isnavbarMinimized ? (
        <Box className='flex flex-col justify-center pt-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} className=''>
                <GanttChartSquareIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-56'
              side='right'
              sideOffset={5}
              align='start'
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <StyledLink href={'#'}>Dashboard</StyledLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StyledLink href={'#'}> Project List</StyledLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StyledLink href={'#'}>Scrum Board</StyledLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StyledLink href={'#'}>Issue</StyledLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} className=''>
                <UserCircle2Icon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-56'
              side='right'
              sideOffset={5}
              align='start'
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <StyledLink href={'#'}>Settings</StyledLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StyledLink href={'#'}>Invoice</StyledLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StyledLink href={'#'}>Activity Log</StyledLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </Box>
      ) : (
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline'>
              <Box className='flex gap-4'>
                <GanttChartSquareIcon />
                Project
              </Box>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='w-full flex gap-3 flex-col flex-nowrap '>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Dashboard</StyledLink>
                </Box>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Project List</StyledLink>
                </Box>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Scrum Board</StyledLink>
                </Box>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Issue</StyledLink>
                </Box>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='hover:no-underline'>
              <Box className='flex gap-4'>
                <UserCircle2Icon />
                Account
              </Box>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='w-full flex gap-3 flex-col flex-nowrap '>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Settings</StyledLink>
                </Box>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Invoice</StyledLink>
                </Box>
                <Box className='h-[40px]'>
                  <StyledLink href={'#'}>Activity Log</StyledLink>
                </Box>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  );
};
