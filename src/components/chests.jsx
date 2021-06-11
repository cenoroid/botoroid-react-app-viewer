import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";
import { chestClicked } from "../store/auth";
import treasureChest from "./media/treasure.png";

const Chests = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(true);
  const chests = useSelector((state) => state.settings.chests);
  const timeout = useRef();
  const transitionButton = useSpring({
    opacity: show ? 1 : 0,
  });
  const transitionDiv = useSpring({ opacity: show ? 1 : 0 });

  useEffect(() => {
    if (show) {
      props.onChestCollission();
      timeout.current = setTimeout(() => {
        setShow(false);
      }, chests.duration * 1000);
    }
    if (!show && chests) {
      timeout.current = setTimeout(() => {
        setShow(true);
        setDisplay(true);
      }, Math.floor(Math.random() * (chests.max - chests.min) * 60000 + chests.min * 60000));
    }
    // eslint-disable-next-line
  }, [show]);

  useEffect(() => {
    if (!show) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setShow(true);
      }, Math.floor(Math.random() * (chests.max - chests.min) * 60000 + chests.min * 60000));
    }
    // eslint-disable-next-line
  }, [chests]);

  function handleChest() {
    clearTimeout(timeout.current);
    setTimeout(() => {
      setShow(false);
    }, 2000);
    setDisplay(false);
    dispatch(chestClicked());
  }

  return (
    <div>
      {display ? (
        <animated.button
          style={transitionButton}
          className="chestButton"
          onClick={handleChest}
        >
          <img className="chest" alt="its a chest" src={treasureChest}></img>
        </animated.button>
      ) : (
        <animated.div style={transitionDiv}>
          {"+ " +
            chests.reward +
            (chests.reward === 1 ? " cbuck!" : " cbucks!")}
        </animated.div>
      )}
    </div>
  );
};
export default Chests;
