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

const getProjects = async (project_name: string, sortOrder: 'asc' | 'desc') => {
  const endpoint = new URL(`${baseApiURL}/projects`);

  if (project_name) {
    endpoint.searchParams.set('name_like', project_name);
  }
  if (sortOrder) {
    endpoint.searchParams.set('_sort', 'name');
    endpoint.searchParams.set('_order', sortOrder);
  }

  const res = await fetch(endpoint, {
    next: { revalidate: 10 },
  });
  const projects = await res.json();
  return projects as Projects;
};

export default function Page() {
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState<{
    view: 'grid' | 'list';
    alphaSort: 'asc' | 'desc';
  }>({
    view: 'grid',
    alphaSort: 'asc',
  });

  const { view, alphaSort } = sort;

  const { data: projects, isLoading } = useQuery<Projects>({
    queryKey: ['projects', searchText, alphaSort],
    queryFn: () => getProjects(searchText, alphaSort),
  });

  console.log(view);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className='project-container min-h-screen h-max-content flex flex-col gap-4 pt-0 pb-3 px-4  md:py-6 md:px-8'>
      <Box className='flex flex-col lg:flex-row gap-4 justify-between'>
        <h1 className='font-bold text-2xl'>Projects</h1>
        <Box className=''>
          <Box className='flex flex-col md:flex-row gap-2 md:gap-4 justify-center md:justify-between items-center'>
            <Input
              type='text'
              placeholder='Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
              className=' md:max-lg:basis-3/5 border-indigo-500 focus-visible:ring-indigo-500'
            />
            <Box className='hidden md:flex gap-4'>
              {sort.view === 'grid' ? (
                <MenuIcon
                  onClick={() =>
                    setSort((prevState) => ({
                      ...prevState,
                      view: 'list',
                    }))
                  }
                />
              ) : (
                <LayoutGridIcon
                  onClick={() =>
                    setSort((prevState) => ({
                      ...prevState,
                      view: 'grid',
                    }))
                  }
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
                />
              ) : (
                <ArrowDownAZIcon
                  onClick={() =>
                    setSort((prevState) => ({
                      ...prevState,
                      alphaSort: 'asc',
                    }))
                  }
                />
              )}
            </Box>
            <Button className='bg-indigo-100 hover:bg-indigo-200 text-indigo-500 font-semibold w-full md:w-min'>
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
