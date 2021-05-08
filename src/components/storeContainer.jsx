import React, { useState, useEffect } from "react";
import StoreRedemption from "./storeRedemption";
import StoreFooter from "./storeFooter";
import NewRedemption from "./newRedemption";
import ToggleButton from "./toggleButton";
import StoreHeader from "./storeHeader";

import axios from "axios";

const StoreContainer = (props) => {
  const [redemptions, setRedemptions] = useState([]);
  const [show, setShow] = useState(true);
  const [newRedemption, setNewRedemption] = useState(null);

  function handleSize() {
    props.onSize({
      width:
        (100 * document.getElementById("store").offsetWidth) /
        window.innerWidth,
      height:
        (100 * document.getElementById("store").offsetHeight) /
        window.innerHeight,
    });
  }

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
          <div {...props.bind}>
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
          <div {...props.bind}>
            <StoreHeader />
          </div>
          <StoreFooter user={props.user} currency={props.currency} />
        </div>
      );
    }
    return null;
  };

  return <div>{renderPage()}</div>;
};
export default StoreContainer;
