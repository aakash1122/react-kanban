import React, { useContext, useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import { KanbanContext } from '../../contexts/KanbanContext';
import NameInput from './NameInput';

type Props = {};

const AddColumn = (props: Props) => {
  const { addColumn } = useContext(KanbanContext);
  const [showInput, setShowInput] = useState(false);

  const hideInput = () => {
    setShowInput(false);
  };

  const handleAddColumn = (name: string) => {
    addColumn(name);
    hideInput();
  };

  if (showInput) {
    return (
      <div className="column bg-[#F3F4F6] flex items-center gap-x-2 p-2 cursor-pointer h-max">
        <NameInput
          currentValue=""
          onHide={setShowInput}
          type="text"
          updateValue={handleAddColumn}
          name="column"
        />
      </div>
    );
  }

  return (
    <div
      className="column bg-[#F3F4F6] flex items-center gap-x-2 p-2 cursor-pointer h-max"
      onClick={() => setShowInput(true)}
      data-cy="add-column-button">
      <CgAddR />
      <button className="text-blue-600 font-semibold">Add List</button>
    </div>
  );
};

export default AddColumn;
