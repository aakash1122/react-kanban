import React, { FC, useState } from 'react';

type Props = {
  currentValue: string;
  type: 'text' | 'textArea';
  updateValue: (val: string) => void;
  onHide: Function;
};

const NameInput: FC<Props> = ({ currentValue, type, updateValue, onHide }) => {
  const [value, setValue] = useState<string>(currentValue);

  const handleUpdateValue = (value: string) => {
    updateValue(value);
    onHide();
  };

  const styles = `flex-1 border outline-none focus:outline-none focus:ring-2 rounded p-1 focus:ring-blue-700 `;

  if (type === 'text') {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateValue(value)}
        onKeyPress={(e) => e.key === 'Enter' && handleUpdateValue(value)}
        autoFocus
        className={styles}
      />
    );
  }

  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => handleUpdateValue(value)}
      onKeyPress={(e) => e.key === 'Enter' && handleUpdateValue(value)}
      autoFocus
      className={styles}
    />
  );
};

export default NameInput;
