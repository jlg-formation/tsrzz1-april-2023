import { cx0, cy0, r0, samples, svgns } from "./constant.js";

console.log("start xxx");

const container = document.querySelector("svg g.samples");
if (container === null) {
  throw new Error("container not found");
}
const lineContainer = document.querySelector("svg g.lines");
if (lineContainer === null) {
  throw new Error("container not found");
}

for (let i = 0; i < samples; i++) {
  const circle = document.createElementNS(svgns, "circle");

  const angle = (i * (2 * Math.PI)) / samples;
  const x = cx0 + r0 * Math.cos(angle);
  const y = cy0 + r0 * Math.sin(angle);

  const r = 1;
  circle.setAttributeNS(null, "cx", x + "");
  circle.setAttributeNS(null, "cy", String(y));
  circle.setAttributeNS(null, "r", r.toString());
  container.appendChild(circle);
}

const multiplicationFactor = 2;
for (let i = 0; i < samples; i++) {
  const line = document.createElementNS(svgns, "line");

  const angle1 = (i * (2 * Math.PI)) / samples;
  const angle2 = angle1 * multiplicationFactor;

  const x1 = cx0 + r0 * Math.cos(angle1);
  const y1 = cy0 + r0 * Math.sin(angle1);

  const x2 = cx0 + r0 * Math.cos(angle2);
  const y2 = cy0 + r0 * Math.sin(angle2);

  line.setAttributeNS(null, "x1", x1 + "");
  line.setAttributeNS(null, "y1", y1 + "");
  line.setAttributeNS(null, "x2", x2 + "");
  line.setAttributeNS(null, "y2", y2 + "");

  lineContainer.appendChild(line);
}
