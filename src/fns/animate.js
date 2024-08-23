// ===
// import
// ===
import { wrk } from "..";

// ===
// main
// ===
export function animate(ctx, circlesArr, maxX, maxY, dispatcher) {
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
  };

  let inPause = undefined; // {}
  let tempStop = undefined; // {dy: number, id: "right" | "left"}

  function _animateLoop() {
    ctx.clearRect(0, 0, maxX, maxY);
    circlesArr.forEach((circle, index) => {
      // Если пауза
      if (dispatcher.isPause) {
        if (!inPause) inPause = { bullets: {} };
        if (!inPause[circle.id]) {
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
          dispatcher.fnSetIsColorChanged(false);
        }
      }

      // Скорость колобков изменилась?
      if (dispatcher.circleVelocityChanged) {
        if (circle.id === dispatcher.circleID) {
          circle.setVelocity(dispatcher.newCircleVelocity);
          dispatcher.fnSetCircleVelocityChanged(false);
        }
      }

      // Наткнулся на мышь?
      const mouseY = Math.pow(dispatcher.mousePosition.y - circle.y, 2);
      const mouseX = Math.pow(dispatcher.mousePosition.x - circle.x, 2);
      const sqrtDistance = Math.sqrt(mouseX + mouseY);

      // Тогда меняем направление
      if (
        sqrtDistance <= KOLOBOK_RADIUS + 5 &&
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
      //<< Столкновение закончилось

      // Клик на Canvas?
      if (dispatcher.isClick) {
        const xDistance = Math.pow(dispatcher.clickPosition.x - circle.x, 2);
        const yDistance = Math.pow(dispatcher.clickPosition.y - circle.y, 2);
        const flag =
          Math.sqrt(xDistance + yDistance) <= KOLOBOK_RADIUS * 2 + CLOSENESS;

        if (flag) {
          dispatcher.fnColorPickerOpen(circle.id, circle.bulletColor);
          dispatcher.fnSetIsPause(true);
          dispatcher.fnSetCircleClickedID(circle.id);
          if (!inPause) inPause = { bullets: {} };
        }
        if (index === 1) {
          dispatcher.fnSetIsClick(false);
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
            maxX,
            maxY,
            BULLET_RADIUS,
            KOLOBOK_RADIUS,
            kolobokLeftXY,
            kolobokRightXY,
            scores,
          },
        };
        wrk.postMessage(dataToWorker);

        // ---
        // From Worker
        // ---
        let bulletArrsIDs = [];
        wrk.onmessage = (evnt) => {
          const result = evnt.data;

          if (result.message !== "ok") throw new Error();

          bulletArrsIDs = result.payload.bulletArrsIDs;
          const scoresLeft = result.payload.scores.left;
          const scoresRight = result.payload.scores.right;
          if (scoresLeft !== scores.left || scoresRight !== scores.right) {
            dispatcher.fnSetScores({ left: scoresLeft, right: scoresRight });
          }
          scores.left = scoresLeft;
          scores.right = scoresRight;

          bulletArrs = bulletArrs.filter((bullet) =>
            bulletArrsIDs.includes(bullet.bulletID)
          );
        };
        //<< Worker
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
