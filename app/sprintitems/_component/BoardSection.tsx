import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';
import { SprintItem, SprintItems, Tag, Users } from '@/types/resourceResponses';
import { Box } from '@/components/ui/box';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FancyMultiSelect } from '@/components/ui/multiselect';
import { useMutation, useQuery } from '@tanstack/react-query';
import { baseApiURL } from '@/config/envs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { createSprintItem } from '../utils';
import { queryClient } from '@/app/queryClient';
import { LoadingSpinner } from '@/components/ui/spinner';
import { EditSprintItemForm } from './EditSprintItemForm';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: SprintItems;
};

const getUsers = async (user_name?: string) => {
  const endpoint = new URL(`${baseApiURL}/users`);

  if (user_name) {
    endpoint.searchParams.set('name_like', user_name);
  }

  const res = await fetch(endpoint, {
    next: { revalidate: 10 },
  });
  const projects = await res.json();
  return projects as Users;
};

type TEditSprintItemForm = {
  sprintItem: null | SprintItem;
  isOpen: boolean;
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const [sprintItemFormData, setSprintItemFormData] = useState({
    name: '',
    description: '',
    type: '',
    priority: '',
  });
  const [editSprintItemDialog, setEditSprintItemDialog] =
    useState<TEditSprintItemForm>({
      sprintItem: null,
      isOpen: false,
    });
  const [searchText] = useState('');
  const [tags, setTags] = React.useState<
    {
      id: string;
      value: string;
      label: string | React.ReactNode;
    }[]
  >([]);
  const [select, setSelect] = React.useState<
    {
      id: string;
      value: string;
      label: string | React.ReactNode;
    }[]
  >([]);

  const { data: users } = useQuery<Users>({
    queryKey: ['users', searchText],
    queryFn: () => getUsers(searchText),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (sprintItemFormData: Partial<SprintItem>) =>
      createSprintItem(sprintItemFormData),

    onSuccess: () => {
      // const searchText = searchParams.get('name_like');
      // let alphaSort = searchParams.get('_order');
      // if (alphaSort) {
      //   alphaSort = null;
      // }
      queryClient.invalidateQueries({
        queryKey: ['sprintitems'],
      });
    },
  });

  const { name, description, priority, type } = sprintItemFormData;
  const { isOpen, sprintItem } = editSprintItemDialog;

  const handleFormData = (targetName: string, targetValue: unknown) => {
    setSprintItemFormData((prevData) => ({
      ...prevData,
      [targetName]: targetValue,
    }));
  };

  return (
    <Box className=' bg-slate-100 p-2'>
      <Box className='flex justify-between'>
        <h1 className='text-lg font-semibold mb-2'>{title}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PlusCircleIcon color=' rgb(148 163 184)' />
                  </TooltipTrigger>
                  <TooltipContent>New Sprint Item</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create Sprint Item - {title}</DialogTitle>
              <DialogDescription>
                Assigned users will recieve an email
              </DialogDescription>
            </DialogHeader>
            <Box>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                name='name'
                value={name}
                onChange={(e) => handleFormData(e.target.name, e.target.value)}
              />
            </Box>
            <Box>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                placeholder={'Enter Description'}
                id='description'
                name='description'
                value={description}
                onChange={(e) => handleFormData(e.target.name, e.target.value)}
              />
            </Box>
            <Box>
              <Label htmlFor='type'>Type</Label>
              <Select
                name='type'
                value={type}
                onValueChange={(value) => handleFormData('type', value)}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value='Task'>Task</SelectItem>
                    <SelectItem value='Bug'>Bug</SelectItem>
                    <SelectItem value='Feature'>Feature</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
            <Box>
              <Label htmlFor='priority'>Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => handleFormData('priority', value)}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a Priority' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value='Critical'>Critical</SelectItem>
                    <SelectItem value='High'>High</SelectItem>
                    <SelectItem value='Medium'>Medium</SelectItem>
                    <SelectItem value='Low'>Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
            <Box>
              <Label htmlFor='tags'>Tags</Label>
              <FancyMultiSelect
                placeholder='Tags'
                options={[
                  {
                    id: 'Live',
                    value: 'Live',
                    label: 'Live',
                  },
                  {
                    id: 'Help Wanted',
                    value: 'Help Wanted',
                    label: 'Help Wanted',
                  },
                  {
                    id: 'Rippling',
                    value: 'Rippling',
                    label: 'Rippling',
                  },
                ]}
                select={tags}
                onSelect={setTags}
              />
            </Box>
            <Box>
              <Label htmlFor='users'>Assign To</Label>
              <FancyMultiSelect
                placeholder='users'
                options={
                  users?.map(({ id, name, avatar }) => ({
                    id,
                    value: name,
                    label: (
                      <Box className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarImage src={avatar} alt='' />
                        </Avatar>
                        {name}
                      </Box>
                    ),
                    avatar,
                    name,
                  })) as any
                }
                select={select}
                onSelect={setSelect}
              />
            </Box>

            <div className='grid gap-4 py-4'></div>
            <DialogFooter>
              <DialogClose>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    mutate({
                      // @ts-ignore
                      name,
                      description,
                      files: [],
                      status: id,
                      task_type: type,
                      create_at: new Date().toISOString(),
                      complete_at: null,
                      updated_at: null,
                      priority,
                      tags: tags.map((e) => e.id) as Tag[],
                      // @ts-ignore
                      users: select?.map(({ id, name, avatar }) => ({
                        id,
                        name,
                        avatar,
                      })),
                      comments: [],
                    });
                  }}
                  type='submit'
                >
                  {isPending && <LoadingSpinner />}
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Box>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <Box ref={setNodeRef}>
          {tasks.map((task) => (
            <Box
              key={task.id}
              className='mb-2 p-2'
              onClick={() => {
                setEditSprintItemDialog({ sprintItem: task, isOpen: true });
              }}
            >
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </Box>
          ))}
        </Box>
      </SortableContext>
      {isOpen && (
        <EditSprintItemForm
          isOpen={isOpen}
          // @ts-ignore
          data={sprintItem}
          onClose={() =>
            setEditSprintItemDialog({ sprintItem: null, isOpen: false })
          }
        />
      )}
    </Box>
  );
};

export default BoardSection;
