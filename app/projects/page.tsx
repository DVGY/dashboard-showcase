'use client';

import { Box } from '@/components/ui/box';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowDownAZIcon,
  ArrowUpZAIcon,
  LayoutGridIcon,
  MenuIcon,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { baseApiURL } from '@/config/envs';
import { useEffect, useState } from 'react';
import { Projects } from '@/types/resourceResponses';
import { ProjectsGridView } from './_component/ProjectsGridView';
import { ProjectsListView } from './_component/ProjectsListView';
import Loading from './loading';
import { CreateProject } from './_component/CreateProject';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchText = string | null;
type SortOrder = 'asc' | 'desc' | null;

const getProjects = async (project_name: SearchText, sortOrder: SortOrder) => {
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
  const [searchText, setSearchText] = useState<SearchText>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [sort, setSort] = useState<{
    view: 'grid' | 'list';
    alphaSort: 'asc' | 'desc' | null;
  }>({
    view: 'grid',
    alphaSort: null,
  });

  const { view, alphaSort } = sort;

  const { data: projects, isLoading } = useQuery<Projects>({
    queryKey: ['projects', { searchText, alphaSort }],
    queryFn: () => getProjects(searchText, alphaSort),
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('name_like', searchText as string);
    replace(`${pathname}?${params.toString()}`);
  }, [searchText, pathname, replace, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('_sort', 'name');
    params.set('_order', alphaSort as string);
    replace(`${pathname}?${params.toString()}`);
  }, [alphaSort, pathname, searchParams, replace]);

  const handleSearch = (value: SearchText) => {
    setSearchText(value);
  };

  const handleSort = (value: SortOrder) => {
    setSort((prevState) => ({
      ...prevState,
      alphaSort: value,
    }));
  };

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
              value={searchText || ''}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
              className=' md:max-lg:basis-3/5 border-indigo-500 focus-visible:ring-indigo-500'
            />
            <Box className='hidden md:flex gap-4'>
              {sort.view === 'grid' ? (
                <MenuIcon
                  className='cursor-pointer'
                  onClick={() =>
                    setSort((prevState) => ({
                      ...prevState,
                      view: 'list',
                    }))
                  }
                />
              ) : (
                <LayoutGridIcon
                  className='cursor-pointer'
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
                  className='cursor-pointer'
                  onClick={() => handleSort('desc')}
                />
              ) : (
                <ArrowDownAZIcon
                  className='cursor-pointer'
                  onClick={() => handleSort('asc')}
                />
              )}
            </Box>
            <CreateProject />
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
