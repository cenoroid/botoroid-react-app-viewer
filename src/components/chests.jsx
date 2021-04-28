import React, { useEffect, useState, useRef } from "react";
import { useTransition, animated } from "react-spring";
import treasureChest from "./treasure.png";

const Chests = (props) => {
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState(
    <img
      alt="its a chest"
      style={{
        objectFit: "cover",
        height: 3 + "vw",
        width: 3 + "vw",
      }}
      src={treasureChest}
    ></img>
  );
  //const [chestPosW, setChestPosW] = useState();
  //const [chestPosH, setChestPosH] = useState();
  const chestPosW = useRef(null);
  const chestPosH = useRef(null);
  const transition = useTransition(show, {
    from: {
      opacity: 0,
    },
    enter: {
      marginLeft: chestPosW.current + "vw",
      marginTop: chestPosH.current + "vh",
      opacity: 1,
    },
  });

  useEffect(() => {
    setButtonText(
      <img
        alt="its a chest"
        style={{
          objectFit: "cover",
          height: 3 + "vw",
          width: 3 + "vw",
        }}
        src={treasureChest}
      ></img>
    );
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    if (!show) {
      setTimeout(() => {
        chestPosW.current = Math.floor(Math.random() * 76);
        chestPosH.current = Math.floor(Math.random() * 66) + 10;
        setShow(true);
        console.log(chestPosW.current);
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
    return (
      <div>
        {transition((style, item) =>
          item ? (
            <animated.button
              className="chest"
              onClick={() => handleChest()}
              style={style}
            >
              {buttonText}
            </animated.button>
          ) : (
            <div></div>
          )
        )}
      </div>
    );
  } else return null;
};
export default Chests;
