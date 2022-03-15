import React, { createContext, FC, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { createCard, removeTasksById } from '../util/task';
import { nanoid } from 'nanoid';
import { createColumn } from '../util/column';

export interface IKanbanData {
  columns: {
    [id: string]: Column;
  };
  tasks: {
    [id: string]: Task;
  };
}

export interface IkanbanMethods {
  getTasksById: (key: string) => Task;
  getColumnById: (key: string) => Column;
  renameTask: (key: string, newName: string) => void;
  renameColumn: (key: string, newName: string) => void;
  removeColumn: (columnKey: string) => void;
  removeTask: (taskKey: string, columnKey: string) => void;
  moveTask: (key: string, from: string, to: string) => void;
  addTask: (columnKey: string, value: string) => void;
  addColumn: (name: string) => void;
  lockTask: (taskKey: string) => void;
  unlockTask: (taskKey: string) => void;
}

export type Ikanban = IKanbanData & IkanbanMethods;

export type Column = {
  name: string;
  tasks: string[];
};

export type ColumnList = {
  [index: string]: Column;
};

export type TaskList = {
  [index: string]: Task;
};

export type Task = {
  id: string;
  value: string;
  locked: boolean;
};

export const KanbanContext = createContext({} as Ikanban);

const initState: IKanbanData = {
  columns: {
    '123': {
      name: 'Todo',
      tasks: ['xxDEi46n', 'a32h@4C']
    },
    '1234': {
      name: 'In Progress',
      tasks: ['35DFke3']
    },
    '12345': {
      name: 'Done',
      tasks: ['a2h@cW24']
    }
  },
  tasks: {
    'a2h@cW24': {
      id: '1234',
      locked: false,
      value: 'Build Kanban'
    },
    'a32h@4C': {
      id: '1234',
      locked: false,
      value: 'Add Colors 💄'
    },
    '35DFke3': {
      id: '12345',
      locked: false,
      value: 'Add test case'
    },
    xxDEi46n: {
      id: '12345',
      locked: true,
      value: 'Add animation after adding new card'
    }
  }
};

const KanbanContextProvider: FC = ({ children }) => {
  const [kanban, setKanban] = useState<IKanbanData>(initState);

  const getTasksById = (key: string) => {
    const tasks = kanban.tasks[key];
    return tasks;
  };

  const getColumnById = (key: string) => {
    const cols = kanban.columns[key];
    return cols;
  };

  const renameTask = (key: string, newName: string) => {
    const newTasks = cloneDeep(kanban.tasks);
    newTasks[key].value = newName;
    setKanban({ ...kanban, tasks: newTasks });
  };

  const renameColumn = (key: string, newName: string) => {
    const columns = cloneDeep(kanban.columns);
    columns[key].name = newName;
    setKanban({ ...kanban, columns: columns });
  };

  const addTask = (columnKey: string, value: string) => {
    const newCard = createCard(value);
    const taskId = nanoid();
    // create a copy
    const newKanban = cloneDeep(kanban);
    // add task into the task list
    newKanban.tasks[taskId] = newCard;
    // add task id to column
    newKanban.columns[columnKey].tasks.push(taskId);
    // update kanban data
    setKanban(newKanban);
  };

  const addColumn = (name: string) => {
    const newColumn = createColumn(name);
    const newColumnId = nanoid();
    // clone columns
    const newColumns = cloneDeep(kanban.columns);
    // add new column to the copied columns
    newColumns[newColumnId] = newColumn;
    // set copied column to kanban
    setKanban({ ...kanban, columns: newColumns });
  };

  const removeColumn = (columnKey: string) => {
    // clone board
    const newKanban = cloneDeep(kanban);
    //  task associated with the column
    const tasksToBeRemoved = newKanban.columns[columnKey].tasks;
    // delete column
    delete newKanban.columns[columnKey];
    // remove tasks of deleted column
    const remainingTasks = removeTasksById(newKanban.tasks, tasksToBeRemoved);
    // set new data to kanban
    setKanban({ ...newKanban, tasks: remainingTasks });
  };

  const removeTaskFromColumn = (taskKey: string, columnKey: string) => {
    // create a copy of the specific column
    const columns = cloneDeep(kanban.columns);

    const columnToBeUpdated = columns[columnKey];
    // remove task
    const restOfTheTasks = columnToBeUpdated.tasks.filter((task) => task !== taskKey);
    // set rest of the tasks
    columnToBeUpdated.tasks = restOfTheTasks;
    // return the updated column
    return columns;
  };

  const removeTask = (taskKey: string, columnKey: string) => {
    // create a copy
    const allTasks = cloneDeep(kanban.tasks);
    // update colum without the task referrence
    const newColumns = removeTaskFromColumn(taskKey, columnKey);
    // delete from tasklist
    delete allTasks[taskKey];
    // set new data
    setKanban({ ...kanban, tasks: allTasks, columns: newColumns });
  };

  const lockTask = (taskKey: string) => {
    const allTasks = cloneDeep(kanban.tasks);
    allTasks[taskKey].locked = true;
    setKanban({ ...kanban, tasks: allTasks });
  };

  const unlockTask = (taskKey: string) => {
    const allTasks = cloneDeep(kanban.tasks);
    allTasks[taskKey].locked = false;
    setKanban({ ...kanban, tasks: allTasks });
  };

  const moveTask = (key: string, from: string, to: string) => {
    // return if from and destination key is the same
    if (from === to) return;
    // remove task from the previous column
    // it returns a new list of columns
    const columns = removeTaskFromColumn(key, from);
    // add task to the new destination column
    columns[to].tasks.push(key);
    // set new columns data
    setKanban({ ...kanban, columns: columns });
  };

  return (
    <KanbanContext.Provider
      value={{
        ...kanban,
        getTasksById,
        getColumnById,
        renameTask,
        renameColumn,
        removeColumn,
        removeTask,
        moveTask,
        addTask,
        addColumn,
        lockTask,
        unlockTask
      }}>
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanContextProvider;
