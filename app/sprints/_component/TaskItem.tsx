import { Card, CardContent } from '@/components/ui/card';
import { Task } from '../utils';

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Card>
      <CardContent>{task.title}</CardContent>
    </Card>
  );
};

export default TaskItem;
