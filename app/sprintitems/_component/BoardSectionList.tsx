import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/loader';
import { FancyMultiSelect } from '@/components/ui/multiselect';
import {
  BoardSections as BoardSectionsType,
  SprintItem,
} from '@/types/resourceResponses';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  findBoardSectionContainer,
  getSprints,
  getTaskById,
  initializeBoard,
} from '../utils';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { PlusCircleIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { baseApiURL } from '@/config/envs';

const Container = Box;

const updateSprintItems = async (data: SprintItem) => {
  const endpoint = new URL(`${baseApiURL}/sprintitems/${data.id}`);

  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const project = await res.json();
  return project as SprintItem;
};

const BoardSectionList = () => {
  const [boardSections, setBoardSections] = useState<BoardSectionsType | null>(
    null
  );
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: sprintItems = [], isLoading } = useQuery({
    queryKey: ['sprintitems'],
    queryFn: async () => {
      const data = await getSprints();
      const initialBoardSections = initializeBoard(data);
      setBoardSections(initialBoardSections);
      return data;
    },
  });

  const updateSprintItem = useMutation({
    mutationFn: (data: SprintItem) => updateSprintItems(data),
  });

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!boardSections) {
      return;
    }

    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      if (!boardSection) {
        return null;
      }

      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!boardSections) {
      return;
    }

    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    const updatedSprintItem = {
      ...boardSections[activeContainer][activeIndex],
    };

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => {
        if (!boardSection) {
          return null;
        }

        return {
          ...boardSection,
          [overContainer]: arrayMove(
            boardSection[overContainer],
            activeIndex,
            overIndex
          ),
        };
      });
    }

    setActiveTaskId(null);
    updateSprintItem.mutate({
      ...updatedSprintItem,
      status: overContainer,
    });
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(sprintItems, activeTaskId) : null;

  if (isLoading || !boardSections) {
    return <Loader />;
  }

  console.log({ boardSections });

  return (
    <Container>
      <Box className='flex gap-6 flex-col mb-4 p-4'>
        <Box className='flex justify-between'>
          <h1 className=' text-lg font-semibold'>RND Team Sprint 2</h1>
          <Box className='flex gap-4 justify-center items-center'>
            <SettingsIcon />
            <Button>
              <PlusCircleIcon /> &nbsp; New Status
            </Button>
          </Box>
        </Box>
        <Box className='flex gap-4 '>
          <Input
            type='text'
            placeholder='Search Sprint Items'
            value={''}
            autoFocus
            className='  md:max-lg:basis-3/5 border-indigo-500 focus-visible:ring-indigo-500'
          />
          <Box className='more-filters flex gap-4'>
            <FancyMultiSelect
              placeholder='Select Type'
              options={[
                { id: 'All', value: 'All', label: 'All' },
                { id: 'Task', value: 'Task', label: 'Task' },
                { id: 'Bug', value: 'Bug', label: 'Bug' },
                { id: 'Feature', value: 'Feature', label: 'Feature' },
              ]}
              // select={[{ id: 'all', value: 'all', label: 'All' }]}
              // onSelect={setSelect}
            />
            <FancyMultiSelect
              placeholder='Select Tags'
              options={[
                { id: 'Live', value: 'Live', label: 'Live' },
                { id: 'Need Help', value: 'Need Help', label: 'Need Help' },
                { id: 'Rippling', value: 'Rippling', label: 'Rippling' },
                { id: 'Feature', value: 'Feature', label: 'Feature' },
              ]}
              // select={select}
              // onSelect={setSelect}
            />
            <FancyMultiSelect
              placeholder='Assigned To'
              options={[
                { id: 'Live', value: 'Live', label: 'Live' },
                { id: 'Need Help', value: 'Need Help', label: 'Need Help' },
                { id: 'Rippling', value: 'Rippling', label: 'Rippling' },
                { id: 'Feature', value: 'Feature', label: 'Feature' },
              ]}
              // select={select}
              // onSelect={setSelect}
            />
          </Box>
        </Box>
        <Separator />
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box className='flex justify-around'>
          {Object.keys(boardSections).map((boardSectionKey) => (
            <Box key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                title={
                  boardSectionKey[0].toUpperCase() +
                  boardSectionKey.substring(1)
                }
                tasks={boardSections[boardSectionKey]}
              />
            </Box>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </Box>
      </DndContext>
    </Container>
  );
};

export default BoardSectionList;
