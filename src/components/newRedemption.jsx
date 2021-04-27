import React from "react";
import { useLetterInput } from "./useLetterInput";

const NewRedemption = (props) => {
  const { value: userInput, bind, reset } = useLetterInput("");
  function defineText() {
    let label, info;
    let redemptionText = [];
    if (props.newRedemption.type === "game request") {
      label = "which game?";
      info = (
        <p>
          get me to play any game that is free or I already own <br />
          for 30 minutes (or you could gift it)
        </p>
      );
    } else if (props.newRedemption.type === "video request") {
      label = "your link here";
      info = (
        <p>
          I'll watch youtube videos only,aprox 30 minutes, <br />
          ask if video is somewhere else
        </p>
      );
    } else if (props.newRedemption.type === "short video request") {
      label = "your link here";
      info = (
        <p>
          I'll watch youtube videos only,aprox 10 minutes, <br />
          ask if video is somewhere else
        </p>
      );
    }

    redemptionText.push(label, info);

    return redemptionText;
  }

  let redemptionText = defineText();

  function handleSubmit() {
    if (props.currency >= props.newRedemption.cost) {
      props.onCurrencyUpdate(props.newRedemption.cost);
      let data = {
        username: props.user,
        type: "redemption",
        subtype: props.newRedemption.type,
        message: userInput,
        value: props.newRedemption.cost,
      };
      console.log(data);
      props.socket.emit("requestupdate", data);

      props.onRedeem(null);
      reset();
    }
  }

  return (
    <div>
      <button className="backButton" onClick={() => props.onRedeem(null)}>
        <div className="backButtonText">⇽</div>
      </button>

      <div className="redemptionLabel">{redemptionText[0]}</div>
      <input
        autoComplete="off"
        name="redemptionInput"
        className="redemptionInput"
        type="text"
        {...bind}
      />
      <div className="redemptionInfo">{redemptionText[1]}</div>
      <button className="redemptionButton" onClick={handleSubmit}>
        <p>redeem for {props.newRedemption.cost}</p>
      </button>
    </div>
  );
};

export default NewRedemption;
