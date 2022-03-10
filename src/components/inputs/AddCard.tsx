import React from 'react';
import { IoMdAdd } from 'react-icons/io';

type Props = {};

const AddCard = (props: Props) => {
  return (
    <div className="flex items-center justify-start gap-2 hover:bg-slate-200 rounded cursor-pointer p-1">
      <IoMdAdd />
      <p>Add a card</p>
    </div>
  );
};

export default AddCard;
