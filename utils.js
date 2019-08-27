export const getDistances = (pointsArr) => {
  let distances = [];
  let j = pointsArr.length - 1;
  for (let i = 0; i < pointsArr.length; i++) {
    let xPart = Math.pow(pointsArr[i].x - pointsArr[j].x, 2);
    let yPart = Math.pow(pointsArr[i].y - pointsArr[j].y, 2);
    distances[i] = Math.sqrt(xPart + yPart);
    j = i;
  }
  return distances;
}

export const getArea = (pointsArr, numPoints) => {
  let area = 0;
  let j = numPoints - 1;
  for (i = 0; i < numPoints; i++) {
    area =
      area +
      (pointsArr[j].x + pointsArr[i].x) * (pointsArr[j].y - pointsArr[i].y);
    j = i;
  }
  return Math.abs(area / 2);
}
