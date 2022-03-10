import React, { DragEventHandler, FC, useContext, useState } from 'react';
import { ITask } from './cards/TaskCard';
import { TaskCard } from './cards';
import { AddCard } from './inputs';
import { KanbanContext } from '../contexts/KanbanContext';
import NameInput from './inputs/NameInput';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

type Props = {
  title: string;
  tasks: ITask[];
  dataKey: string;
};

const Column: FC<Props> = ({ title, tasks, dataKey }) => {
  const { getColumnById, renameColumn } = useContext(KanbanContext);
  const columnData = getColumnById(dataKey);

  const [allowToEdit, setAllowToEdit] = useState(false);

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    console.log('drag entered', ev.dataTransfer.getData('text/plain'));
    ev.currentTarget.classList.add('ring-2');
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    console.log('drag leave', ev.dataTransfer.getData('text/plain'));
    ev.currentTarget.classList.remove('ring-2');
  };

  const handleOnDragOver: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    const dataJSON = ev.dataTransfer.getData('text/plain');
    console.log('dropped with:-------------------- ', dataJSON);
  };

  const handleRenameColumn = (newName: string) => {
    renameColumn(dataKey, newName);
    setAllowToEdit(false);
  };

  const Tasks = columnData.tasks.map((taskId) => <TaskCard key={taskId} dataKey={taskId} />);

  return (
    <div
      className="w-96 min-h-screen lg:w-1/4 p-3 bg-gray-100 rounded ring-offset-2"
      onDragEnter={handleDragEnter}
      onDragOver={handleOnDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      {allowToEdit ? (
        <NameInput
          type="text"
          updateValue={handleRenameColumn}
          currentValue={columnData.name}
          onHide={() => setAllowToEdit(false)}
        />
      ) : (
        <div className="flex items-center justify-between gap-2">
          <h1
            className="text-xl font-semibold py-2 sticky top-0 cursor-pointer flex-1"
            onDoubleClick={() => setAllowToEdit(true)}>
            {columnData.name}
          </h1>
          <AiFillDelete className="cursor-pointer hover:fill-red-500" size={20} />
        </div>
      )}
      <div className="py-3 flex flex-col gap-y-2">{Tasks}</div>
      <AddCard />
    </div>
  );
};

export default Column;
