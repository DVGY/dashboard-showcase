import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';
import { Task } from '../utils';
import { Box } from '@/components/ui/box';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box className=' bg-slate-100 p-2'>
      <h1 className='text-lg mb-2'>{title}</h1>
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
