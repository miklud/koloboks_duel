// ===
// import
// ===
import { wrk } from "..";
import {
  fnSetIsColorChanged,
  fnSetCircleVelocityChanged,
  fnSetIsPause,
  fnSetCircleClickedID,
  fnSetIsClick,
} from "../lib";

// ===
// main
// ===
export function animate(
  ctx,
  circlesArr,
  maxX,
  maxY,
  dispatcher,
  ctxUtils,
  ctxFns
) {
  const BULLET_RADIUS = 10;
  const KOLOBOK_RADIUS = 30;
  const CLOSENESS = 200;
  let bulletArrs = [];
  let fireStore = "left";
  let countFireStore = 0;
  let init = true;
  const kolobokLeft = circlesArr.find((circle) => circle.id === "left");
  const kolobokRight = circlesArr.find((circle) => circle.id === "right");
  const scores = {
    left: 0,
    right: 0,
    scoresChanged: false,
    leftChanged: false,
    rightChanged: false,
  };

  let inPause = undefined; // {dy: number, delay: number}
  let tempStop = undefined; // {dy: number, id: "right" | "left"}

  const oldCircleDim = {
    width: maxX,
    height: maxY,
    ddX: 0,
    ddY: 0,
  };

  let isCanvasDimChanged = false;

  // ---
  // _animationLoop
  // ---
  function _animateLoop() {
    ctx.clearRect(0, 0, dispatcher.maxX, dispatcher.maxY);
    isCanvasDimChanged = false;

    // Если размеры 'canvas' изменились
    if (oldCircleDim.width !== dispatcher.maxX) {
      oldCircleDim.ddX = dispatcher.maxX - oldCircleDim.width;
      oldCircleDim.width = dispatcher.maxX;
    } else {
      oldCircleDim.ddX = 0;
    }

    if (oldCircleDim.height !== dispatcher.maxY) {
      oldCircleDim.ddY = dispatcher.maxY - oldCircleDim.height;
      isCanvasDimChanged = true;
      oldCircleDim.height = dispatcher.maxY;
    } else {
      oldCircleDim.ddY = 0;
    }

    circlesArr.forEach((circle, index) => {
      if (circle.id === "right") {
        circle.x = circle.x + oldCircleDim.ddX;
      }
      circle.y = circle.y + oldCircleDim.ddY;
      if (isCanvasDimChanged) {
        circle.maxX = dispatcher.maxX;
        circle.maxY = dispatcher.maxY;
      }
      // Если пауза
      if (dispatcher.isPause) {
        if (!inPause) inPause = { bullets: {} };
        if (!inPause[circle.id]) {
          if (tempStop && tempStop.id === circle.id) {
            circle.dy = tempStop.dy;
            tempStop = undefined;
          }

          inPause = Object.assign(inPause, {
            [circle.id]: {
              dy: circle.dy,
              delay: circle.delay,
            },
          });
          circle.setPause();
        }
      } else if (inPause) {
        circle.setRestore(inPause[circle.id].dy, inPause[circle.id].delay);

        // Меняем цвет снаряда
        if (
          dispatcher.isColorChanged &&
          circle.id === dispatcher.circleClickedID
        ) {
          circle.setBulletColor(dispatcher.circleClickedCurrentColor);
          fnSetIsColorChanged(dispatcher, false);
        }
      }

      // В колобков попали? Тогда меняем цвет и радиус
      if (scores.scoresChanged) {
        if (scores.leftChanged && circle.id === "right") {
          circle.getShot();
          scores.leftChanged = false;
          scores.scoresChanged = false;
        }

        if (scores.rightChanged && circle.id === "left") {
          circle.getShot();
          scores.leftChanged = false;
          scores.scoresChanged = false;
        }
      }

      // Скорость колобков изменилась?
      if (dispatcher.circleVelocityChanged) {
        if (circle.id === dispatcher.circleID) {
          circle.setVelocity(dispatcher.newCircleVelocity);
          fnSetCircleVelocityChanged(dispatcher, false);
        }
      }

      // Наткнулся на мышь?
      const mouseY = Math.pow(dispatcher.mousePosition.y - circle.y, 2);
      const mouseX = Math.pow(dispatcher.mousePosition.x - circle.x, 2);
      const sqrtDistance = Math.sqrt(mouseX + mouseY);

      // Тогда меняем направление
      if (
        sqrtDistance <= KOLOBOK_RADIUS + 10 &&
        sqrtDistance >= KOLOBOK_RADIUS
      ) {
        circle.changeDirection();
      }

      // А если мышь внутри колобка, то останавливаем колобка
      if (sqrtDistance < KOLOBOK_RADIUS) {
        if (!tempStop) {
          tempStop = { dy: 0, id: "" };
          tempStop.dy = circle.dy;
          tempStop.id = circle.id;
          circle.dy = 0;
        }
      } else if (tempStop && tempStop.id === circle.id) {
        // Мышь ушла от колобка
        circle.dy = tempStop.dy;
        tempStop = undefined;
      }
      // ** Столкновение закончилось

      // Клик на Canvas?
      if (dispatcher.isClick) {
        const xDistance = Math.pow(dispatcher.clickPosition.x - circle.x, 2);
        const yDistance = Math.pow(dispatcher.clickPosition.y - circle.y, 2);
        const flag =
          Math.sqrt(xDistance + yDistance) <= KOLOBOK_RADIUS * 2 + CLOSENESS;

        if (flag) {
          ctxUtils.uColorPickerOpen(dispatcher, circle.id, circle.bulletColor);
          fnSetIsPause(dispatcher, true);
          fnSetCircleClickedID(dispatcher, circle.id);
          if (!inPause) inPause = { bullets: {} };
        }
        if (index === 1) {
          fnSetIsClick(dispatcher, false);
        }
      }

      // Отрисовка
      circle.draw();
      countFireStore++;

      // Скорость стрельбы изменилась?
      if (dispatcher.bulletsFrequencyChanged) {
        if (circle.id === dispatcher.circleID) {
          circle.setDelay(dispatcher.newBulletsFrequency);
          dispatcher.bulletsFrequencyChanged = false;
        }
      }

      // Стрелок имеет право стрелять?
      if (circle.id === fireStore) {
        // Запрашиваем заряд
        const charge = circle.fire();
        // Если заряд непустой
        if (charge && !init) {
          // Заряжаем
          if (!dispatcher.isPause) {
            bulletArrs.push(charge);
          }
        }
      } else {
        // Меняем стрелка
        if (!(Math.round(Math.random() * 10 + countFireStore) % 25)) {
          fireStore = fireStore === "left" ? "right" : "left";
        }
      }
    });

    // Если начало игры
    if (init) init = false;

    // Отрисовка bullets
    if (bulletArrs.length > 0) {
      bulletArrs.forEach((bullet) => {
        if (dispatcher.isPause) {
          if (!inPause.bullets[bullet.bulletID]) {
            inPause.bullets[bullet.bulletID] = [
              bullet.x,
              bullet.y,
              bullet.dx,
              bullet.dy,
            ];
          }
          bullet.setPause();
        } else if (inPause && inPause.bullets[bullet.bulletID]) {
          bullet.restore(
            inPause.bullets[bullet.bulletID][0],
            inPause.bullets[bullet.bulletID][1],
            inPause.bullets[bullet.bulletID][2],
            inPause.bullets[bullet.bulletID][3]
          );
        }
        bullet.draw();
      });

      if (!dispatcher.isPause) {
        // ---
        // To Worker
        // ---
        const kolobokLeftXY = kolobokLeft.getXY();
        const kolobokRightXY = kolobokRight.getXY();
        const bulletArrsShalowCopy = bulletArrs.map((bullet) => ({
          x: bullet.x,
          y: bullet.y,
          bulletID: bullet.bulletID,
          id: bullet.id,
        }));

        const dataToWorker = {
          message: "ok",
          payload: {
            bulletArrs: bulletArrsShalowCopy,
            maxX: dispatcher.maxX,
            maxY: dispatcher.maxY,
            BULLET_RADIUS,
            KOLOBOK_RADIUS,
            kolobokLeftXY,
            kolobokRightXY,
            scores: Object.assign({}, scores),
          },
        };
        wrk.postMessage(dataToWorker);

        // ---
        // From Worker
        // ---
        wrk.onmessage = (evnt) => {
          const result = window.structuredClone(evnt.data);

          if (result.message !== "ok") throw new Error();

          const bulletArrsIDs = result.payload.bulletArrsIDs.slice();
          const scoresLeft = result.payload.scores.left;
          const scoresRight = result.payload.scores.right;
          scores.leftChanged = scoresLeft !== scores.left;
          scores.rightChanged = scoresRight !== scores.right;

          if (scores.leftChanged || scores.rightChanged) {
            ctxFns.fnSetScores({
              left: scoresLeft,
              right: scoresRight,
            });
            scores.scoresChanged = true;
          }
          scores.left = scoresLeft;
          scores.right = scoresRight;

          bulletArrs = bulletArrs.filter((bullet) =>
            bulletArrsIDs.includes(bullet.bulletID)
          );
        };
        /// Worker
      }
    }

    if (!dispatcher.isPause && inPause) inPause = undefined;

    // ---
    // Loop
    // ---
    window.requestAnimationFrame(_animateLoop);
  }
  return _animateLoop;
} //<<
