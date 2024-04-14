type cords = {
  x: number;
  y: number;
};
type confetti = {
  color: { front: string; back: string };
  dimensions: cords;
  position: cords;
  rotation: number;
  scale: cords;
  velocity: cords;
};
type color =
  | "red"
  | "darkred"
  | "green"
  | "darkgreen"
  | "blue"
  | "darkblue"
  | "yellow"
  | "darkyellow"
  | "orange"
  | "darkorange"
  | "pink"
  | "darkpink"
  | "purple"
  | "darkpurple"
  | "turquoise"
  | "darkturquoise";
type colorPair = { front: color; back: color };

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const confettiCount = 200;
const confetti: confetti[] = [];
const colors: colorPair[] = [
  { front: "red", back: "darkred" },
  { front: "green", back: "darkgreen" },
  { front: "blue", back: "darkblue" },
  { front: "yellow", back: "darkyellow" },
  { front: "orange", back: "darkorange" },
  { front: "pink", back: "darkpink" },
  { front: "purple", back: "darkpurple" },
  { front: "turquoise", back: "darkturquoise" },
];

export const setCanvas = (
  canvasP: HTMLCanvasElement,
  ctxP: CanvasRenderingContext2D,
  parent: HTMLElement
) => {
  canvas = canvasP;
  ctx = ctxP;
  resizeCanvas(parent);
};

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const resizeCanvas = (parent: HTMLElement) => {
  const { width, height } = parent.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;
};

export const initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1,
      },
      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
};
export const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    const width = confetto.dimensions.x * confetto.scale.x;
    const height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(
      confetto.velocity.y + gravity,
      terminalVelocity
    );
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length >= 1) {
    window.requestAnimationFrame(render);
  }
  
};
