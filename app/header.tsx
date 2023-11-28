'use client';

import {
  ActivityIcon,
  BellDot,
  LanguagesIcon,
  LogOutIcon,
  SettingsIcon,
  User,
} from 'lucide-react';
import React from 'react';

import barchart from '@/assets/barchart.png';
import { Box } from '@/components/ui/box';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = () => {
  return (
    <Box className='flex items-center justify-between h-full'>
      <Box className='company-logo pl-2 md:pl-4 flex items-center gap-2'>
        <Avatar className='h-6 md:h-10 w-6 md:w-10 '>
          <AvatarImage src={barchart.src} alt='@shadcn' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>

        <span className='hidden md:inline md:text-xl lg:text-2xl  font-semibold'>
          Jvnapa Analytics
        </span>
      </Box>
      <Box className='action-center flex gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger className='p-2 md:px-4 md:py-px-2'>
            <LanguagesIcon className='h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>English &nbsp; &#10004;</DropdownMenuItem>
              <DropdownMenuItem>Hindi</DropdownMenuItem>
              <DropdownMenuItem>Espanol</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className='p-2 md:px-4 md:py-px-2'>
            <BellDot className='h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[70vw] md:w-[40vw]'>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Box className='notification-messages '>
                  <Box className='flex gap-2 p-1'>
                    <Avatar className='h-10 w-10 '>
                      <AvatarImage
                        src='https://bit.ly/code-beast'
                        alt='user-code'
                      />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <Box className='flex flex-col gap-2'>
                      <p className=''>
                        <strong>Code Beast</strong> invited you to join Elevator
                        Softwares
                      </p>
                      <p className=''>10 minutes ago</p>
                    </Box>
                  </Box>
                  <DropdownMenuSeparator />
                  <Box className='flex gap-2 p-1'>
                    <Avatar className='h-10 w-10 '>
                      <AvatarImage
                        src='https://bit.ly/ryan-florence'
                        alt='user-code'
                      />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <Box className='flex flex-col gap-2'>
                      <p className=''>
                        <strong>Steve Arms</strong> invited you to join
                        Checklist CSG
                      </p>
                      <p className=''>30 minutes ago</p>
                    </Box>
                  </Box>
                </Box>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className='h-full p-2 md:px-4 md:py-px-2'>
            <Box className='flex gap-4 items-center '>
              <Avatar className='h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10'>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <Box className='hidden md:block'>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Project Manager
                </p>
                <span className='text-sm md:text-sm font-medium'>
                  Gaurav Yadav
                </span>
              </Box>
            </Box>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Box className='user-settings flex flex-col gap-3 justify-start'>
                  <Box className='text-md flex gap-2 justify-center items-center self-start'>
                    <User /> Profile
                  </Box>
                  <Box className='text-md flex gap-2 justify-center items-center self-start'>
                    <SettingsIcon /> Account Setting
                  </Box>
                  <Box className='text-md flex gap-2 justify-center items-center self-start'>
                    <ActivityIcon /> Activity Log
                  </Box>
                  <DropdownMenuSeparator />
                  <Box className='text-md flex gap-2 justify-center items-center self-start'>
                    <LogOutIcon /> Logout
                  </Box>
                </Box>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    </Box>
  );
};
