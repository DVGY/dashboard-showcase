import { Box } from '@/components/ui/box';
import { DashboardResponse } from '@/types/resourceResponses';
import { TaskChart } from './_component/TaskChart';
import { MyTasks } from './_component/MyTasks';
import { MyProjects } from './_component/MyProjects';
import { baseApiURL } from '@/config/envs';
import { CalendarSchedule } from './_component/CalendarSchedule';
import { Activitiess } from './_component/Activities';

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  const dashboardData = await getDashboardOverview();

  return (
    <Box className='dashboard-container pt-0 pb-3 px-4  md:py-6 md:px-8'>
      <Box className='flex flex-col gap-4 '>
        <Box className='welcome-usr-msg'>
          <small className='text-xl font-semibold mb-1'>
            Hello, Gaurav Yadav!
          </small>
          <br />
          <p className='text-slate-500 mt-1 text-sm md:text-base'>
            You have 4 tasks on hand
          </p>
        </Box>

        <Box className='flex flex-col lg:flex-row gap-4'>
          <Box className='flex flex-col flex-auto gap-4'>
            <TaskChart taskOverview={dashboardData.taskOverview} />
            <MyTasks />
            <MyProjects />
          </Box>
          <Box className='flex flex-col gap-4 basis-[min-content]'>
            <CalendarSchedule />
            <Activitiess />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const getDashboardOverview = async () => {
  const res = await fetch(`${baseApiURL}/dashboard`, {
    next: { revalidate: 10 },
  });
  const dashboard = await res.json();

  return dashboard as DashboardResponse;
};
