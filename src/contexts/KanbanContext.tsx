import React, { createContext, FC, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

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
  removeColumn: (key: string) => void;
  removeTask: (key: string) => void;
  moveTask: (key: string, from: string, to: string) => void;
}

type Ikanban = IKanbanData & IkanbanMethods;

type Column = {
  name: string;
  tasks: string[];
};

type Task = {
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
      value: 'Homepage'
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

  const removeColumn = () => {};
  const removeTask = () => {};
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
        moveTask
      }}>
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanContextProvider;
