import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
// interval wanneer er een nieuwe wall spawned
const WALL_INTERVAL_MIN = 700;
const WALL_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextWallTime;
export function setupWall() {
  nextWallTime = WALL_INTERVAL_MIN;
  document.querySelectorAll("[data-wall]").forEach((wall) => {
    wall.remove();
  });
}

export function updateWall(delta, speedScale) {
  document.querySelectorAll("[data-wall]").forEach((wall) => {
    incrementCustomProperty(wall, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(wall, "--left") <= -100) {
      wall.remove();
    }
  });

  if (nextWallTime <= 0) {
    createWall();
    nextWallTime =
      randomNumberBetween(WALL_INTERVAL_MIN, WALL_INTERVAL_MAX) / speedScale;
  }
  nextWallTime -= delta;
}

export function getWallRects() {
  return [...document.querySelectorAll("[data-wall]")].map((wall) => {
    return wall.getBoundingClientRect();
  });
}

function createWall() {
  const wall = document.createElement("img");
  wall.dataset.wall = true;
  wall.src = "imgs/wall.png";
  wall.classList.add("wall");
  setCustomProperty(wall, "--left", 100);
  worldElem.append(wall);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
