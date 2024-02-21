import { UserAvatars } from '@/app/dashboard/_component/UserAvatars';
import { Projects } from '@/types/resourceResponses';
import { Badge } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Loader from '@/components/ui/loader';
import { Progress } from '@/components/ui/progress';
import { ClipboardCheckIcon, MoreHorizontal, Trash2Icon } from 'lucide-react';
import { useDeleteProject } from '../_hooks/useDeleteProject';

export const ProjectsGridView = ({ projects }: { projects?: Projects }) => {
  const { mutate, isPending } = useDeleteProject();

  return (
    <Box
      className={
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4'
      }
    >
      {projects?.map((project) => {
        let percentageComplete = Math.round(
          (project.checklist_complete / project.checklist_total) * 100
        );
        percentageComplete = isNaN(percentageComplete) ? 0 : percentageComplete;

        return (
          <Card className={`flex flex-col`} key={project.id}>
            <CardHeader className={'flex flex-row justify-between'}>
              {isPending ? <Loader /> : null}

              <Box className=''>
                <CardTitle className=' text-md'>{project.name}</CardTitle>
                <p className='text-slate-500 mt-1'>{project.description}</p>
              </Box>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuItem
                    onClick={() => {
                      mutate(project.id);
                    }}
                    className=' cursor-pointer'
                  >
                    <Trash2Icon />
                    &nbsp; Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className={`flex-auto w-4/5 self-start px-6`}>
              <Box className={`flex flex-col gap-4`}>
                <Box className='flex flex-col items-start'>
                  <Badge className='flex gap-1 py-1' variant={'outline'}>
                    <ClipboardCheckIcon color='rgb(148 163 184)' />
                    <p className='text-slate-500'>
                      {project.checklist_complete +
                        ' / ' +
                        project.checklist_total}
                    </p>
                  </Badge>
                  <Box
                    className={`${'w-full basis-3/5'} flex items-center  gap-2`}
                  >
                    <Progress
                      className='h-2'
                      indicatorProps={{
                        className: `${
                          percentageComplete >= 50
                            ? 'bg-green-500'
                            : percentageComplete >= 40
                            ? 'bg-yellow-300'
                            : 'bg-orange-500'
                        }`,
                      }}
                      value={percentageComplete}
                    />
                    <p className='text-slate-500'>{percentageComplete}%</p>
                  </Box>
                </Box>
                <UserAvatars users={project.users} />
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
