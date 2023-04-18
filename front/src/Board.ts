import { svgns } from "./constant";
import { Config } from "./interfaces/Config";
import { getAngle, getPoint } from "./math";
import { querySelector, setAttributeNbr } from "./misc";

export class Board {
  config: Config = {
    samples: 0,
    multiplicationFactor: 0,
  };

  clean() {
    querySelector("svg g.samples").innerHTML = "";
    querySelector("svg g.lines").innerHTML = "";
  }

  draw() {
    const container = querySelector("svg g.samples");
    const lineContainer = querySelector("svg g.lines");

    const samples = this.config.samples;
    const multiplicationFactor = this.config.multiplicationFactor;

    for (let i = 0; i < samples; i++) {
      const circle = document.createElementNS(svgns, "circle");

      const angle = getAngle(i, samples);
      const { x, y } = getPoint(angle);
      const r = 1;
      setAttributeNbr(circle, "cx", x);
      setAttributeNbr(circle, "cy", y);
      setAttributeNbr(circle, "r", r);
      container.appendChild(circle);
    }

    for (let i = 0; i < samples; i++) {
      const line = document.createElementNS(svgns, "line");

      const angle1 = getAngle(i, samples);
      const angle2 = angle1 * multiplicationFactor;

      const { x: x1, y: y1 } = getPoint(angle1);
      const p2 = getPoint(angle2);

      setAttributeNbr(line, "x1", x1);
      setAttributeNbr(line, "y1", y1);
      setAttributeNbr(line, "x2", p2.x);
      setAttributeNbr(line, "y2", p2.y);
      lineContainer.appendChild(line);
    }
  }

  redraw() {
    this.clean();
    this.draw();
  }

  setConfig(config: Config) {
    this.config = config;
  }
}
