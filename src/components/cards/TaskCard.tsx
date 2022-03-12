import React, { DragEventHandler, FC, useContext, useState } from 'react';
import { FaLockOpen, FaLock } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';
import { KanbanContext } from '../../contexts/KanbanContext';
import NameInput from '../inputs/NameInput';
import { createTaskJsonDto } from '../../util/taks';

type Props = {
  dataKey: string;
  columnKey: string;
};

export interface ITask {
  id: string;
  value: string;
}

const TaskCard: FC<Props> = ({ dataKey, columnKey }) => {
  const { getTasksById, renameTask, removeTask, lockTask, unlockTask } = useContext(KanbanContext);
  const taskDetail = getTasksById(dataKey);

  const [allowToEdit, setAllowToEdit] = useState(false);

  const handleDragStart: DragEventHandler<HTMLDivElement> = (ev) => {
    console.log('drag start');
    ev.currentTarget.classList.add('ring-2', 'cursor-move');
    console.log(ev.detail);
    // ev.dataTransfer.setData('text/plain', task.id);

    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text', createTaskJsonDto(dataKey, columnKey));
  };
  // const handleDragEnd: DragEventHandler<HTMLDivElement> = (ev) => {
  //   console.log('drag end');
  //   ev.currentTarget.classList.remove('ring-2', 'cursor-move');
  //   ev.dataTransfer.clearData();
  //   console.log(ev.detail);
  // };

  // const handleDrop: DragEventHandler<HTMLDivElement> = (ev) => {
  //   ev.stopPropagation();
  //   console.log('dropped', ev.dataTransfer);
  // };

  const enableEditing = () => {
    setAllowToEdit(true);
  };

  const updateTask = (newValue: string) => {
    renameTask(dataKey, newValue);
    setAllowToEdit(false);
  };

  return (
    <form>
      <div
        className="bg-white px-2 py-4 font-lg rounded flex items-stretch justify-between gap-4 cursor-pointer shadow transition-all duration-200 ease-in-out transform ring-offset-2"
        draggable={!taskDetail.locked}
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        // onDrop={handleDrop}
      >
        {allowToEdit ? (
          <NameInput
            type="textArea"
            updateValue={updateTask}
            currentValue={taskDetail.value}
            onHide={() => setAllowToEdit(false)}
          />
        ) : (
          <p className="text-base text-gray-700" onDoubleClick={(e) => setAllowToEdit(true)}>
            {taskDetail.value}
          </p>
        )}
        <div className="flex items-start gap-4">
          <RiDeleteBin5Line onClick={() => removeTask(dataKey, columnKey)} />
          {taskDetail.locked ? (
            <FaLock onClick={() => unlockTask(dataKey)} />
          ) : (
            <FaLockOpen onClick={() => lockTask(dataKey)} />
          )}
          <MdModeEditOutline onClick={enableEditing} />
        </div>
      </div>
    </form>
  );
};

export default TaskCard;
