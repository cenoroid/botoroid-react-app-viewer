import React from "react";
import { useSelector } from "react-redux";
import Redemption from "./redemption";

const StoreBody = ({ show, onRedeem }) => {
  const redemptions = useSelector((state) => state.entities.redemptions);

  return show ? (
    <div className="storeBody">
      {redemptions.map((redemption) => (
        <Redemption
          key={redemption.id}
          redemption={redemption}
          onRedeem={onRedeem}
        />
      ))}
    </div>
  ) : null;
};

export default StoreBody;
