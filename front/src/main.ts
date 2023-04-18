import { Board } from "./Board";
import { ControlPanel } from "./ControlPanel";
import { Config } from "./interfaces/Config";
import "./style.scss";

const board = new Board();
const config: Config = {
  samples: 50,
  multiplicationFactor: 3,
};
board.setConfig(config);
board.draw();

const controlPanel = new ControlPanel();
controlPanel.setConfig(config);
controlPanel.onChange((newConfig) => {
  board.setConfig(newConfig);
  board.redraw();
});
