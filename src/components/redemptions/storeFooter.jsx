import React from "react";
import { useSelector } from "react-redux";

const StoreCurrency = () => {
  const currency = useSelector((state) => state.auth.currency);

  return (
    <div className="storeFooter">
      You have {currency} {currency !== 1 ? " cbucks." : " cbuck."}
    </div>
  );
};

export default StoreCurrency;
