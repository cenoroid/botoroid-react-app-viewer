import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";
import { chestClicked } from "../store/actions";
import treasureChest from "./media/treasure.png";

const Chests = ({ chestPos }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(true);
  const chests = useSelector((state) => state.appConfig.settings.chests);
  const timeout = useRef();
  const transitionButton = useSpring({
    opacity: show ? 1 : 0,
  });
  const transitionDiv = useSpring({ opacity: show ? 1 : 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const newPos = useRef();

  useEffect(() => {
    if (show) {
      setPos(newPos.current);
      timeout.current = setTimeout(() => {
        setShow(false);
      }, chests.duration * 1000);
    }
    if (!show && chests) {
      newPos.current = chestPos(chests.width, chests.height);
      timeout.current = setTimeout(() => {
        setShow(true);
        setDisplay(true);
      }, Math.floor(Math.random() * (chests.max - chests.min) * 60000 + chests.min * 60000));
    }
  }, [show, chests, chestPos]);

  function handleChest() {
    if (show) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setShow(false);
      }, 2000);
    }
    setDisplay(false);
    dispatch(chestClicked());
  }

  return (
    <div
      className="chestContainer"
      style={{
        left: pos.x + "vw",
        top: pos.y + "vh",
        height: chests.height + "vh",
        fontSize: chests.height / 2 + "vh",
      }}
    >
      {display ? (
        <animated.button
          style={transitionButton}
          className="chestButton"
          onClick={handleChest}
        >
          <img
            className="chest"
            alt="its a chest"
            src={treasureChest}
            style={{}}
          ></img>
        </animated.button>
      ) : (
        <animated.div style={transitionDiv} className="chestText">
          {"+ " +
            chests.reward +
            (chests.reward === 1 ? " cbuck!" : " cbucks!")}
        </animated.div>
      )}
    </div>
  );
};
export default Chests;
