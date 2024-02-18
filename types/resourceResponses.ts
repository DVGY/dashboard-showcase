export type Status = 'todo' | 'in progress' | 'complete';

export type BoardSections = {
  [name: string]: SprintItems;
};

type UserDefinedStatus = string;

export interface SprintItem {
  id: string;
  name: string;
  description: string;
  files: any[];
  status: Status | UserDefinedStatus;
  task_type: string;
  create_at: Date;
  complete_at: Date;
  updated_at: null;
  priority: string;
  tags: Tag[];
  users: User[];
  comments: any[];
}

export type SprintItems = SprintItem[];

type Tag = 'Live' | 'Need Help' | 'Rippling';

/* eslint-disable no-unused-vars */
export type TaskOverview = {
  id: number;
  datetime: string;
  ongoing: number;
  finished: number;
};
export type DashboardResponse = {
  taskOverview: TaskOverview[];
};

export enum EPriority {
  Critical,
  High,
  Low,
  Medium,
}

export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Users = User[];

export type Priority = keyof typeof EPriority;

export type Task = {
  id: string;
  subject: string;
  priority: Priority;
  assignees: Users;
};

export type Tasks = Task[];

export type Project = {
  id: string;
  name: string;
  description: string;
  checklist_total: number;
  checklist_complete: number;
  users: Users;
};

export type Activity = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  user: User;
};

export type Activities = Activity[];

export type Projects = Project[];
