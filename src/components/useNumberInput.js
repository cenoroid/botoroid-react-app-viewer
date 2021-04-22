import { useState } from "react";

export const useNumberInput = (initialValue) => {
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
        setValue(Number(e.target.value));
      },
    },
  };
};
