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

  useEffect(() => {
    const getRedemptions = async () => {
      axios.get(props.API + "/getredemptions").then((res) => {
        setRedemptions(res.data);
      });
    };
    getRedemptions();
  }, [props.API, props.socket]);
  function handleToggle() {
    setShow(!show);
  }
  function handleRedeem(redemption) {
    setNewRedemption(redemption);
  }
  const renderPage = () => {
    if (newRedemption !== null) {
      return (
        <NewRedemption
          onCurrencyUpdate={(value) => props.onCurrencyUpdate(value)}
          socket={props.socket}
          currency={props.currency}
          user={props.user}
          newRedemption={newRedemption}
          onRedeem={handleRedeem}
          API={props.API}
        />
      );
    }
    if (show) {
      //max
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <StoreHeader />
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

  return <div>{renderPage()}</div>;
};
export default StoreContainer;
