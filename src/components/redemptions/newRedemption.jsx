import React from "react";
import { useDispatch } from "react-redux";
import { addRequest } from "../../store/actions";
import { useLetterInput } from "../hooks/useLetterInput";

const NewRedemption = ({ newRedemption, onRedeem }) => {
  const dispatch = useDispatch();
  const { value: message, bind, reset } = useLetterInput("");

  function handleSubmit() {
    const data = {
      id: newRedemption.id,
      message,
      cost: newRedemption.cost,
    };
    dispatch(addRequest(data));
    onRedeem(null);
    reset();
  }

  return (
    <div className="newRedemption">
      <div className="newRedemptionHeader">
        <button className="backButton" onClick={() => onRedeem(null)}>
          <div className="backButtonText">⇽</div>
        </button>
        <div>{newRedemption.type}</div>
      </div>

      <p className="redemptionInfo">{newRedemption.info}</p>
      {newRedemption.label && (
        <input
          autoComplete="off"
          name="redemptionInput"
          className="redemptionInput"
          type="text"
          placeholder={newRedemption.label}
          {...bind}
        />
      )}

      <button className="redemptionButton" onClick={handleSubmit}>
        <p>redeem for {newRedemption.cost}</p>
      </button>
    </div>
  );
};

export default NewRedemption;
