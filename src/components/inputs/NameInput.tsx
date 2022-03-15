import React, { FC, useState } from 'react';

type Props = {
  currentValue: string;
  type: 'text' | 'textArea';
  updateValue: (val: string) => void;
  onHide: Function;
  name: string;
};

const NameInput: FC<Props> = ({ currentValue, type, updateValue, onHide, name }) => {
  const [value, setValue] = useState<string>(currentValue);

  const handleUpdateValue = (value: string) => {
    if (value.trim().length > 0) {
      updateValue(value);
    }
    onHide();
  };

  const styles = `flex-1 border outline-none focus:outline-none focus:ring-2 rounded p-1 focus:ring-blue-700 `;

  return (
    <div className="w-full flex items-stretch gap-x-3 p-2 bg-[#F3F4F6] rounded">
      {type === 'text' ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => handleUpdateValue(value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdateValue(value)}
          autoFocus
          className={styles}
          data-cy={`${name}-name-input`}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => handleUpdateValue(value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdateValue(value)}
          autoFocus
          className={styles}
          data-cy={`${name}-name-input`}
        />
      )}
      <button
        className={`${value.length ? 'bg-blue-600' : 'bg-gray-300'}  px-4 py-1 text-white rounded`}
        onClick={() => handleUpdateValue(value)}
        data-cy={`${name}-input-submit-button`}>
        Add
      </button>
    </div>
  );
};

export default NameInput;
