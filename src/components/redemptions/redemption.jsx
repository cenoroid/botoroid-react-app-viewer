import React from "react";

const Redemption = (props) => {
  return (
    <div>
      <button
        className="redemption"
        onClick={() => props.onRedeem(props.redemption)}
      >
        {props.redemption.type}
      </button>
    </div>
  );
};

export default Redemption;
