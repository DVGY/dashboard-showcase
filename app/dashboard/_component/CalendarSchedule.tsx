import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { ClipboardListIcon, PhoneIcon, VideoIcon } from 'lucide-react';
import { Box } from '@/components/ui/box';

export const CalendarSchedule = () => {
  //   const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardContent>
        <Calendar
          mode='single'
          selected={new Date()}
          //   onSelect={setDate}
          className=' '
        />
        <Separator className='my-4' />
        <h5 className='font-semibold text-lg mb-4 '>Schedule</h5>
        <Box className='schedule-container flex flex-col gap-4 [&>*]:cursor-pointer  '>
          <Box className='flex items-center gap-3 hover:bg-slate-100 p-2'>
            <Box className='p-2 bg-indigo-100  rounded-md'>
              <VideoIcon color='rgba(79,70,229,1)' fill='rgba(79,70,229,1)' />
            </Box>
            <Box className='flex flex-col flex-grow'>
              <h6 className='font-semibold text-sm'>Sprint Planning</h6>
              <p className='text-slate-500'>via Zoom</p>
            </Box>
            <p className='text-slate-500 self-start'>10:00 am</p>
          </Box>
          <Box className='flex items-center gap-3 hover:bg-slate-100 p-2'>
            <Box className='p-2 bg-indigo-100  rounded-md'>
              <VideoIcon color='rgba(79,70,229,1)' fill='rgba(79,70,229,1)' />
            </Box>
            <Box className='flex flex-col flex-grow'>
              <h6 className='font-semibold text-sm'>Design Discussion</h6>
              <p className='text-slate-500'>via Zoom</p>
            </Box>
            <p className='text-slate-500 self-start'>01:00 pm</p>
          </Box>
          <Box className='flex items-center gap-3 hover:bg-slate-100 p-2'>
            <Box className='p-2 bg-yellow-100  rounded-md'>
              <ClipboardListIcon color='#eab308' fill='#fde047' />
            </Box>
            <Box className='flex flex-col flex-grow'>
              <h6 className='font-semibold text-sm'>Create Daily Report</h6>
              <p className='text-slate-500'>via Zoom</p>
            </Box>
            <p className='text-slate-500 self-start'>03:00 pm</p>
          </Box>
          <Box className='flex items-center gap-3 hover:bg-slate-100 p-2'>
            <Box className='p-2 bg-emerald-100  rounded-md'>
              <PhoneIcon color='#10b981' fill='#6ee7b7' />
            </Box>
            <Box className='flex flex-col flex-grow'>
              <h6 className='font-semibold text-sm'>Wrapup Team Call</h6>
              <p className='text-slate-500'>via Zoom</p>
            </Box>
            <p className='text-slate-500 self-start'>06:00 pm</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
