// eslint-disable-next-line import/no-anonymous-default-export
export function mainWorker() {
  // ---
  // get message
  // ---
  /* eslint-disable-next-line no-restricted-globals */
  self.onmessage = (evnt) => {
    if (evnt.data.message !== "ok") throw new Error();

    const data = Object.assign({}, evnt.data);
    const dataToExport = { bulletArrsIDs: [], scores: { left: 0, right: 0 } };

    let bulletArrs = data.payload.bulletArrs;
    const BULLET_RADIUS = data.payload.BULLET_RADIUS;
    const KOLOBOK_RADIUS = data.payload.KOLOBOK_RADIUS;

    const maxX = data.payload.maxX;
    const maxY = data.payload.maxY;
    const kolobokLeftXY = data.payload.kolobokLeftXY;
    const kolobokRightXY = data.payload.kolobokRightXY;
    const scores = data.payload.scores;

    // Убираем все bullets за границами canvas
    bulletArrs = bulletArrs.reduce((newBArr, bullet) => {
      const bulletFlag =
        bullet.x < 0 || bullet.x > maxX || bullet.y < 0 || bullet.y > maxY
          ? false
          : true;
      if (bulletFlag) newBArr.push(bullet);
      return newBArr;
    }, []);
    //<< Убрали

    // Убираем все bullets, которые врезались друг в друга
    const bulletArrsX = bulletArrs.map((bullet) => bullet.x).sort();
    const xCollision = [];

    for (let i = 0, len = bulletArrsX.length, last = len - 1; i < len; i++) {
      if (i !== last) {
        const x1 = bulletArrsX[i];
        const x2 = bulletArrsX[i + 1];

        if (Math.abs(x1 - x2) <= BULLET_RADIUS * 2) {
          xCollision.push([x1, x2]);
        }
      }
    }

    if (xCollision.length > 0) {
    }

    const elementsToKill = new Set();

    xCollision.forEach((tupple, inx) => {
      const x1Bullets = bulletArrs.filter((bullet) => bullet.x === tupple[0]);
      const x2Bullets = bulletArrs.filter((bullet) => bullet.x === tupple[1]);

      x1Bullets.forEach((bullet1) => {
        let isKilled = false;
        x2Bullets.forEach((bullet2) => {
          if (bullet1.bulletID !== bullet2.bulletID) {
            const xDistance = bullet1.x - bullet2.x;
            const yDistance = bullet1.y - bullet2.y;
            const flag =
              Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)) <
              BULLET_RADIUS * 2;

            if (flag) {
              elementsToKill.add(bullet2.bulletID);
              isKilled = true;
            }
          }
        });
        if (isKilled) elementsToKill.add(bullet1.bulletID);
      });
    });

    bulletArrs = bulletArrs.filter(
      (bullet) => !elementsToKill.has(bullet.bulletID)
    );
    //<< Убрали

    // Ищем попадания в Колобков
    const idBulletsToKill = [];
    const bulletsLeftArr = bulletArrs.filter((bullet) => bullet.id === "left");
    const bulletsRightArr = bulletArrs.filter(
      (bullet) => bullet.id === "right"
    );

    bulletsLeftArr.forEach((leftBullet) => {
      const xDistance = kolobokRightXY[0] - leftBullet.x;
      const yDistance = kolobokRightXY[1] - leftBullet.y;

      const flag =
        Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)) <
        KOLOBOK_RADIUS * 0.6 + BULLET_RADIUS;

      if (flag) {
        scores.left += 1;
        idBulletsToKill.push(leftBullet.bulletID);
      }
    });

    bulletsRightArr.forEach((rightBullet) => {
      const xDistance = kolobokLeftXY[0] - rightBullet.x;
      const yDistance = kolobokLeftXY[1] - rightBullet.y;

      const flag =
        Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)) <
        KOLOBOK_RADIUS + BULLET_RADIUS;

      if (flag) {
        scores.right += 1;
        idBulletsToKill.push(rightBullet.bulletID);
      }
    });
    //<< Нашли

    // Убираем bullets, попавшие в Колобков
    bulletArrs = bulletArrs.filter(
      (bullet) => !idBulletsToKill.includes(bullet.bulletID)
    );
    //<< Убрали

    // Получаем bulletID оставшихся
    const bulletArrsIDs = bulletArrs.map((bullet) => bullet.bulletID);

    // ---
    // to Export
    // ---
    dataToExport.bulletArrsIDs = bulletArrsIDs;
    dataToExport.scores = scores;

    // ---------
    // send message
    // ---------
    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage({
      message: "ok",
      payload: dataToExport,
    });
  };
}
