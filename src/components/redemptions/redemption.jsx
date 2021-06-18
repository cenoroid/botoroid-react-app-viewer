import React from "react";

const Redemption = ({ redemption, onRedeem }) => {
  return (
    <div>
      <button className="redemption" onClick={() => onRedeem(redemption)}>
        {redemption.type}
      </button>
    </div>
  );
};

export default Redemption;
