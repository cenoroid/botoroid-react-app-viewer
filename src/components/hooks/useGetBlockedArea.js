import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import UseGetSize from "./useGetSize";

export const useGetBlockedArea = () => {
  const screenBlockedArea = useSelector(
    (state) => state.appConfig.player.screenBlockedArea
  );
  const [newPos, setNewPos] = useState({
    store: { x: 0, y: 10 + screenBlockedArea.top },
    requestList: { x: 0, y: screenBlockedArea.top },
    goals: { x: 0, y: 5 + screenBlockedArea.top },
  });
  const blockedArea = useRef({
    screen: screenBlockedArea,
    store: { x: 0, y: 12 + screenBlockedArea.top },
    requestList: { x: 0, y: screenBlockedArea.top },
    goals: { x: 0, y: 1 + screenBlockedArea.top },
  });
  const pos = useRef({
    store: { x: 0, y: 10 + screenBlockedArea.top },
    requestList: { x: 0, y: screenBlockedArea.top },
    goals: { x: 0, y: 5 + screenBlockedArea.top },
  });
  const [isDragging, setIsDragging] = useState(false);
  const [checkForCol, setCheckForCol] = useState(false);
  const posTemp = useRef([]);
  const attached = useRef({});
  const mouseClick = useRef();
  const posOnBump = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const finPos = useRef();
  const [screenDimensions, setScreenDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const oldBlockedArea = blockedArea.current;
    blockedArea.current = { ...oldBlockedArea, screen: screenBlockedArea };
    console.log("checking");
    setCheckForCol(true);
  }, [screenBlockedArea]);

  const setSize = useCallback((container) => {
    const obj = {};
    const size = UseGetSize(container);
    size.startX = pos.current[container].x;
    size.endX = size.width + pos.current[container].x;
    size.startY = pos.current[container].y;
    size.endY = size.height + pos.current[container].y;
    if (!_.isEqualWith(size, blockedArea.current[container])) {
      obj[container] = size;
    }

    if (Object.keys(obj).length !== 0) {
      const oldBlockedArea = blockedArea.current;
      blockedArea.current = { ...oldBlockedArea, ...obj };
      console.log(blockedArea.current);

      setCheckForCol(true);
    }
  }, []);

  function updateBlockedArea(key) {
    console.log(key);
    const oldBlockedArea = blockedArea.current[key];
    blockedArea.current[key] = {
      ...oldBlockedArea,
      startX: pos.current[key].x,
      startY: pos.current[key].y,
      endX: pos.current[key].x + oldBlockedArea.width,
      endY: pos.current[key].y + oldBlockedArea.height,
    };
  }

  const setPositionContainer = useCallback((obj) => {
    finPos.current = false;
    const oldPos = pos.current;
    pos.current = { ...oldPos, ...obj };
    console.log(obj);
    updateBlockedArea(Object.keys(obj)[0]);
    setNewPos((prev) => ({ ...prev, ...obj }));
    setCheckForCol(true);
  }, []);

  useEffect(() => {
    Object.keys(newPos).forEach((key) => {
      document.getElementById(
        key
      ).style.transform = `translate(${newPos[key].x}vw, ${newPos[key].y}vh)`;
    });
  }, [newPos]);

  useEffect(() => {
    if (!checkForCol) return;
    colissionLoop();
    setCheckForCol(false);

    function colissionLoop() {
      const result = handleColission();
      if (result.length !== 0 && result) {
        let obj = {};
        result.forEach((item) => {
          item.forEach((thing) => {
            obj = { ...obj, ...thing };
          });
        });
        setNewPos((prev) => ({ ...prev, ...obj }));
        colissionLoop();
      }
    }

    function handleColission() {
      const topResult = checkTopColission(); // return key if colission else undefined
      const zones = Object.keys(pos.current);
      const colissionResult = zones //return array with array or empty
        .map((zone) => {
          const containersAttached = Object.values(attached.current);
          const containers = zones.filter(
            (container) =>
              container !== zone && !containersAttached.includes(container)
          );

          return containers //return array if colission else empty array
            .map((key) => {
              const checkColissionResult = checkColission(zone, key); // return key if colission else undefined
              return checkColissionResult;
            })
            .filter((result) => result);
        });
      const attachedResult = checkAttached(); //return array with keys else undefined
      const bottomResult = checkBottomColission();
      const finalResult = topResult
        .concat(colissionResult)
        .concat(attachedResult)
        .concat(bottomResult)
        .filter((array) => array.length !== 0);

      return finalResult;
    }

    function checkAttached() {
      const result = Object.keys(attached.current).map((container) => {
        if (
          _.isEqualWith(pos.current[attached.current[container]], {
            x: blockedArea.current[container].startX,
            y: blockedArea.current[container].endY + 1,
          })
        ) {
          return false;
        }

        pos.current[attached.current[container]] = {
          x: blockedArea.current[container].startX,
          y: blockedArea.current[container].endY + 1,
        };
        updateBlockedArea(attached.current[container]);
        return {
          [attached.current[container]]: {
            x: blockedArea.current[container].startX,
            y: blockedArea.current[container].endY + 1,
          },
        };
      });
      const filtered = result.filter((res) => res);
      return [filtered]; //return array with keys else undefined
    }

    function checkColission(zone, key) {
      if (
        blockedArea.current[key].endX > blockedArea.current[zone].startX &&
        blockedArea.current[key].startX < blockedArea.current[zone].endX &&
        blockedArea.current[key].startY <= blockedArea.current[zone].endY &&
        blockedArea.current[key].endY >= blockedArea.current[zone].startY
      ) {
        if (
          blockedArea.current[key].startY < blockedArea.current[zone].startY
        ) {
          return;
        }

        const oldAttached = attached.current;
        attached.current = { ...oldAttached, [zone]: key };
        pos.current[key] = {
          y: blockedArea.current[zone].endY + 1,
          x: blockedArea.current[zone].startX,
        };
        updateBlockedArea(key);
        return {
          [key]: {
            y: blockedArea.current[zone].endY + 1,
            x: blockedArea.current[zone].startX,
          },
        };
      }
      return;
    }

    function checkBottomColission() {
      const zones = Object.keys(pos.current);
      const result = zones
        .map((key) => {
          if (
            blockedArea.current[key].endY > blockedArea.current.screen.bottom
          ) {
            const attachedTo = Object.keys(attached.current).find(
              (container) => attached.current[container] === key
            );

            if (attachedTo) {
              delete attached.current[attachedTo];
              pos.current[key] = {
                x: blockedArea.current[attachedTo].endX + 1,
                y:
                  blockedArea.current.screen.bottom -
                  blockedArea.current[key].height,
              };
              updateBlockedArea(key);
              return {
                [key]: {
                  x: blockedArea.current[attachedTo].endX + 1,
                  y:
                    blockedArea.current.screen.bottom -
                    blockedArea.current[key].height,
                },
              };
            }

            pos.current[key] = {
              x: blockedArea.current[key].startX,
              y:
                blockedArea.current.screen.bottom -
                blockedArea.current[key].height,
            };
            updateBlockedArea(key);
            return {
              [key]: {
                x: blockedArea.current[key].startX,
                y:
                  blockedArea.current.screen.bottom -
                  blockedArea.current[key].height,
              },
            };
          }
          if (
            blockedArea.current[key].endX > blockedArea.current.screen.right
          ) {
            pos.current[key] = {
              x: 0,
              y:
                blockedArea.current.screen.bottom -
                blockedArea.current[key].height,
            };
            updateBlockedArea(key);
            return {
              [key]: {
                x: 0,
                y:
                  blockedArea.current.screen.bottom -
                  blockedArea.current[key].height,
              },
            };
          }
          return false;
        })
        .filter((res) => res);
      return [result];
    }

    function checkTopColission() {
      const zones = Object.keys(pos.current);
      const result = zones
        .map((key) => {
          if (pos.current[key].y < blockedArea.current.screen.top) {
            pos.current[key] = {
              x: blockedArea.current[key].startX,
              y: blockedArea.current.screen.top + 1,
            };
            updateBlockedArea(key);
            return {
              [key]: {
                x: blockedArea.current[key].startX,
                y: blockedArea.current.screen.top + 1,
              },
            };
          }
          return false;
        })
        .filter((res) => res);
      return [result];
    }
  }, [setPositionContainer, checkForCol]);

  const chestPos = useCallback((width, height) => {
    const x = Math.floor(
      Math.random() *
        (blockedArea.current.screen.right -
          width +
          blockedArea.current.screen.left)
    );
    const y = Math.floor(
      Math.random() *
        (blockedArea.current.screen.bottom -
          height +
          blockedArea.current.screen.top)
    );

    const chest = {
      startX: x,
      startY: y,
      endX: x + width,
      endY: y + height,
    };

    const checkPos = Object.keys(pos.current).some(
      (container) =>
        chest.endX > blockedArea.current[container].startX &&
        chest.startX < blockedArea.current[container].endX &&
        chest.startY < blockedArea.current[container].endY &&
        chest.endY > blockedArea.current[container].startY
    );

    if (!checkPos) return { x, y };
    return chestPos(width, height);
  }, []);

  const handleMouseUp = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isDragging) return;
      console.log(finPos.current);
      if (finPos.current) setPositionContainer(finPos.current);
      setIsDragging(false);
    },
    [isDragging, setPositionContainer]
  );

  const translateV = useMemo(() => {
    const x = 100 / screenDimensions.x;
    const y = 100 / screenDimensions.y;
    return { x, y };
  }, [screenDimensions]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        e.stopPropagation();
        e.preventDefault();

        let x =
          (e.pageX - mouseClick.current.x) * translateV.x +
          pos.current[isDragging].x;

        let y =
          (e.pageY - mouseClick.current.y) * translateV.y +
          pos.current[isDragging].y;

        posTemp.current.x = x;
        posTemp.current.y = y;

        const colissionArray = Object.keys(blockedArea.current).filter(
          (container) => container !== isDragging && container !== "screen"
        );
        const result = detectBumpLoop(colissionArray, x, y);
        x = result.x;
        y = result.y;

        if (posTemp.current.x === x && posTemp.current.y === y) {
          mousePos.current = {
            x: e.pageX * translateV.x,
            y: e.pageY * translateV.y,
          };
          posOnBump.current = { x, y };
        }

        document.getElementById(
          isDragging
        ).style.transform = `translate(${x}vw, ${y}vh)`;
        finPos.current = { [isDragging]: { x, y } };
      }

      function checkTopBump(zone) {
        let y;
        if (
          Math.round(posOnBump.current.y) ===
          Math.round(
            blockedArea.current[zone].startY -
              blockedArea.current[isDragging].height
          )
        ) {
          y =
            blockedArea.current[zone].startY -
            blockedArea.current[isDragging].height;
          return { zone, y };
        }
        if (
          Math.round(posOnBump.current.y) ===
          Math.round(blockedArea.current[zone].endY)
        ) {
          y = blockedArea.current[zone].endY;
          return { zone, y };
        }
        return;
      }

      function detectBump(zone, x, y) {
        if (
          x >=
            blockedArea.current[zone].startX -
              blockedArea.current[isDragging].width &&
          x <= blockedArea.current[zone].endX &&
          y <= blockedArea.current[zone].endY &&
          y >=
            blockedArea.current[zone].startY -
              blockedArea.current[isDragging].height
        ) {
          const top = checkTopBump(zone);
          if (top) return { zone: top.zone, y: top.y };
          if (mousePos.current.x < blockedArea.current[zone].startX) {
            x =
              blockedArea.current[zone].startX -
              blockedArea.current[isDragging].width;
            return { zone, x };
          } else if (mousePos.current.x > blockedArea.current[zone].endX) {
            x = blockedArea.current[zone].endX;
            return { zone, x };
          } else if (mousePos.current.y > blockedArea.current[zone].endY) {
            y = blockedArea.current[zone].endY;
            return { zone, y };
          } else {
            y =
              blockedArea.current[zone].startY -
              blockedArea.current[isDragging].height;
            return { zone, y };
          }
        }
        return;
      }

      function detectBumpLoop(array, x, y) {
        const screenResult = detectScreenBump(x, y);
        if (screenResult) {
          x = screenResult.x;
          y = screenResult.y;
          posOnBump.current = { x, y };
        }

        const result = array
          .map((zone) => detectBump(zone, x, y))
          .filter((result) => result);

        if (result.length !== 0) {
          const obj = result[0];
          if (obj.x) x = obj.x;
          if (obj.y) y = obj.y;
          const newArray = array.filter((container) => container !== obj.zone);
          return detectBumpLoop(newArray, x, y);
        }
        return { x, y };
      }

      function detectScreenBump(x, y) {
        let bump = false;
        if (y < blockedArea.current.screen.top) {
          y = blockedArea.current.screen.top;
          bump = true;
        }
        if (
          y >
          blockedArea.current.screen.bottom -
            blockedArea.current[isDragging].height
        ) {
          y =
            blockedArea.current.screen.bottom -
            blockedArea.current[isDragging].height;
          bump = true;
        }
        if (x < blockedArea.current.screen.left) {
          x = blockedArea.current.screen.left;
          bump = true;
        }
        if (
          x >
          blockedArea.current.screen.right -
            blockedArea.current[isDragging].width
        ) {
          x =
            blockedArea.current.screen.right -
            blockedArea.current[isDragging].width;
          bump = true;
        }
        if (bump) return { x, y };
        return;
      }
    },
    [isDragging, translateV]
  );

  const handleMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (
        !_.isEqualWith(
          { x: e.view.innerWidth, y: e.view.innerHeight },
          screenDimensions
        )
      )
        setScreenDimensions({ x: e.view.innerWidth, y: e.view.innerHeight });

      if (!e.target.id) return;

      mouseClick.current = { x: e.pageX, y: e.pageY };

      setIsDragging(e.target.id);
    },
    [screenDimensions]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isDragging) return;
    if (isDragging in attached.current) {
      delete attached.current[isDragging];
    }
    const obj = Object.keys(attached.current).find(
      (key) => attached.current[key] === isDragging
    );
    if (obj) {
      delete attached.current[obj];
    }
  }, [isDragging]);

  return {
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
    setSize,
    isDragging,
    chestPos,
  };
};
