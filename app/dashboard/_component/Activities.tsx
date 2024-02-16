import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timeline } from '@/components/ui/timeline';
import { baseApiURL } from '@/config/envs';
import { Activities } from '@/types/resourceResponses';
import { UserAvatars } from './UserAvatars';

interface UserTimeStampProps {
  username: string;
  timestamp: string;
}

interface ActivityContentProps {
  title: string;
  description: string;
}

const UserTimeStamp = ({ username, timestamp }: UserTimeStampProps) => {
  return (
    <Box className='flex flex-col '>
      <h6 className='font-semibold text-sm'>{username}</h6>
      <p className='text-slate-500 text-xs'>{timestamp}</p>
    </Box>
  );
};

const ActivityContent = ({ title, description }: ActivityContentProps) => {
  return (
    <Box className='flex flex-col gap-1'>
      <h6 className='text-sm'>{title}</h6>
      <p className='text-slate-500 text-xs max-w-[65%]'>{description}</p>
    </Box>
  );
};

export const Activitiess = async () => {
  const activities = await getActivities();

  return (
    <Card>
      <CardHeader>
        <Box className='flex flex-col gap-6'>
          <Box className='flex justify-between '>
            <CardTitle className='text-xl'>Activities</CardTitle>
            <Box className='flex'>
              <Button className='rounded-none' variant={'outline'}>
                View All
              </Button>
            </Box>
          </Box>
        </Box>
      </CardHeader>
      <CardContent>
        <Box className='flex flex-col gap-6'>
          {activities.map(({ id, title, user, timestamp, description }) => {
            const date = new Date(timestamp);
            const time =
              date.getHours() +
              ':' +
              date.getMinutes() +
              ' ' +
              (date.getHours() < 12 ? 'AM' : 'PM');
            return (
              <Timeline
                key={id}
                items={[
                  {
                    title: (
                      <UserTimeStamp username={user.name} timestamp={time} />
                    ),
                    children: (
                      <ActivityContent
                        title={title}
                        description={description}
                      />
                    ),
                    className: 'border-slate-200',
                    bullet: <UserAvatars users={[user]} />,
                  },
                ]}
                activeItem={2}
                lineSize={2}
              />
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

const getActivities = async () => {
  const res = await fetch(`${baseApiURL}/activities`, {
    next: { revalidate: 10 },
  });
  const activities = await res.json();
  return activities as Activities;
};
