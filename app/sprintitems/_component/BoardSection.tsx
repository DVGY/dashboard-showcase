import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';
import { SprintItems } from '@/types/resourceResponses';
import { Box } from '@/components/ui/box';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: SprintItems;
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box className=' bg-slate-100 p-2'>
      <Box className='flex justify-between'>
        <h1 className='text-lg mb-2'>{title}</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost'>
                <PlusCircleIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Sprint Item</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Box>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <Box ref={setNodeRef}>
          {tasks.map((task) => (
            <Box key={task.id} className='mb-2'>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </Box>
          ))}
        </Box>
      </SortableContext>
    </Box>
  );
};

export default BoardSection;
