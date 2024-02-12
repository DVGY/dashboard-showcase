'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from '../types';
import { Box } from '@/components/ui/box';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipArrow, TooltipPortal } from '@radix-ui/react-tooltip';

export const UserAvatars = ({ users }: { users: Users }) => {
  return (
    <Box className='flex [&>*:not(:first-child)]:ml-[-5%]'>
      {users &&
        users.map((user) => (
          <TooltipProvider key={user.id} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent
                  className='bg-zinc-800 text-zinc-100 border-black	'
                  sideOffset={5}
                >
                  {user.name}
                  <TooltipArrow className='TooltipArrow' />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        ))}
    </Box>
  );
};
