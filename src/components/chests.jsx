import React, { useEffect, useState } from "react";
import treasureChest from "./treasure.png";
const Chests = (props) => {
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const [chestPosW, setChestPosW] = useState();
  const [chestPosH, setChestPosH] = useState();
  useEffect(() => {
    setChestPosW(Math.floor(Math.random() * 76));
    setChestPosH(Math.floor(Math.random() * 66) + 10);
    setButtonText(null);
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    if (!show) {
      setTimeout(() => {
        setShow(true);
      }, Math.floor(Math.random() * 1200000 + 3000000));
    }
  }, [show]);
  function handleChest() {
    setButtonText(<div>+1 cbuck</div>);
    setTimeout(() => {
      props.onCurrencyUpdate(-1);
      setShow(false);
    }, 2000);
  }
  if (props.showChests) {
    if (show) {
      return (
        <button
          onClick={() => handleChest()}
          style={{
            outline: "none",
            marginLeft: chestPosW + "vw",
            marginTop: chestPosH + "vh",
            border: "none",
            position: "absolute",
            backgroundColor: "Transparent",
          }}
        >
          {buttonText}
          <img
            alt="its a chest"
            style={{
              objectFit: "cover",
              height: 3 + "vw",
              width: 3 + "vw",
            }}
            src={treasureChest}
          ></img>
        </button>
      );
    } else return null;
  } else return null;
};
export default Chests;
