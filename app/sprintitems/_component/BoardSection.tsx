import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';
import { SprintItems, Users } from '@/types/resourceResponses';
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
import { useQuery } from '@tanstack/react-query';
import { baseApiURL } from '@/config/envs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

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

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const [searchText] = useState('');
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
              <DialogDescription>Create new Sprint Item here</DialogDescription>
            </DialogHeader>
            <Box>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' type='text' />
            </Box>
            <Box>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                // placeholder={projectForm.description}
                id='description'
                // onChange={(e) =>
                //   setProjectForm((prevVal) => ({
                //     ...prevVal,
                //     description: e.target.value,
                //   }))
                // }
              />
            </Box>
            <Box>
              <Label htmlFor='type'>Type</Label>
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value='task'>Task</SelectItem>
                    <SelectItem value='bug'>Bug</SelectItem>
                    <SelectItem value='feature'>Feature</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
            <Box>
              <Label htmlFor='priority'>Priority</Label>
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a Priority' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value='critical'>Critical</SelectItem>
                    <SelectItem value='high'>High</SelectItem>
                    <SelectItem value='medium'>Medium</SelectItem>
                    <SelectItem value='low'>Low</SelectItem>
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
              />
            </Box>
            <Box>
              <Label htmlFor='users'>Users</Label>
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
              <Button type='submit'>Save changes</Button>
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
