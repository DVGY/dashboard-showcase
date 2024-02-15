import { Box } from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <Box className='Loading flex flex-col items-center gap-4 h-screen py-4 my-auto'>
      <Box className='flex gap-3 w-4/5 justify-between'>
        <Skeleton className='h-8 w-1/6 ' />
        <Skeleton className='h-8 w-1/6 ' />
        <Skeleton className='h-8 w-4/5 ' />
      </Box>

      <Box className='flex gap-3 flex-wrap w-4/5 justify-between'>
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
        <Skeleton className='h-[250px] w-[32.5%]' />
      </Box>
    </Box>
  );
};

export default Loading;
