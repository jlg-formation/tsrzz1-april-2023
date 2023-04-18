import { Board } from "./Board";
import "./style.css";

const board = new Board();
board.setConfig({
  samples: 50,
  multiplicationFactor: 3,
});
board.draw();
