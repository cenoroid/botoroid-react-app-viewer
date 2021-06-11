import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../store/entities";
import Request from "./requests/request";
import RequestListHeader from "./requests/requestListHeader";
import RequestListFooter from "./requests/requestListFooter";
import RequestListTimer from "./requests/requestListTimer";
import ToggleButton from "./toggleButton";

const RequestContainer = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(
    useSelector((state) => state.settings.showContainer.requestList)
  );
  const [expand, setExpand] = useState(true);
  const requests = useSelector((state) => state.entities.requests);
  let { hovering } = props;

  useEffect(() => {
    dispatch(getRequests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, expand, hovering, requests]);

  function handleSize() {
    props.onSize({
      width:
        (100 * document.getElementById("requestList").offsetWidth) /
        window.innerWidth,
      height:
        (100 * document.getElementById("requestList").offsetHeight) /
        window.innerHeight,
    });
  }

  function handleToggle() {
    setShow(!show);
  }

  function handleExpand() {
    setExpand(!expand);
  }

  return show ? (
    <div>
      <ToggleButton status={show} onToggle={handleToggle} />
      <div {...props.bind}>
        <RequestListHeader />
      </div>
      <RequestListTimer socket={props.socket} />
      {requests.length !== 0 && (
        <div>
          <Request
            onHover={handleSize}
            key={requests[0].id}
            request={requests[0]}
          />
          {expand && (
            <div className="requestsContainer">
              {requests.slice(1).map((request) => (
                <Request
                  onHover={handleSize}
                  key={request.id}
                  request={request}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <RequestListFooter onExpand={handleExpand} expand={expand} />
    </div>
  ) : (
    props.hovering && (
      <div>
        <ToggleButton status={show} onToggle={handleToggle} />
        <div {...props.bind}>
          <RequestListHeader />
        </div>
      </div>
    )
  );
};

export default RequestContainer;
