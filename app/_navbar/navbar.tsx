'use client';

import { GanttChartSquareIcon, UserCircle2Icon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAppshellContext } from '@/components/ui/appshell/context';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StyledLink } from '@/components/ui/styledlink';
import Link from 'next/link';

export const Navbar = () => {
  const { isnavbarMinimized } = useAppshellContext();

  return (
    <Box className={`${isnavbarMinimized ? 'px-0' : 'px-4'}`}>
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
                  <StyledLink href={'/dashboard'}>Dashboard</StyledLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StyledLink href={'/projects'}>Project List</StyledLink>
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
                  <StyledLink href={'/dashboard'}>Dashboard</StyledLink>
                </Box>
                <Box className='h-[40px]'>
                  <StyledLink href={'/projects'}>Project List</StyledLink>
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
