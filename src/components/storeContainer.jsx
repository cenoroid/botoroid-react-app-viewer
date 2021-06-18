import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRedemptions } from "../store/actions";
import NewRedemption from "./redemptions/newRedemption";
import StoreHeader from "./redemptions/storeHeader";
import StoreBody from "./redemptions/storeBody";
import StoreFooter from "./redemptions/storeFooter";

const StoreContainer = ({ bind, onSize }) => {
  const dispatch = useDispatch();
  const redemptions = useSelector(({ entities }) => entities.redemptions);
  const hovering = useSelector(({ appConfig }) => appConfig.player.hovering);
  const [show, setShow] = useState(
    useSelector(({ appConfig }) => appConfig.settings.showContainer.store)
  );
  const [newRedemption, setNewRedemption] = useState(null);

  useEffect(() => {
    dispatch(getRedemptions());
  }, [dispatch]);

  useEffect(() => {
    onSize("store");
  }, [show, hovering, newRedemption, redemptions, onSize]);

  return newRedemption !== null ? (
    <NewRedemption newRedemption={newRedemption} onRedeem={setNewRedemption} />
  ) : show || hovering ? (
    <Fragment>
      <StoreHeader show={show} onToggle={() => setShow(!show)} bind={bind} />
      <StoreBody show={show} onRedeem={setNewRedemption} />
      <StoreFooter />
    </Fragment>
  ) : null;
};
export default StoreContainer;
