import { nanoid } from 'nanoid';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { Task, TaskList } from '../contexts/KanbanContext';

export const createCard = (value: string): Task => {
  return {
    id: nanoid(),
    locked: false,
    value: value
  };
};

export const removeTasksById = (tasks: TaskList, tasksToBeRemoved: string[]) => {
  // return tasks if there is no task to be removed
  if (isEmpty(tasksToBeRemoved)) return tasks;
  // create a copy of the task list
  let tasksToRemain = cloneDeep(tasks);
  tasksToBeRemoved.forEach((taskId) => {
    delete tasksToRemain[taskId];
  });

  return tasksToRemain;
};
