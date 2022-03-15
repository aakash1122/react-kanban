import React, { FC, useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { KanbanContext } from '../../contexts/KanbanContext';

type Props = {
  columnKey: string;
};

const AddCard: FC<Props> = ({ columnKey }) => {
  const { addTask } = useContext(KanbanContext);

  const [showInput, setShowInput] = useState(false);
  const [newCardText, setNewCardText] = useState('');

  const hideAddCardInput = () => {
    setShowInput(false);
    setNewCardText('');
  };

  const handleAddCard = () => {
    // dont add if value is empty
    // hide input
    if (newCardText.length === 0) {
      hideAddCardInput();
      return;
    }
    // add card to list
    addTask(columnKey, newCardText);
    // hide input
    hideAddCardInput();
  };

  if (showInput) {
    return (
      <div className="p-3">
        <textarea
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          onBlur={(e) => handleAddCard()}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCard()}
          rows={4}
          autoFocus
          className="w-full p-2 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
          data-cy="card-name-input"></textarea>
        <div className="flex items-center gap-x-4 py-2">
          <button className="btn-primary" onClick={handleAddCard}>
            Add Card
          </button>
          <AiOutlineClose
            size={20}
            className="fill-red-600 cursor-pointer transform hover:scale-110"
            onClick={hideAddCardInput}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-start gap-2 hover:bg-blue-800 rounded cursor-pointer p-3 bg-blue-600 text-white"
      onClick={() => setShowInput(true)}
      data-cy="add-card-button">
      <IoMdAdd />
      <p>Add a card</p>
    </div>
  );
};

export default AddCard;
