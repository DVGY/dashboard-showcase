import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Priority, Tasks } from '@/types/resourceResponses';
import { UserAvatars } from './UserAvatars';
import { baseApiURL } from '@/config/envs';

type TPriorityCssClassConfig = {
  // eslint-disable-next-line no-unused-vars
  [key in Priority]: {
    bg: string;
    text: string;
  };
};

const priorityCssClassConfig: TPriorityCssClassConfig = {
  Critical: {
    bg: 'bg-red-100',
    text: 'text-red-500',
  },
  High: {
    bg: 'bg-yellow-100',
    text: 'text-red-500',
  },
  Medium: {
    bg: 'bg-sky-100',
    text: 'text-sky-500',
  },
  Low: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
  },
};

export const MyTasks = async () => {
  const tasks = await getTasks();

  return (
    <Card>
      <CardHeader>
        <Box className='flex flex-col gap-6'>
          <Box className='flex justify-between '>
            <CardTitle className='text-xl'>My Tasks</CardTitle>
            <Box className='flex'>
              <Button className='rounded-none' variant={'outline'}>
                View All
              </Button>
            </Box>
          </Box>
        </Box>
      </CardHeader>
      <CardContent className='min-h-[300px]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignees</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className='text-slate-500 font-semibold'>
                  {task.id}
                </TableCell>
                <TableCell>
                  <p className='text-slate-500 mt-1'>{task.subject}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${priorityCssClassConfig[task.priority].bg} ${
                      priorityCssClassConfig[task.priority].text
                    } py-1 rounded-md`}
                  >
                    {task.priority}
                  </Badge>{' '}
                </TableCell>
                <TableCell className='text-right'>
                  <UserAvatars users={task.assignees} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const getTasks = async () => {
  const res = await fetch(`${baseApiURL}/tasks`, {
    next: { revalidate: 10 },
  });
  const tasks = await res.json();
  return tasks as Tasks;
};
