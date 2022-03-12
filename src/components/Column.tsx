import React, { DragEventHandler, FC, useContext, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { KanbanContext } from '../contexts/KanbanContext';
import { TaskCard } from './cards';
import { AddCard } from './inputs';
import NameInput from './inputs/NameInput';

export type TaskDto = {
  taskKey: string;
  columnKey: string;
};

type Props = {
  dataKey: string;
};

const Column: FC<Props> = ({ dataKey }) => {
  const { getColumnById, renameColumn, removeColumn, moveTask } = useContext(KanbanContext);
  const columnData = getColumnById(dataKey);
  const tasks = columnData.tasks;
  const [allowToEdit, setAllowToEdit] = useState(false);

  const handleOnDragOver: DragEventHandler<HTMLDivElement> = (ev) => {
    // this makes it dropable
    ev.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    const dataJSON: TaskDto = JSON.parse(ev.dataTransfer.getData('text/plain'));
    moveTask(dataJSON.taskKey, dataJSON.columnKey, dataKey);
    ev.currentTarget.classList.remove('ring-2');
  };

  const handleRenameColumn = (newName: string) => {
    renameColumn(dataKey, newName);
    setAllowToEdit(false);
  };

  const Tasks = tasks.map((taskId) => (
    <TaskCard key={taskId} dataKey={taskId} columnKey={dataKey} />
  ));

  return (
    <div
      className="column bg-gray-100 rounded ring-offset-2 flex flex-col overflow-y-auto max-h-full"
      onDragOver={handleOnDragOver}
      onDrop={handleDrop}>
      {allowToEdit ? (
        <NameInput
          type="text"
          updateValue={handleRenameColumn}
          currentValue={columnData.name}
          onHide={() => setAllowToEdit(false)}
        />
      ) : (
        <div className="flex items-center justify-between gap-2 p-3 bg-[#d7d7d769]">
          <h1
            className="text-xl font-semibold py-2 sticky top-0 cursor-pointer flex-1"
            onDoubleClick={() => setAllowToEdit(true)}>
            {columnData.name} <span className="text-sm text-gray-500">({tasks.length})</span>
          </h1>
          <AiFillDelete
            className="cursor-pointer hover:fill-red-500"
            size={20}
            onClick={() => removeColumn(dataKey)}
          />
        </div>
      )}
      <div className="p-3 flex flex-col gap-y-2 flex-1 overflow-y-auto">{Tasks}</div>
      <AddCard columnKey={dataKey} />
    </div>
  );
};

export default Column;
