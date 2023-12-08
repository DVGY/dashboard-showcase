import { Box } from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <Box className='Loading flex flex-col items-center gap-4 h-screen py-4'>
      <Box className='flex w-4/5 justify-between'>
        <Skeleton className='h-[100px] w-[100px] rounded-full' />
        <Skeleton className='h-[100px] w-9/12' />
      </Box>
      <Skeleton className='h-1/3 w-4/5' />
      <Skeleton className='h-1/3 w-4/5' />
    </Box>
  );
};

export default Loading;
