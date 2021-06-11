import React from "react";
import { useDispatch } from "react-redux";
import { addRequest } from "../../store/entities";
import { useLetterInput } from "../hooks/useLetterInput";

const NewRedemption = (props) => {
  const dispatch = useDispatch();
  const { value: message, bind, reset } = useLetterInput("");

  function handleSubmit() {
    console.log("click");
    let data = {
      id: props.newRedemption.id,
      message,
      cost: props.newRedemption.cost,
    };
    dispatch(addRequest(data));
    props.onRedeem(null);
    reset();
  }

  return (
    <div className="newRedemption">
      <div className="newRedemptionHeader">
        <button className="backButton" onClick={() => props.onRedeem(null)}>
          <div className="backButtonText">⇽</div>
        </button>
        <div>{props.newRedemption.type}</div>
      </div>

      <p className="redemptionInfo">{props.newRedemption.info}</p>
      {props.newRedemption.label && (
        <input
          autoComplete="off"
          name="redemptionInput"
          className="redemptionInput"
          type="text"
          placeholder={props.newRedemption.label}
          {...bind}
        />
      )}
      <button className="redemptionButton" onClick={handleSubmit}>
        <p>redeem for {props.newRedemption.cost}</p>
      </button>
    </div>
  );
};

export default NewRedemption;
