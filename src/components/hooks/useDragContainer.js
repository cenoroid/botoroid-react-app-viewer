import { useState, useEffect, useCallback, useRef } from "react";
import _ from "lodash";
export const useDragContainer = (initialPos) => {
  const [pos, setPos] = useState({
    translateX: initialPos.x,
    translateY: initialPos.y,
    container: initialPos.container,
  });
  const [size, setSize] = useState(
    pos.container === "chest" ? { width: 2, height: 4.5 } : null
  );
  const [blockedArea, setBlockedArea] = useState(initialPos.blockedArea);
  const [isDragging, setIsDragging] = useState(false);
  const [ownBlockedArea, setOwnBlockedArea] = useState();
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
      : false
  );
  const posTemp = useRef();
  const collisionInit = useRef(false);
  const ownBlockedAreaTemp = useRef();
  let chestCollissionCheck;
  function resetAttached(container) {
    if (container === attached.current) {
      attached.current = false;
    }
  }
  useEffect(() => {
    if (size && pos.container !== "chest") {
      handleCollision();
    }
    // eslint-disable-next-line
  }, [blockedArea]);

  function chestCollission() {
    if (blockedArea) {
      posTemp.current = {
        translateX: Math.floor(Math.random() * 96),
        translateY: Math.floor(Math.random() * 86),
      };
      attached.current = false;
      let collissionArea = collisionCheck();

      if (collissionArea) {
        chestCollission();
      } else {
        setPos((prev) => ({
          ...prev,
          translateX: posTemp.current.translateX,
          translateY: posTemp.current.translateY,
        }));
      }
    }
  }

  function handleCollision() {
    if (!collisionInit.current) {
      ownBlockedAreaTemp.current = {
        startX: pos.translateX,
        endX: pos.translateX + size.width,
        startY: pos.translateY,
        endY: pos.translateY + size.height,
      };
      posTemp.current = {
        translateX: pos.translateX,
        translateY: pos.translateY,
      };
    }

    let collisionArea = collisionCheck();
    if (collisionArea) {
      ownBlockedAreaTemp.current = {
        startX: collisionArea.x,
        endX: collisionArea.x + size.width,
        startY: collisionArea.y,
        endY: collisionArea.y + size.height,
      };

      collisionInit.current = true;
      handleCollision();
    } else if (!collisionArea) {
      collisionInit.current = false;
      if (
        pos.translateX !== posTemp.current.translateX ||
        pos.translateY !== posTemp.current.translateY
      ) {
        setPos((prev) => ({
          ...prev,
          translateX: posTemp.current.translateX,
          translateY: posTemp.current.translateY,
        }));
        setOwnBlockedArea({
          startX: posTemp.current.translateX,
          endX: posTemp.current.translateX + size.width,
          startY: posTemp.current.translateY,
          endY: posTemp.current.translateY + size.height,
        });
      }
      if (!_.isEqual(ownBlockedArea, ownBlockedAreaTemp.current)) {
        setOwnBlockedArea({
          startX: posTemp.current.translateX,
          endX: posTemp.current.translateX + size.width,
          startY: posTemp.current.translateY,
          endY: posTemp.current.translateY + size.height,
        });
      }
    }
  }
  function collisionCheck() {
    if (!size) {
      return false;
    }
    if (!attached.current) {
      if (
        blockedArea.requests &&
        posTemp.current.translateX > blockedArea.requests.startX - size.width &&
        posTemp.current.translateX < blockedArea.requests.endX &&
        posTemp.current.translateY <= blockedArea.requests.endY &&
        posTemp.current.translateY >= blockedArea.requests.startY - size.height
      ) {
        if (pos.container === "chest") {
          return true;
        }

        if (posTemp.current.translateY < blockedArea.requests.startY) {
          return false;
        }

        if (
          blockedArea.requests.endY + size.height >=
          blockedArea.screen.bottomY
        ) {
          if (
            blockedArea.requests.startX + size.width >
            blockedArea.screen.rightX
          ) {
            posTemp.current = {
              translateX: blockedArea.requests.startX - size.width - 1,
              translateY: blockedArea.screen.topY + 1,
            };
            return {
              y: blockedArea.screen.topY + 1,
              x: blockedArea.requests.startX - size.width - 1,
            };
          }
          posTemp.current = {
            translateX: blockedArea.requests.endX + 1,
            translateY: blockedArea.screen.bottomY - size.height - 1,
          };

          return {
            y: blockedArea.screen.bottomY - size.height - 1,
            x: blockedArea.requests.endX + 1,
          };
        }
        posTemp.current = {
          translateX: blockedArea.requests.startX,
          translateY: blockedArea.requests.endY + 1,
        };

        attached.current = "requests";
        return {
          y: blockedArea.requests.endY + 1,
          x: blockedArea.requests.startX,
        };
      }
      if (
        blockedArea.goals &&
        posTemp.current.translateX > blockedArea.goals.startX - size.width &&
        posTemp.current.translateX < blockedArea.goals.endX &&
        posTemp.current.translateY <= blockedArea.goals.endY &&
        posTemp.current.translateY >= blockedArea.goals.startY - size.height
      ) {
        if (pos.container === "chest") {
          return true;
        }

        if (posTemp.current.translateY < blockedArea.goals.startY) {
          return false;
        }
        if (
          posTemp.current.translateY + size.height >=
          blockedArea.screen.bottomY
        ) {
          if (
            blockedArea.goals.startX + size.width >=
            blockedArea.screen.rightX
          ) {
            posTemp.current = {
              translateX: blockedArea.goals.startX - size.width - 1,
              translateY: blockedArea.screen.topY + 1,
            };
            return {
              y: blockedArea.screen.topY + 1,
              x: blockedArea.goals.startX - size.width - 1,
            };
          }
          posTemp.current = {
            translateX: blockedArea.goals.endX + 1,
            translateY: blockedArea.screen.bottomY - size.height - 1,
          };

          return {
            x: blockedArea.goals.endX + 1,
            y: blockedArea.screen.bottomY - size.height - 1,
          };
        }

        posTemp.current = {
          translateX: blockedArea.goals.startX,
          translateY: blockedArea.goals.endY + 1,
        };

        attached.current = "goals";
        return {
          y: blockedArea.goals.endY + 1,
          x: blockedArea.goals.startX,
        };
      }
      if (
        blockedArea.store &&
        posTemp.current.translateX > blockedArea.store.startX - size.width &&
        posTemp.current.translateX < blockedArea.store.endX &&
        posTemp.current.translateY <= blockedArea.store.endY &&
        posTemp.current.translateY >= blockedArea.store.startY - size.height
      ) {
        if (pos.container === "chest") {
          return true;
        }
        if (posTemp.current.translateY < blockedArea.store.startY) {
          return false;
        }
        if (
          posTemp.current.translateY + size.height >=
          blockedArea.screen.bottomY
        ) {
          if (
            blockedArea.store.startX + size.width >=
            blockedArea.screen.rightX
          ) {
            posTemp.current = {
              translateX: blockedArea.store.startX - size.width - 1,
              translateY: blockedArea.screen.topY + 1,
            };
            return {
              y: blockedArea.screen.topY + 1,
              x: blockedArea.store.startX - size.width - 1,
            };
          }
          posTemp.current = {
            translateX: blockedArea.store.endX + 1,
            translateY: blockedArea.screen.bottomY - size.height - 1,
          };
          return {
            y: blockedArea.screen.bottomY - size.height - 1,
            x: blockedArea.store.endX + 1,
          };
        }
        posTemp.current = {
          translateX: blockedArea.store.startX,
          translateY: blockedArea.store.endY + 1,
        };
        attached.current = "store";
        return {
          y: blockedArea.store.endY + 1,
          x: blockedArea.store.startX,
        };
      }
      if (posTemp.current.translateY <= blockedArea.screen.topY) {
        posTemp.current = {
          translateX: posTemp.current.translateX,

          translateY: blockedArea.screen.topY + 1,
        };
        return {
          y: blockedArea.screen.topY + 1,
          x: posTemp.current.translateX,
        };
      }
      if (
        posTemp.current.translateY + size.height >=
        blockedArea.screen.bottomY
      ) {
        posTemp.current = {
          translateX: posTemp.current.translateX,
          translateY: blockedArea.screen.bottomY - size.height - 1,
        };
        attached.current = "bottom";
        return false;
      }
      if (
        posTemp.current.translateX + size.width >=
        blockedArea.screen.rightX
      ) {
        posTemp.current = {
          translateX: blockedArea.screen.rightX - size.width - 1,
          translateY: posTemp.current.translateY,
        };
        return {
          x: blockedArea.screen.rightX - size.width - 1,
          y: posTemp.current.translateY,
        };
      }

      return false;
    }
    if (attached.current === "requests") {
      if (!blockedArea.requests) {
        return false;
      }

      if (
        posTemp.current.translateY + size.height >=
        blockedArea.screen.bottomY
      ) {
        if (
          blockedArea.requests.endX + size.width + 1 >=
          blockedArea.screen.rightX
        ) {
          posTemp.current = {
            translateX: blockedArea.requests.startX - size.width - 1,
            translateY: blockedArea.screen.topY + 1,
          };
          attached.current = false;
          return {
            y: blockedArea.screen.topY + 1,
            x: blockedArea.requests.startX - size.width - 1,
          };
        }

        posTemp.current = {
          translateX: blockedArea.requests.endX + 1,
          translateY: blockedArea.screen.topY + 1,
        };
        attached.current = false;
        return {
          y: blockedArea.screen.topY + 1,
          x: blockedArea.requests.endX + 1,
        };
      }

      posTemp.current = {
        translateX: blockedArea.requests.startX,
        translateY: blockedArea.requests.endY + 1,
      };
      return false;
    }

    if (attached.current === "goals") {
      if (!blockedArea.goals) {
        return false;
      }
      if (
        posTemp.current.translateY + size.height >=
        blockedArea.screen.bottomY
      ) {
        if (
          blockedArea.goals.endX + size.width + 1 >=
          blockedArea.screen.rightX
        ) {
          posTemp.current = {
            translateX: blockedArea.requests.startX - size.width - 1,
            translateY: blockedArea.screen.topY + 1,
          };
          attached.current = false;
          return {
            y: blockedArea.screen.topY + 1,
            x: blockedArea.requests.startX - size.width - 1,
          };
        }

        posTemp.current = {
          translateX: blockedArea.goals.endX + 1,
          translateY: blockedArea.screen.topY + 1,
        };
        attached.current = false;
        return {
          y: blockedArea.screen.topY + 1,
          x: blockedArea.goals.endX + 1,
        };
      }

      posTemp.current = {
        translateX: blockedArea.goals.startX,
        translateY: blockedArea.goals.endY + 1,
      };
      return false;
    }
    if (attached.current === "store") {
      if (!blockedArea.store) {
        return false;
      }
      if (
        posTemp.current.translateY + size.height >=
        blockedArea.screen.bottomY
      ) {
        if (
          blockedArea.store.endX + size.width + 1 >=
          blockedArea.screen.rightX
        ) {
          posTemp.current = {
            translateX: blockedArea.store.startX - size.width - 1,
            translateY: blockedArea.screen.topY + 1,
          };
          attached.current = false;
          return {
            y: blockedArea.screen.topY + 1,
            x: blockedArea.requests.startX - size.width - 1,
          };
        }

        posTemp.current = {
          translateX: blockedArea.store.endX + 1,
          translateY: blockedArea.screen.topY + 1,
        };
        attached.current = false;
        return {
          y: blockedArea.screen.topY + 1,
          x: blockedArea.store.endX + 1,
        };
      }

      posTemp.current = {
        translateX: blockedArea.store.startX,
        translateY: blockedArea.store.endY + 1,
      };
      return false;
    }
    if (attached.current === "bottom") {
      posTemp.current = {
        translateX: posTemp.current.translateX,
        translateY: blockedArea.screen.bottomY - size.height - 1,
      };
      return false;
    }

    return false;
  }
  useEffect(() => {
    if (size && pos.container !== "chest") {
      handleCollision();
    }
    // eslint-disable-next-line
  }, [size]);
  useEffect(() => {
    if (!isDragging && size && ownBlockedArea) {
      handleCollision();
    }
    // eslint-disable-next-line
  }, [isDragging]);
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
        posTemp.current.x = x;
        posTemp.current.y = y;
        if (x === pos.translateX && y === pos.translateY) {
          return;
        }
        if (
          pos.container !== "requests" &&
          x >= blockedArea.requests.startX - size.width &&
          x <= blockedArea.requests.endX &&
          y <= blockedArea.requests.endY &&
          y >= blockedArea.requests.startY - size.height
        ) {
          if (mouseX.current < blockedArea.requests.startX) {
            x = blockedArea.requests.startX - size.width;
          } else if (mouseX.current > blockedArea.requests.endX) {
            x = blockedArea.requests.endX;
          } else if (mouseY.current > blockedArea.requests.endY) {
            y = blockedArea.requests.endY;
          } else {
            y = blockedArea.requests.startY - size.height;
          }
          if (pos.container !== "goals" && blockedArea.goals) {
            [x, y] = draggingInGoals(x, y);
          }
          if (pos.container !== "store" && blockedArea.store) {
            [x, y] = draggingInStore(x, y);
          }
        }
        if (
          pos.container !== "store" &&
          x >= blockedArea.store.startX - size.width &&
          x <= blockedArea.store.endX &&
          y <= blockedArea.store.endY &&
          y >= blockedArea.store.startY - size.height
        ) {
          if (mouseX.current < blockedArea.store.startX) {
            x = blockedArea.store.startX - size.width;
          } else if (mouseX.current > blockedArea.store.endX) {
            x = blockedArea.store.endX;
          } else if (mouseY.current > blockedArea.store.endY) {
            y = blockedArea.store.endY;
          } else {
            y = blockedArea.store.startY - size.height;
          }
          if (pos.container !== "goals" && blockedArea.goals) {
            [x, y] = draggingInGoals(x, y);
          }
          if (pos.container !== "requests" && blockedArea.requests) {
            [x, y] = draggingInRequests(x, y);
          }
        }
        if (pos.container !== "goals") {
          if (
            x > blockedArea.goals.startX - size.width &&
            x < blockedArea.goals.endX &&
            y < blockedArea.goals.endY &&
            y > blockedArea.goals.startY - size.height
          ) {
            if (mouseX.current < blockedArea.goals.startX) {
              x = blockedArea.goals.startX - size.width;
            } else if (mouseX.current > blockedArea.goals.endX) {
              x = blockedArea.goals.endX;
            } else if (mouseY.current > blockedArea.goals.endY) {
              y = blockedArea.goals.endY;
            } else {
              y = blockedArea.goals.startY - size.height;
            }
            if (pos.container !== "store" && blockedArea.store) {
              [x, y] = draggingInStore(x, y);
            }
            if (pos.container !== "requests" && blockedArea.requests) {
              [x, y] = draggingInRequests(x, y);
            }
          }
        }
        if (y < blockedArea.screen.topY) {
          y = blockedArea.screen.topY;
          if (pos.container !== "store" && blockedArea.store) {
            [x, y] = draggingInStore(x, y);
          }
          if (pos.container !== "requests" && blockedArea.requests) {
            [x, y] = draggingInRequests(x, y);
          }
          if (pos.container !== "goals" && blockedArea.goals) {
            [x, y] = draggingInGoals(x, y);
          }
        }
        if (y + size.height > blockedArea.screen.bottomY) {
          y = blockedArea.screen.bottomY - size.height;
          if (pos.container !== "store" && blockedArea.store) {
            [x, y] = draggingInStore(x, y);
          }
          if (pos.container !== "requests" && blockedArea.requests) {
            [x] = draggingInRequests(x, y);
          }
          if (pos.container !== "goals" && blockedArea.goals) {
            [x, y] = draggingInGoals(x, y);
          }
        }
        if (x + size.width > blockedArea.screen.rightX) {
          mouseY.current = (100 * e.pageY) / e.view.innerHeight;
          x = blockedArea.screen.rightX - size.width;
          if (pos.container !== "store" && blockedArea.store) {
            [x, y] = draggingInStore(x, y);
          }
          if (pos.container !== "requests" && blockedArea.requests) {
            [x, y] = draggingInRequests(x, y);
          }
          if (pos.container !== "goals" && blockedArea.goals) {
            [x, y] = draggingInGoals(x, y);
          }
        }
        if (x < blockedArea.screen.leftX) {
          mouseY.current = (100 * e.pageY) / e.view.innerHeight;
          x = blockedArea.screen.leftX;
          if (pos.container !== "store" && blockedArea.store) {
            [x, y] = draggingInStore(x, y);
          }
          if (pos.container !== "requests" && blockedArea.requests) {
            [x, y] = draggingInRequests(x, y);
          }
          if (pos.container !== "goals" && blockedArea.goals) {
            [x, y] = draggingInGoals(x, y);
          }
        }
        if (posTemp.current.x === x && posTemp.current.y === y) {
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
  function draggingInGoals(x, y) {
    if (
      x > blockedArea.goals.startX - size.width &&
      x < blockedArea.goals.endX &&
      y < blockedArea.goals.endY &&
      y > blockedArea.goals.startY - size.height
    ) {
      if (mouseX.current < blockedArea.goals.startX) {
        x = blockedArea.goals.startX - size.width;
      } else if (mouseX.current > blockedArea.goals.endX) {
        x = blockedArea.goals.endX;
      } else if (mouseY.current > blockedArea.goals.endY) {
        y = blockedArea.goals.endY;
      } else {
        y = blockedArea.goals.startY - size.height;
      }
    }

    return [x, y];
  }
  function draggingInStore(x, y) {
    if (
      x > blockedArea.store.startX - size.width &&
      x < blockedArea.store.endX &&
      y < blockedArea.store.endY &&
      y > blockedArea.store.startY - size.height
    ) {
      if (mouseX.current < blockedArea.store.startX) {
        x = blockedArea.store.startX - size.width;
      } else if (mouseX.current > blockedArea.store.endX) {
        x = blockedArea.store.endX;
      } else if (mouseY.current > blockedArea.store.endY) {
        y = blockedArea.store.endY;
      } else {
        y = blockedArea.store.startY - size.height;
      }
    }

    return [x, y];
  }
  function draggingInRequests(x, y) {
    if (
      x > blockedArea.requests.startX - size.width &&
      x < blockedArea.requests.endX &&
      y < blockedArea.requests.endY &&
      y > blockedArea.requests.startY - size.height
    ) {
      if (mouseX.current < blockedArea.requests.startX) {
        x = blockedArea.requests.startX - size.width;
      } else if (mouseX.current > blockedArea.requests.endX) {
        x = blockedArea.requests.endX;
      } else if (mouseY.current > blockedArea.requests.endY) {
        y = blockedArea.requests.endY;
      } else {
        y = blockedArea.requests.startY - size.height;
      }
    }

    return [x, y];
  }
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
    setSize,
    ownBlockedArea,
    chestCollission: (x, y) => {
      chestCollission(x, y);
    },
    chestCollissionCheck,
  };
};
