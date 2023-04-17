import { cx0, cy0, r0 } from "./constant";
import { Point } from "./interfaces/Point";

export const getAngle = (index: number, samples: number): number =>
  (index * (2 * Math.PI)) / samples;

export const getPoint = (angle: number): Point => {
  return { x: cx0 + r0 * Math.cos(angle), y: cy0 + r0 * Math.sin(angle) };
};
