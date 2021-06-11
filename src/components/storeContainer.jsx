import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRedemptions } from "../store/entities";
import Redemption from "./redemptions/redemption";
import StoreFooter from "./redemptions/storeFooter";
import NewRedemption from "./redemptions/newRedemption";
import ToggleButton from "./toggleButton";
import StoreHeader from "./redemptions/storeHeader";

const StoreContainer = (props) => {
  const dispatch = useDispatch();
  const redemptions = useSelector((state) => state.entities.redemptions);
  const [show, setShow] = useState(
    useSelector((state) => state.settings.showContainer.store)
  );
  const [newRedemption, setNewRedemption] = useState(null);
  let { hovering } = props;

  useEffect(() => {
    dispatch(getRedemptions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, hovering, newRedemption, redemptions]);

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

  function handleToggle() {
    setShow(!show);
  }

  return (
    <div>
      {newRedemption !== null ? (
        <NewRedemption
          newRedemption={newRedemption}
          onRedeem={setNewRedemption}
        />
      ) : show ? (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <div {...props.bind}>
            <StoreHeader />
          </div>
          <div className="redemptionsContainer">
            {redemptions.map((redemption) => (
              <Redemption
                key={redemption.id}
                redemption={redemption}
                onRedeem={setNewRedemption}
              />
            ))}
          </div>
        </div>
      ) : (
        props.hovering && (
          <div>
            <ToggleButton status={show} onToggle={handleToggle} />
            <div {...props.bind}>
              <StoreHeader />
            </div>
          </div>
        )
      )}
      {props.hovering || (show && <StoreFooter />)}
    </div>
  );
};
export default StoreContainer;
