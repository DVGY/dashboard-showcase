'use client';

import { Box } from '@/components/ui/box';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowDownAZIcon,
  ArrowUpZAIcon,
  LayoutGridIcon,
  MenuIcon,
  PlusCircleIcon,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { baseApiURL } from '@/config/envs';
import { useState } from 'react';
import { Projects } from '../dashboard/types';
import { ProjectsGridView } from './_component/ProjectsGridView';
import { ProjectsListView } from './_component/ProjectsListView';
import Loading from './loading';
import { Button } from '@/components/ui/button';

const getProjects = async (project_name: string) => {
  const res = await fetch(`${baseApiURL}/projects?name_like=${project_name}`, {
    next: { revalidate: 10 },
  });
  const projects = await res.json();
  return projects as Projects;
};

export default function Page() {
  const [searchText, setSearchText] = useState('');
  const { data: projects, isLoading } = useQuery<Projects>({
    queryKey: ['projects', searchText],
    queryFn: () => getProjects(searchText),
  });

  const [sort, setSort] = useState<{
    view: 'grid' | 'list';
    alphaSort: 'asc' | 'desc';
  }>({
    view: 'grid',
    alphaSort: 'asc',
  });

  const { view, alphaSort } = sort;

  console.log(view);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className='project-container h-screen flex flex-col gap-4 pt-0 pb-3 px-4  md:py-6 md:px-8'>
      <Box className='flex justify-between'>
        <h1 className='font-bold text-2xl '>Projects</h1>
        <Box>
          <Box className='flex gap-4 justify-center items-center'>
            <Input
              type='text'
              placeholder='Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
              className=' border-indigo-500 focus-visible:ring-indigo-500'
            />
            {sort.view === 'grid' ? (
              <MenuIcon
                onClick={() =>
                  setSort((prevState) => ({
                    ...prevState,
                    view: 'list',
                  }))
                }
                size={50}
              />
            ) : (
              <LayoutGridIcon
                onClick={() =>
                  setSort((prevState) => ({
                    ...prevState,
                    view: 'grid',
                  }))
                }
                size={50}
              />
            )}

            {sort.alphaSort === 'asc' ? (
              <ArrowUpZAIcon
                onClick={() =>
                  setSort((prevState) => ({
                    ...prevState,
                    alphaSort: 'desc',
                  }))
                }
                size={50}
              />
            ) : (
              <ArrowDownAZIcon
                onClick={() =>
                  setSort((prevState) => ({
                    ...prevState,
                    alphaSort: 'asc',
                  }))
                }
                size={50}
              />
            )}
            <Button className='bg-indigo-100 hover:bg-indigo-200 text-indigo-500 font-semibold'>
              <PlusCircleIcon />
              &nbsp; New Project
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        {view === 'grid' ? (
          <ProjectsGridView projects={projects} />
        ) : (
          <ProjectsListView projects={projects} />
        )}
      </Box>
    </Box>
  );
}
