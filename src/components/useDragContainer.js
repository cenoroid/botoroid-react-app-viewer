import { useState, useEffect, useCallback, useRef } from "react";

export const useDragContainer = (initialPos) => {
  const [pos, setPos] = useState({
    translateX: initialPos.x,
    translateY: initialPos.y,
    blockedArea: initialPos.blockedArea,
    container: initialPos.container,
  });
  const [isDragging, setIsDragging] = useState(false);
  const tempX = useRef();
  const tempY = useRef();
  const mouseX = useRef();
  const mouseY = useRef();
  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        e.stopPropagation();
        e.preventDefault();
        let x =
          (100 * (e.pageX - tempX.current)) / e.view.innerWidth +
          pos.translateX;
        let y =
          (100 * (e.pageY - tempY.current)) / e.view.innerHeight +
          pos.translateY;
        if (x === pos.translateX && y === pos.translateY) {
          return;
        }
        if (
          pos.container !== "requests" &&
          x >= pos.blockedArea.requestsStartX - pos.size.width &&
          x <= pos.blockedArea.requestsEndX &&
          y <= pos.blockedArea.requestsEndY &&
          y >= pos.blockedArea.requestsStartY - pos.size.height
        ) {
          if (mouseX.current < pos.blockedArea.requestsStartX) {
            x = pos.blockedArea.requestsStartX - pos.size.width;
          } else if (mouseX.current > pos.blockedArea.requestsEndX) {
            x = pos.blockedArea.requestsEndX;
          } else if (mouseY.current > pos.blockedArea.requestsEndY) {
            y = pos.blockedArea.requestsEndY;
          } else {
            y = pos.blockedArea.requestsStartY - pos.size.height;
          }
        } else if (
          pos.container !== "store" &&
          x >= pos.blockedArea.storeStartX - pos.size.width &&
          x <= pos.blockedArea.storeEndX &&
          y <= pos.blockedArea.storeEndY &&
          y >= pos.blockedArea.storeStartY - pos.size.height
        ) {
          if (mouseX.current < pos.blockedArea.storeStartX) {
            x = pos.blockedArea.storeStartX - pos.size.width;
          } else if (mouseX.current > pos.blockedArea.storeEndX) {
            x = pos.blockedArea.storeEndX;
          } else if (mouseY.current > pos.blockedArea.storeEndY) {
            y = pos.blockedArea.storeEndY;
          } else {
            y = pos.blockedArea.storeStartY - pos.size.height;
          }
        } else if (
          pos.container !== "goals" &&
          x >= pos.blockedArea.goalsStartX - pos.size.width &&
          x <= pos.blockedArea.goalsEndX &&
          y <= pos.blockedArea.goalsEndY &&
          y >= pos.blockedArea.goalsStartY - pos.size.height
        ) {
          if (mouseX.current < pos.blockedArea.goalsStartX) {
            x = pos.blockedArea.goalsStartX - pos.size.width;
          } else if (mouseX.current > pos.blockedArea.goalsEndX) {
            x = pos.blockedArea.goalsEndX;
          } else if (mouseY.current > pos.blockedArea.goalsEndY) {
            y = pos.blockedArea.goalsEndY;
          } else {
            y = pos.blockedArea.goalsStartY - pos.size.height;
          }
        } else {
          mouseX.current = (100 * e.pageX) / e.view.innerWidth;
          mouseY.current = (100 * e.pageY) / e.view.innerHeight;
        }
        setPos((prev) => ({
          ...prev,
          translateX: x,
          translateY: y,
        }));
      }
    },
    // eslint-disable-next-line
    [isDragging]
  );
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    tempX.current = e.pageX;
    tempY.current = e.pageY;
    setIsDragging(true);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  return {
    pos,
    setPos,
    isDragging,
    bind: {
      onMouseUp: (e) => {
        handleMouseUp(e);
      },
      onMouseDown: (e) => {
        handleMouseDown(e);
      },
      onMouseMove: (e) => {
        handleMouseMove(e);
      },
    },
  };
};
