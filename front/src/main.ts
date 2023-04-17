import { samples, svgns } from "./constant";
import { getAngle, getPoint } from "./math";
import { querySelector } from "./misc";
import "./style.css";

const container = querySelector("svg g.samples");
const lineContainer = querySelector("svg g.lines");

for (let i = 0; i < samples; i++) {
  const circle = document.createElementNS(svgns, "circle");

  const angle = getAngle(i, samples);
  const { x, y } = getPoint(angle);
  const r = 1;
  circle.setAttributeNS(null, "cx", x + "");
  circle.setAttributeNS(null, "cy", String(y));
  circle.setAttributeNS(null, "r", r.toString());
  container.appendChild(circle);
}

const multiplicationFactor = 2;
for (let i = 0; i < samples; i++) {
  const line = document.createElementNS(svgns, "line");

  const angle1 = getAngle(i, samples);
  const angle2 = angle1 * multiplicationFactor;

  const { x: x1, y: y1 } = getPoint(angle1);
  const p2 = getPoint(angle2);

  line.setAttributeNS(null, "x1", x1 + "");
  line.setAttributeNS(null, "y1", y1 + "");
  line.setAttributeNS(null, "x2", p2.x + "");
  line.setAttributeNS(null, "y2", p2.y + "");

  lineContainer.appendChild(line);
}
