import { UserAvatars } from '@/app/dashboard/_component/UserAvatars';
import { Projects } from '@/app/dashboard/types';
import { Badge } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ClipboardCheckIcon, MoreHorizontal } from 'lucide-react';

export const ProjectsListView = ({ projects }: { projects?: Projects }) => {
  return (
    <Box className='grid grid-cols-1 gap-4'>
      {projects?.map((project) => {
        const percentageComplete = Math.round(
          (project.checklist_complete / project.checklist_total) * 100
        );

        return (
          <Card className='flex flex-col md:flex-row' key={project.id}>
            <CardHeader className='basis-4/12 lg:basis-1/4 '>
              <CardTitle className=' text-md'>{project.name}</CardTitle>
              <p className='text-slate-500 mt-1'>{project.description}</p>
            </CardHeader>
            <CardContent className='flex-auto xs:max-md:w-full px-6 md:p-0 self-start md:self-center'>
              <Box className='flex flex-col  md:flex-row md:items-center gap-4'>
                <Box className='flex flex-col md:basis-[70%] lg:basis-2/4 md:flex-row  items-start md:items-center gap-4'>
                  <Badge className='flex gap-1 py-1' variant={'outline'}>
                    <ClipboardCheckIcon color='rgb(148 163 184)' />
                    <p className='text-slate-500'>
                      {project.checklist_complete +
                        ' / ' +
                        project.checklist_total}
                    </p>
                  </Badge>
                  <Box className='flex items-center xs:max-md:w-full  md:basis-3/5 gap-2'>
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
            <CardFooter className='justify-end'>
              <MoreHorizontal className='cursor-pointer' />
            </CardFooter>
          </Card>
        );
      })}
    </Box>
  );
};
