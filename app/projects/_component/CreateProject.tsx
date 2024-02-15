import { Project, Users } from '@/app/dashboard/types';
import { queryClient } from '@/app/queryClient';
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
import Loader from '@/components/ui/loader';
import { FancyMultiSelect } from '@/components/ui/multiselect';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { baseApiURL } from '@/config/envs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusCircleIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

type ProjectFormData = Partial<
  Pick<
    Project,
    'name' | 'description' | 'users' | 'checklist_complete' | 'checklist_total'
  >
>;

const getUsers = async (user_name: string) => {
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

const createProject = async (data: ProjectFormData) => {
  const endpoint = new URL(`${baseApiURL}/projects`);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const project = await res.json();
  return project as Project;
};

export const CreateProject = () => {
  const [searchText] = useState('');
  const searchParams = useSearchParams();
  const [projectForm, setProjectForm] = useState<ProjectFormData>({
    name: '',
    description: '',
  });

  const [select, setSelect] = React.useState<
    {
      id: string;
      value: string;
      label: string | React.ReactNode;
    }[]
  >([]);

  const { data: users, isLoading } = useQuery<Users>({
    queryKey: ['users', searchText],
    queryFn: () => getUsers(searchText),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (projectFormData: ProjectFormData) =>
      createProject(projectFormData),
    onSuccess: () => {
      const searchText = searchParams.get('name_like');
      let alphaSort = searchParams.get('_order');
      if (alphaSort) {
        alphaSort = null;
      }
      queryClient.invalidateQueries({
        queryKey: ['projects', { searchText, alphaSort }],
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-indigo-100 hover:bg-indigo-200 text-indigo-500 font-semibold w-full md:w-min'>
          <PlusCircleIcon />
          &nbsp; New Project
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add a New Project</DialogTitle>
          <DialogDescription>
            Add a new project and manage it like a pro
          </DialogDescription>
        </DialogHeader>
        <Box className='grid gap-8 py-4'>
          <Box className='grid grid-cols-1 gap-3'>
            <Label htmlFor='name' className='text-left'>
              Name
            </Label>
            <Input
              id='name'
              value={projectForm.name}
              onChange={(e) =>
                setProjectForm((prevVal) => ({
                  ...prevVal,
                  name: e.target.value,
                }))
              }
              className='col-span-3'
            />
          </Box>
          <Box className='grid grid-cols-1 gap-3'>
            <Label htmlFor='description' className='text-left'>
              Description
            </Label>
            <Textarea
              placeholder={projectForm.description}
              id='description'
              onChange={(e) =>
                setProjectForm((prevVal) => ({
                  ...prevVal,
                  description: e.target.value,
                }))
              }
            />
          </Box>
          <Box className='grid grid-cols-1 gap-3'>
            <Label htmlFor='assigness' className='text-left'>
              Assigness
            </Label>
            {isLoading ? (
              <Loader />
            ) : (
              <FancyMultiSelect
                placeholder='Search Users'
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
            )}
          </Box>
        </Box>
        <DialogFooter>
          <DialogClose>
            <Button
              type='submit'
              disabled={isPending}
              onClick={() => {
                mutate({
                  // @ts-ignore
                  users: select?.map(({ id, name, avatar }) => ({
                    id,
                    name,
                    avatar,
                  })),
                  name: projectForm.name,
                  description: projectForm.description,
                  checklist_total: 0,
                  checklist_complete: 0,
                });
              }}
            >
              {isPending && <LoadingSpinner />}
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
