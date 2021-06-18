import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../store/actions";
import RequestListHeader from "./requests/requestListHeader";
import RequestListBody from "./requests/requestListBody";
import RequestListFooter from "./requests/requestListFooter";

const RequestContainer = ({ bind, onSize }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(
    useSelector((state) => state.appConfig.settings.showContainer.requestList)
  );
  const hovering = useSelector((state) => state.appConfig.player.hovering);
  const [expand, setExpand] = useState(true);
  const requests = useSelector((state) => state.entities.requests);

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    onSize("requestList");
  }, [show, expand, hovering, requests, onSize]);

  return show || hovering ? (
    <Fragment>
      <RequestListHeader
        show={show}
        onToggle={() => setShow(!show)}
        bind={bind}
      />

      {show && (
        <Fragment>
          <RequestListBody
            requests={requests}
            onHover={() => onSize("requestList")}
            expand={expand}
          />
          <RequestListFooter
            onExpand={() => setExpand(!expand)}
            expand={expand}
          />
        </Fragment>
      )}
    </Fragment>
  ) : null;
};

export default RequestContainer;
