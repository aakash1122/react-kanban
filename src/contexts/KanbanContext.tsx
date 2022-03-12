import React, { createContext, FC, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { createCard, removeTasksById } from '../util/taks';
import { nanoid } from 'nanoid';
import { createColumn } from '../util/column';

interface IKanbanData {
  columns: {
    [id: string]: Column;
  };
  tasks: {
    [id: string]: Task;
  };
}

interface IkanbanMethods {
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

type Ikanban = IKanbanData & IkanbanMethods;

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
      tasks: ['as', 'ad']
    },
    '1234': {
      name: 'In Progress',
      tasks: ['af']
    },
    '12344': {
      name: 'In Progress',
      tasks: []
    },
    '1232344': {
      name: 'In Progress',
      tasks: []
    },
    '32344': {
      name: 'In Progress',
      tasks: []
    }
  },
  tasks: {
    as: {
      id: '1234',
      locked: false,
      value: 'Build Kanban'
    },
    ad: {
      id: '12345',
      locked: false,
      value: 'Add test case'
    },
    af: {
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

  const removeTask = (taskKey: string, columnKey: string) => {
    // create a copy
    const newKanban = cloneDeep(kanban);

    const column = newKanban.columns[columnKey];
    // delete card from task list
    delete newKanban.tasks[taskKey];

    const restOfTheTasks = column.tasks.filter((task) => task !== taskKey);
    // set rest of the tasks
    column.tasks = restOfTheTasks;
    // set new
    setKanban(newKanban);
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

  const moveTask = () => {};

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
