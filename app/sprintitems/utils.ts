import { baseApiURL } from '@/config/envs';
import { BoardSections, SprintItems, Status } from '@/types/resourceResponses';

export const BOARD_SECTIONS = {
  todo: 'todo',
  'in progress': 'in progress',
  complete: 'complete',
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
  return container;
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
