import { UserAvatars } from '@/app/dashboard/_component/UserAvatars';
import { Badge } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SprintItem } from '@/types/resourceResponses';
import { MessageSquareIcon, PaperclipIcon } from 'lucide-react';

type TaskItemProps = {
  task: SprintItem;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const date = new Date(task.create_at);
  const task_createdate = `${
    date.getDate() +
    ' ' +
    date.toLocaleString('default', { month: 'short' }) +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  }`;

  return (
    <Card>
      <CardHeader className='items-start'>
        <Box className='flex justify-around'>
          <Badge variant='outline' className='items-center'>
            <p
              className={`text-2xl ${
                task.task_type === 'feature' ? 'text-sky-500' : ''
              } ${task.task_type === 'task' ? 'text-yellow-500' : ''}  ${
                task.task_type === 'bug' ? 'text-red-500' : ''
              }`}
            >
              &#x2022;&nbsp;
            </p>
            {task.task_type[0].toUpperCase() + task.task_type.substring(1)}
          </Badge>
        </Box>
      </CardHeader>
      <CardContent>
        <Box>
          <p className='font-semibold text-md'>{task.name}</p>
        </Box>
        <Box className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px] text-slate-500 text-sm'>
          {task.description}
        </Box>
        <Box className='mb-4'></Box>
        <Box className='flex justify-between items-center'>
          <UserAvatars users={task.users} avatarClassname='h-8 w-8' />
          <Box className='flex gap-4'>
            <Box className=' flex items-center font-semibold'>
              <MessageSquareIcon
                size={18}
                fontWeight={900}
                color=' rgb(148 163 184)'
              />{' '}
              &nbsp;
              <p className='text-sm font-semibold text-slate-400'>
                {task.comments.length}
              </p>
            </Box>
            <Box className=' flex items-center'>
              <PaperclipIcon
                size={18}
                fontWeight={900}
                color=' rgb(148 163 184)'
              />{' '}
              &nbsp;
              <p className='text-sm font-semibold text-slate-400'>
                {task.files.length}
              </p>
            </Box>
          </Box>
        </Box>
        <Box className='mb-4'></Box>
        <Box>
          <p className='text-slate-400 text-sm'>{task_createdate}</p>
        </Box>
        <Box className='mb-4'></Box>
        <Box className='flex gap-2'>
          {task.tags.map((tag) => (
            <Badge variant={'secondary'} key={tag} className=''>
              # &nbsp;{tag}
            </Badge>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
