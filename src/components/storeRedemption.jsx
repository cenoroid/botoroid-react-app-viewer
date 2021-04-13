import React from "react";

const StoreRedemption = (props) => {
  return (
    <div>
      <button
        className="redemption"
        onClick={() => props.onRedeem(props.redemption)}
      >
        {props.redemption.type} : {props.redemption.cost}
      </button>
    </div>
  );
};

export default StoreRedemption;
