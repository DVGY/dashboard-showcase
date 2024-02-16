import { Card, CardContent } from '@/components/ui/card';
import { SprintItem } from '@/types/resourceResponses';

type TaskItemProps = {
  task: SprintItem;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Card>
      <CardContent>{task.name}</CardContent>
    </Card>
  );
};

export default TaskItem;
