import { Config } from "./interfaces/Config";
import { querySelector } from "./misc";

type Callback = (newConfig: Config) => void;

export class ControlPanel {
  callback: Callback = () => {};
  config: Config = {
    multiplicationFactor: 0,
    samples: 0,
  };

  constructor() {
    this.render();
  }

  onChange(callback: Callback) {
    this.callback = callback;
  }

  render() {
    const keys: (keyof Config)[] = Object.keys(this.config) as (keyof Config)[];
    for (const key of keys) {
      const elt = querySelector(`div.control-panel label.${key} .value`);
      console.log("elt: ", elt);
      const value = this.config[key];
      elt.innerHTML = value + "";
    }
  }

  setConfig(config: Config) {
    this.config = config;
    this.render();
  }
}
