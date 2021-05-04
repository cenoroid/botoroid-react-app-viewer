import { useState, useEffect, useCallback, useRef } from "react";

export const useDragContainer = (initialPos) => {
  const [pos, setPos] = useState({
    translateX: initialPos.x,
    translateY: initialPos.y,
    container: initialPos.container,
  });
  const [blockedArea, setBlockedArea] = useState(initialPos.blockedArea);
  const [isDragging, setIsDragging] = useState(false);

  const tempX = useRef();
  const tempY = useRef();
  const mouseX = useRef();
  const mouseY = useRef();
  const attached = useRef(
    pos.container === "goals"
      ? "requests"
      : pos.container === "requests"
      ? "none"
      : pos.container === "store"
      ? "goals"
      : ""
  );
  function resetAttached(container) {
    if (container === attached.current) {
      attached.current = false;
    }
  }

  function collisionCheck() {
    if (pos.size) {
      if (!attached.current) {
        if (
          blockedArea.requests &&
          pos.translateX > blockedArea.requests.startX - pos.size.width &&
          pos.translateX < blockedArea.requests.endX &&
          pos.translateY <= blockedArea.requests.endY &&
          pos.translateY > blockedArea.requests.startY - pos.size.height
        ) {
          let x = blockedArea.requests.startX;
          let y = blockedArea.requests.endY + 1;
          if (y + pos.size.height >= blockedArea.screen.bottomY) {
            if (x + pos.size.width >= blockedArea.screen.rightX) {
              x = blockedArea.requests.startX - pos.size.width - 1;
              setPos((prev) => ({
                ...prev,
                translateX: x,
                translateY: blockedArea.screen.topY + 1,
              }));
              return {
                y: blockedArea.screen.topY + 1,
                x,
              };
            }
            setPos((prev) => ({
              ...prev,
              translateX: blockedArea.requests.endX + 1,
              translateY: blockedArea.screen.bottomY - pos.size.height - 1,
            }));
            return {
              y: blockedArea.screen.bottomY - pos.size.height - 1,
              x: blockedArea.requests.endX + 1,
            };
          }
          setPos((prev) => ({
            ...prev,
            translateX: blockedArea.requests.startX,
            translateY: blockedArea.requests.endY + 1,
          }));
          attached.current = "requests";
          return {
            y: blockedArea.requests.endY + 1,
            x: blockedArea.requests.startX,
          };
        }
        if (
          blockedArea.goals &&
          pos.translateX > blockedArea.goals.startX - pos.size.width &&
          pos.translateX < blockedArea.goals.endX &&
          pos.translateY <= blockedArea.goals.endY &&
          pos.translateY > blockedArea.goals.startY - pos.size.height
        ) {
          if (pos.translateY + pos.size.height >= blockedArea.screen.bottomY) {
            setPos((prev) => ({
              ...prev,
              translateX: blockedArea.goals.endX + 1,
              translateY: blockedArea.screen.bottomY - pos.size.height - 1,
            }));

            return {
              x: blockedArea.goals.endX + 1,
              y: blockedArea.screen.bottomY - pos.size.height - 1,
            };
          }

          setPos((prev) => ({
            ...prev,
            translateX: blockedArea.goals.startX,
            translateY: blockedArea.goals.endY + 1,
          }));
          attached.current = "goals";
          return {
            y: blockedArea.goals.endY + 1,
            x: blockedArea.goals.startX,
          };
        }
        if (
          blockedArea.store &&
          pos.translateX > blockedArea.store.startX - pos.size.width &&
          pos.translateX < blockedArea.store.endX &&
          pos.translateY <= blockedArea.store.endY &&
          pos.translateY > blockedArea.store.startY - pos.size.height
        ) {
          if (pos.translateY + pos.size.height >= blockedArea.screen.bottomY) {
            setPos((prev) => ({
              ...prev,
              translateX: blockedArea.store.endX + 1,
              translateY: blockedArea.screen.bottomY - pos.size.height - 1,
            }));

            return {
              y: blockedArea.screen.bottomY - pos.size.height - 1,
              x: blockedArea.store.endX + 1,
            };
          }
          setPos((prev) => ({
            ...prev,
            translateX: blockedArea.store.startX,
            translateY: blockedArea.store.endY + 1,
          }));
          attached.current = "store";
          return {
            y: blockedArea.store.endY + 1,
            x: blockedArea.store.startX,
          };
        }
        if (pos.translateY <= blockedArea.screen.topY) {
          setPos((prev) => ({
            ...prev,

            translateY: blockedArea.screen.topY + 1,
          }));

          return {
            y: blockedArea.screen.topY + 1,
            x: pos.translateX,
          };
        }
        if (pos.translateY + pos.size.height >= blockedArea.screen.bottomY) {
          setPos((prev) => ({
            ...prev,

            translateY: blockedArea.screen.bottomY - pos.size.height - 1,
          }));
          attached.current = "bottom";
          return {
            y: blockedArea.screen.bottomY - pos.size.height - 1,
            x: pos.translateX,
          };
        }
      }
      if (attached.current === "requests") {
        if (pos.translateY + pos.size.height >= blockedArea.screen.bottomY) {
          if (
            blockedArea.requests.endX + pos.size.width + 1 >=
            blockedArea.screen.rightX
          ) {
            setPos((prev) => ({
              ...prev,
              translateX: blockedArea.requests.startX - pos.size.width - 1,
              translateY: blockedArea.screen.topY + 1,
            }));
            attached.current = false;
            return {
              y: blockedArea.screen.topY + 1,
              x: blockedArea.requests.startX - pos.size.width - 1,
            };
          }
          setPos((prev) => ({
            ...prev,
            translateX: blockedArea.requests.endX + 1,
            translateY: blockedArea.screen.topY + 1,
          }));
          attached.current = false;
          return {
            y: blockedArea.screen.topY + 1,
            x: blockedArea.requests.endX + 1,
          };
        }
        setPos((prev) => ({
          ...prev,
          translateX: blockedArea.requests.startX,
          translateY: blockedArea.requests.endY + 1,
        }));
        return {
          y: blockedArea.requests.endY + 1,
          x: blockedArea.requests.startX,
        };
      }
      if (attached.current === "goals") {
        if (pos.translateY + pos.size.height >= blockedArea.screen.bottomY) {
          if (
            blockedArea.goals.endX + pos.size.width + 1 >=
            blockedArea.screen.rightX
          ) {
            setPos((prev) => ({
              ...prev,
              translateX: blockedArea.requests.startX - pos.size.width - 1,
              translateY: blockedArea.screen.topY + 1,
            }));
            attached.current = false;
            return {
              y: blockedArea.screen.topY + 1,
              x: blockedArea.requests.startX - pos.size.width - 1,
            };
          }
          setPos((prev) => ({
            ...prev,
            translateX: blockedArea.goals.endX + 1,
            translateY: blockedArea.screen.topY + 1,
          }));
          attached.current = false;
          return {
            y: blockedArea.screen.topY + 1,
            x: blockedArea.goals.endX + 1,
          };
        }
        setPos((prev) => ({
          ...prev,
          translateX: blockedArea.goals.startX,
          translateY: blockedArea.goals.endY + 1,
        }));
        return {
          y: blockedArea.goals.endY + 1,
          x: blockedArea.goals.startX,
        };
      }
      if (attached.current === "store") {
        if (pos.translateY + pos.size.height >= blockedArea.screen.bottomY) {
          if (
            blockedArea.store.endX + pos.size.width + 1 >=
            blockedArea.screen.rightX
          ) {
            setPos((prev) => ({
              ...prev,
              translateX: blockedArea.store.startX - pos.size.width - 1,
              translateY: blockedArea.screen.topY + 1,
            }));
            attached.current = false;
            return {
              y: blockedArea.screen.topY + 1,
              x: blockedArea.requests.startX - pos.size.width - 1,
            };
          }
          setPos((prev) => ({
            ...prev,
            translateX: blockedArea.store.endX + 1,
            translateY: blockedArea.screen.topY + 1,
          }));
          attached.current = false;
          return {
            y: blockedArea.screen.topY + 1,
            x: blockedArea.store.endX + 1,
          };
        }

        setPos((prev) => ({
          ...prev,
          translateX: blockedArea.store.startX,
          translateY: blockedArea.store.endY + 1,
        }));
        return {
          y: blockedArea.store.endY + 1,
          x: blockedArea.store.startX,
        };
      }
      if (attached.current === "bottom") {
        setPos((prev) => ({
          ...prev,
          translateY: blockedArea.screen.bottomY - pos.size.height - 1,
        }));
        return {
          y: blockedArea.screen.bottomY - pos.size.height - 1,
          x: pos.translateX,
        };
      }

      return false;
    }

    return false;
  }
  useEffect(() => {
    if (attached.current === "bottom") {
      collisionCheck();
    }
    // eslint-disable-next-line
  }, [pos.size]);

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
          x >= blockedArea.requests.startX - pos.size.width &&
          x <= blockedArea.requests.endX &&
          y <= blockedArea.requests.endY &&
          y >= blockedArea.requests.startY - pos.size.height
        ) {
          if (mouseX.current < blockedArea.requests.startX) {
            x = blockedArea.requests.startX - pos.size.width;
          } else if (mouseX.current > blockedArea.requests.endX) {
            x = blockedArea.requests.endX;
          } else if (mouseY.current > blockedArea.requests.endY) {
            y = blockedArea.requests.endY;
          } else {
            y = blockedArea.requests.startY - pos.size.height;
          }
        } else if (
          pos.container !== "store" &&
          x >= blockedArea.store.startX - pos.size.width &&
          x <= blockedArea.store.endX &&
          y <= blockedArea.store.endY &&
          y >= blockedArea.store.startY - pos.size.height
        ) {
          if (mouseX.current < blockedArea.store.startX) {
            x = blockedArea.store.startX - pos.size.width;
          } else if (mouseX.current > blockedArea.store.endX) {
            x = blockedArea.store.endX;
          } else if (mouseY.current > blockedArea.store.endY) {
            y = blockedArea.store.endY;
          } else {
            y = blockedArea.store.startY - pos.size.height;
          }
        } else if (
          pos.container !== "goals" &&
          x >= blockedArea.goals.startX - pos.size.width &&
          x <= blockedArea.goals.endX &&
          y <= blockedArea.goals.endY &&
          y >= blockedArea.goals.startY - pos.size.height
        ) {
          if (mouseX.current < blockedArea.goals.startX) {
            x = blockedArea.goals.startX - pos.size.width;
          } else if (mouseX.current > blockedArea.goals.endX) {
            x = blockedArea.goals.endX;
          } else if (mouseY.current > blockedArea.goals.endY) {
            y = blockedArea.goals.endY;
          } else {
            y = blockedArea.goals.startY - pos.size.height;
          }
        }
        if (y <= blockedArea.screen.topY) {
          y = blockedArea.screen.topY;
        }
        if (y + pos.size.height >= blockedArea.screen.bottomY) {
          y = blockedArea.screen.bottomY - pos.size.height;
        }
        if (x + pos.size.width >= blockedArea.screen.rightX) {
          x = blockedArea.screen.rightX - pos.size.width;
        }
        if (x <= blockedArea.screen.leftX) {
          x = blockedArea.screen.leftX;
        } else {
          mouseX.current = (100 * e.pageX) / e.view.innerWidth;
          mouseY.current = (100 * e.pageY) / e.view.innerHeight;
        }
        setPos((prev) => ({
          ...prev,
          translateX: x,
          translateY: y,
        }));
        attached.current = false;
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
    collisionCheck,
    blockedArea,
    setBlockedArea,
    resetAttached: (container) => {
      resetAttached(container);
    },
  };
};
