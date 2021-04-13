import { useState } from "react";

export const useNumberInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [
    value,
    (e) => {
      if (!isNaN(e.target.value)) {
        setValue({ ...value, [e.target.name]: Number(e.target.value) });
      }
    },
  ];
};
