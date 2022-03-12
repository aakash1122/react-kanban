import { Column } from '../contexts/KanbanContext';

export const createColumn = (name: string): Column => {
  return {
    name: name,
    tasks: []
  };
};
