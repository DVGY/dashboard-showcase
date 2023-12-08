'use client'; // if you use app dir, don't forget this line

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import dynamic from 'next/dynamic';
import { DashboardResponse, TaskOverview } from '../types';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';

import styles from './taskchart.module.css';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type TaskChartProps = DashboardResponse;

const getTaskSummary = (task: TaskOverview[]) => {
  const taskSummary = {
    total: 0,
    ongoing: 0,
    finished: 0,
  };

  task.forEach(({ ongoing, finished }) => {
    taskSummary.total += ongoing + finished;
    taskSummary.ongoing += ongoing;
    taskSummary.finished += finished;
  });

  return taskSummary;
};

export const TaskChart = ({ taskOverview }: TaskChartProps) => {
  const { ongoing, finished, total } = getTaskSummary(taskOverview);

  return (
    <Card>
      <CardHeader>
        <Box className='flex flex-col gap-6'>
          <Box className='flex justify-between '>
            <CardTitle className='text-xl'>Task Overview</CardTitle>
            <Box className='flex'>
              <Button className='rounded-none	' variant={'outline'}>
                Monthly
              </Button>
              <Button className='rounded-none' variant={'outline'}>
                Weekly
              </Button>
              <Button className='rounded-none' variant={'outline'}>
                Days
              </Button>
            </Box>
          </Box>
          <Box className='flex justify-between '>
            <Box>
              <small className='text-xl font-semibold mb-1'>{total}</small>
              <br />
              <p className='text-slate-500 mt-1'>Total Tasks</p>
            </Box>

            <Box className='flex gap-'>
              <Box className='flex gap-2'>
                <Box>
                  <span
                    className={`${styles['badge-dot']} mt-2 bg-indigo-600`}
                  />
                </Box>
                <Box>
                  <small className='text-xl font-semibold mb-1'>
                    {ongoing}
                  </small>
                  <br />
                  <p className='text-slate-500 mt-1'>Ongoing</p>
                </Box>
              </Box>
              <Box className='flex gap-2'>
                <Box>
                  <span
                    className={`${styles['badge-dot']} mt-2 bg-emerald-500`}
                  />
                </Box>
                <Box>
                  <small className='text-xl font-semibold mb-1'>
                    {finished}
                  </small>
                  <br />
                  <p className='text-slate-500 mt-1'>Finished</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardHeader>
      <CardContent className='min-h-[300px]'>
        <ApexChart
          type='bar'
          options={{
            plotOptions: {
              bar: {
                columnWidth: '50%',
              },
            },
            chart: {
              id: 'taskoverview-chart',
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: taskOverview?.map(({ datetime }) => {
                const date = new Date(datetime);
                return `${
                  date.getDate() +
                  ' ' +
                  date.toLocaleString('default', { month: 'short' })
                }`;
              }),
            },
          }}
          series={[
            {
              name: 'Ongoing',
              data: taskOverview?.map(({ ongoing }) => ongoing),
              color: 'rgba(79,70,229,1)',
            },
            {
              name: 'Finished',
              data: taskOverview?.map(({ finished }) => finished),
              color: 'rgba(16,185,129, 1)',
            },
          ]}
          height={'300'}
          width={'100%'}
        />
      </CardContent>
    </Card>
  );
};
