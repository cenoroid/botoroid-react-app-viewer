import React, { useState, useEffect } from "react";
import StoreRedemption from "./storeRedemption";
import StoreFooter from "./storeFooter";
import NewRedemption from "./newRedemption";
import ToggleButton from "./toggleButton";
import StoreHeader from "./storeHeader";
import { useDragContainer } from "./useDragContainer";
import axios from "axios";
import _ from "lodash";
const StoreContainer = (props) => {
  const [redemptions, setRedemptions] = useState([]);
  const [show, setShow] = useState(true);
  const [newRedemption, setNewRedemption] = useState(null);

  const {
    pos,

    isDragging,
    bind,

    blockedArea,
    setBlockedArea,
    resetAttached,
    setSize,
    ownBlockedArea,
  } = useDragContainer({
    x: 0,
    y: 3,
    blockedArea: props.blockedArea,
    container: "store",
  });

  useEffect(() => {
    if (
      !_.isEqual(props.blockedArea, blockedArea) &&
      props.blockedArea.hasOwnProperty("requests") &&
      props.blockedArea.hasOwnProperty("goals")
    ) {
      setBlockedArea(props.blockedArea);
    }
    // eslint-disable-next-line
  }, [props.blockedArea]);

  useEffect(() => {
    if (!isDragging) {
      props.onDragging(false);
    }
    if (isDragging) {
      props.onDragging("store");
    }
    // eslint-disable-next-line
  }, [isDragging]);
  useEffect(() => {
    if (props.dragging !== null) {
      resetAttached(props.dragging);
    }
    // eslint-disable-next-line
  }, [props.dragging]);

  function handleSize() {
    setSize({
      width:
        (100 * document.getElementById("store").offsetWidth) /
        window.innerWidth,
      height:
        (100 * document.getElementById("store").offsetHeight) /
        window.innerHeight,
    });
  }
  useEffect(() => {
    props.onNewBlockedArea(ownBlockedArea);
    // eslint-disable-next-line
  }, [ownBlockedArea]);
  useEffect(() => {
    axios.get(props.API + "/getredemptions").then((res) => {
      setRedemptions(res.data);
      handleSize();
    });
    // eslint-disable-next-line
  }, []);
  function handleToggle() {
    setShow(!show);
  }
  useEffect(() => {
    handleSize();
    // eslint-disable-next-line
  }, [show]);
  function handleRedeem(redemption) {
    setNewRedemption(redemption);
  }
  const renderPage = () => {
    if (newRedemption !== null) {
      return (
        <div>
          <NewRedemption
            onCurrencyUpdate={(value) => props.onCurrencyUpdate(value)}
            socket={props.socket}
            currency={props.currency}
            user={props.user}
            newRedemption={newRedemption}
            onRedeem={handleRedeem}
            API={props.API}
          />
        </div>
      );
    }
    if (show) {
      //max
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <div {...bind}>
            <StoreHeader />
          </div>
          <div className="storeContainer">
            {redemptions.map((redemption) => (
              <StoreRedemption
                key={redemption.id}
                redemption={redemption}
                onRedeem={handleRedeem}
              />
            ))}
          </div>
          <StoreFooter user={props.user} currency={props.currency} />
        </div>
      );
    } else if (props.hovering) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <StoreHeader />
          <StoreFooter user={props.user} currency={props.currency} />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="container"
      id="store"
      style={{
        marginLeft: pos.translateX + "vw",
        marginTop: pos.translateY + "vh",
      }}
    >
      {renderPage()}
    </div>
  );
};
export default StoreContainer;
