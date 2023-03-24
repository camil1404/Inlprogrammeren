// https://www.deviantart.com/hadouuuken/art/Clash-Royale-Hog-Rider-658716963
//hogrider
import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const hogElem = document.querySelector("[data-hog]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const HOG_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let hogFrame;
let currentFrameTime;
let yVelocity;
export function setupHog() {
  isJumping = false;
  hogFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(hogElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateHog(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getHogRect() {
  return hogElem.getBoundingClientRect();
}
//grafsteen
export function setHogLose() {
  hogElem.src = "/imgs/tombe.png";
}
// afbeelding tijdens het springen
function handleRun(delta, speedScale) {
  if (isJumping) {
    hogElem.src = `imgs/hogpix.png`;
    return;
  }
  // afbeelding switch
  if (currentFrameTime >= FRAME_TIME) {
    hogFrame = (hogFrame + 1) % HOG_FRAME_COUNT;
    hogElem.src = `imgs/run-${hogFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(hogElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(hogElem, "--bottom") <= 0) {
    setCustomProperty(hogElem, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
