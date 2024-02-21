import { baseApiURL } from '@/config/envs';
import {
  BoardSections,
  SprintItem,
  SprintItems,
  Status,
} from '@/types/resourceResponses';

export const BOARD_SECTIONS = {
  Todo: 'Todo',
  'In progress': 'In progress',
  Complete: 'Complete',
};

export const initializeBoard = (sprintItems: SprintItems) => {
  const boardSections: BoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      sprintItems,
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
  return container as Status;
};

export const getTasksByStatus = (sprintItems: SprintItems, status: Status) => {
  return sprintItems.filter((task) => task.status === status);
};

export const getTaskById = (sprintItems: SprintItems, id: string) => {
  return sprintItems.find((task) => task.id === id);
};

export const getSprints = async () => {
  const endpoint = new URL(`${baseApiURL}/sprintitems`);

  const res = await fetch(endpoint, {
    next: {
      revalidate: 10,
    },
  });

  const sprint = await res.json();
  return sprint as SprintItems;
};

export const createSprintItem = async (data: Partial<SprintItem>) => {
  const endpoint = new URL(`${baseApiURL}/sprintitems`);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const sprintItem = await res.json();
  return sprintItem as SprintItem;
};

export const updateSprintItem = async (data: Partial<SprintItem>) => {
  const endpoint = new URL(`${baseApiURL}/sprintitems/${data?.id}`);
  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const sprintItem = await res.json();
  return sprintItem as SprintItem;
};
