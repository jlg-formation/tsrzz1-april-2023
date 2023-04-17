console.log("start");

const cx0 = 50;
const cy0 = 50;
const r0 = 45;

const svgns = "http://www.w3.org/2000/svg";
const container = document.querySelector("svg g.samples");

const samples = 10;
for (let i = 0; i < samples; i++) {
  const circle = document.createElementNS(svgns, "circle");

  const angle = (i * (2 * Math.PI)) / samples;
  const x = cx0 + r0 * Math.cos(angle);
  const y = cy0 + r0 * Math.sin(angle);

  const r = 1;
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", r);
  container.appendChild(circle);
}
