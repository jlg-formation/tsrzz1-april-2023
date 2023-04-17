console.log("start");

const svgns = "http://www.w3.org/2000/svg";
const container = document.querySelector("svg g.samples");

const samples = 10;
for (let i = 0; i < samples; i++) {
  const circle = document.createElementNS(svgns, "circle");

  const x = 34;
  const y = 52;

  const r = 1;
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", r);
  container.appendChild(circle);
}
