import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FancyMultiSelect } from '@/components/ui/multiselect';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { baseApiURL } from '@/config/envs';
import { SprintItem, Tag, Users } from '@/types/resourceResponses';
import { Select } from '@radix-ui/react-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import { updateSprintItem } from '../utils';
import { queryClient } from '@/app/queryClient';

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

const initilasizeTags = (data?: SprintItem) => {
  if (!data || !data.tags) {
    return [];
  }

  return data.tags.map((tag) => ({ id: tag, value: tag, label: tag }));
};

const initializeUsers = (data?: SprintItem) => {
  if (!data || !data.users) {
    return [];
  }

  return data.users.map(({ id, name, avatar }) => ({
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
  })) as any;
};

export const EditSprintItemForm = ({
  isOpen = false,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data?: SprintItem;
}) => {
  const [searchText] = useState('');
  const [sprintItemFormData, setSprintItemFormData] = useState({
    name: data?.name,
    description: data?.description,
    type: data?.task_type,
    priority: data?.priority,
  });

  const [tags, setTags] = React.useState<
    {
      id: string;
      value: string;
      label: string | React.ReactNode;
    }[]
  >(() => initilasizeTags(data));

  const [select, setSelect] = React.useState<
    {
      id: string;
      value: string;
      label: string | React.ReactNode;
    }[]
  >(() => initializeUsers(data));

  const { data: users } = useQuery<Users>({
    queryKey: ['users', searchText],
    queryFn: () => getUsers(searchText),
  });

  const handleFormData = (targetName: string, targetValue: unknown) => {
    setSprintItemFormData((prevData) => ({
      ...prevData,
      [targetName]: targetValue,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<SprintItem>) => updateSprintItem(data),

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <DialogTitle>Edit Sprint Item - {data?.status}</DialogTitle>
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
                <SelectItem value='task'>Task</SelectItem>
                <SelectItem value='bug'>Bug</SelectItem>
                <SelectItem value='feature'>Feature</SelectItem>
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
                  id: data?.id,
                  name,
                  description,
                  files: [],
                  status: data?.status,
                  task_type: type,
                  create_at: data?.create_at,
                  complete_at: null,
                  updated_at: new Date().toISOString(),
                  priority,
                  tags: tags.map((e) => e.id) as Tag[],
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
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
