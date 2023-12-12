import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { ClipboardCheckIcon, MoreHorizontal } from 'lucide-react';

import { Projects } from '../types';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserAvatars } from './UserAvatars';
import { baseApiURL } from '@/config/envs';

export const MyProjects = async () => {
  const projects = await getProjects();

  return (
    <Card>
      <CardHeader>
        <Box className='flex flex-col gap-6'>
          <Box className='flex justify-between '>
            <CardTitle className='text-xl'>Projects</CardTitle>
            <Box className='flex'>
              <Button className='rounded-none' variant={'outline'}>
                View All
              </Button>
            </Box>
          </Box>
        </Box>
      </CardHeader>
      <CardContent className='min-h-[300px] flex flex-col gap-4'>
        {projects.map((project) => {
          const percentageComplete = Math.round(
            (project.checklist_complete / project.checklist_total) * 100
          );

          return (
            <Card className='flex' key={project.id}>
              <CardHeader className='basis-1/4'>
                <CardTitle className=' text-md'>{project.name}</CardTitle>
                <p className='text-slate-500 mt-1'>{project.description}</p>
              </CardHeader>
              <CardContent className='flex-auto p-0 self-center'>
                <Box className='flex items-center gap-4'>
                  <Box className='flex basis-2/4 items-center gap-4'>
                    <Badge className='flex gap-1 py-1' variant={'outline'}>
                      <ClipboardCheckIcon color='rgb(148 163 184)' />
                      <p className='text-slate-500'>
                        {project.checklist_complete +
                          ' / ' +
                          project.checklist_total}
                      </p>
                    </Badge>
                    <Box className='flex items-center basis-3/5 gap-2'>
                      <Progress
                        className='h-2'
                        indicatorProps={{
                          className: `${
                            percentageComplete >= 50
                              ? 'bg-green-500'
                              : percentageComplete >= 40
                              ? 'bg-yellow-300'
                              : 'bg-orange-500'
                          }`,
                        }}
                        value={percentageComplete}
                      />
                      <p className='text-slate-500'>{percentageComplete}%</p>
                    </Box>
                  </Box>
                  <UserAvatars users={project.users} />
                </Box>
              </CardContent>
              <CardFooter>
                <MoreHorizontal className='cursor-pointer' />
              </CardFooter>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

const getProjects = async () => {
  const res = await fetch(`${baseApiURL}/projects`, {
    next: { revalidate: 10 },
  });
  const projects = await res.json();
  return projects as Projects;
};
