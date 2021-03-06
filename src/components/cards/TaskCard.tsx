import React, { DragEventHandler, FC, useContext, useState } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { KanbanContext } from '../../contexts/KanbanContext';
import { createTaskJsonDto } from '../../util/task';
import NameInput from '../inputs/NameInput';

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
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text', createTaskJsonDto(dataKey, columnKey));
  };

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
        className="bg-white px-2 py-4 font-lg rounded flex items-stretch justify-between gap-4 cursor-pointer shadow transition-all duration-200 ease-in-out transform ring-offset-2 select-none"
        draggable={!taskDetail.locked}
        onDragStart={handleDragStart}
        data-cy="task-card">
        {allowToEdit ? (
          <NameInput
            type="textArea"
            updateValue={updateTask}
            currentValue={taskDetail.value}
            onHide={() => setAllowToEdit(false)}
            name="task"
          />
        ) : (
          <>
            <p
              className="text-base text-gray-700"
              onDoubleClick={(e) => setAllowToEdit(true)}
              data-cy="task-value">
              {taskDetail.value}
            </p>
            <div className="flex items-start gap-4">
              <RiDeleteBin5Line
                onClick={() => removeTask(dataKey, columnKey)}
                className="fill-red-600"
                data-cy="card-remove-button"
              />
              {taskDetail.locked ? (
                <FaLock
                  onClick={() => unlockTask(dataKey)}
                  className="fill-orange-500"
                  data-cy="card-unlock-button"
                />
              ) : (
                <FaLockOpen
                  onClick={() => lockTask(dataKey)}
                  className="fill-blue-600"
                  data-cy="card-lock-button"
                />
              )}
              <MdModeEditOutline onClick={enableEditing} data-cy="card-rename-button" />
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default TaskCard;
