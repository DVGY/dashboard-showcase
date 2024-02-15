export const BOARD_SECTIONS = {
  todo: 'todo',
  'in progress': 'in progress',
  complete: 'complete',
};

export const initializeBoard = (tasks: Task[]) => {
  const boardSections: BoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      tasks,
      boardSectionKey as Status
    );
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: string
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};

export const getTasksByStatus = (tasks: Task[], status: Status) => {
  return tasks.filter((task) => task.status === status);
};

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id);
};

export type Status = 'todo' | 'in progress' | 'complete';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type BoardSections = {
  [name: string]: Task[];
};

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function uuidv4(length: number) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const INITIAL_TASKS: Task[] = [
  {
    id: uuidv4(5),
    title: 'Title 2',
    description: 'Desc 2',
    status: 'todo',
  },
  {
    id: uuidv4(5),
    title: 'Title 3',
    description: 'Desc 3',
    status: 'in progress',
  },
  {
    id: uuidv4(5),
    title: 'Title 4',
    description: 'Desc 4',
    status: 'complete',
  },
];
