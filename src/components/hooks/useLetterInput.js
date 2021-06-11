import { useState } from "react";

export const useLetterInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => {
      setValue("");
    },
    bind: {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    },
  };
};
