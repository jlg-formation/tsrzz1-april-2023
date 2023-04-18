import { Config } from "./interfaces/Config";
import { getKeys, querySelector } from "./misc";

type Callback = (newConfig: Config) => void;

export class ControlPanel {
  callback: Callback = () => {};
  config: Config = {
    multiplicationFactor: 0,
    samples: 0,
  };
  isPlaying = false;

  constructor() {
    this.setActions();
    this.render();
  }

  onChange(callback: Callback) {
    this.callback = callback;
  }

  render() {
    const keys = getKeys(this.config);
    for (const key of keys) {
      const elt = querySelector(`div.control-panel label.${key} .value`);

      const value = this.config[key];
      elt.innerHTML = value + "";

      const sliderElt = querySelector(
        `div.control-panel label.${key} input`,
        HTMLInputElement
      );

      sliderElt.value = value + "";
    }
    const playBtn = querySelector("div.control-panel div.buttons button.play");
    playBtn.innerHTML = this.isPlaying ? "Pause" : "Play";
  }

  setActions() {
    const keys = getKeys(this.config);
    for (const key of keys) {
      const sliderElt = querySelector(
        `div.control-panel label.${key} input`,
        HTMLInputElement
      );
      sliderElt.addEventListener("input", () => {
        this.config[key] = Number(sliderElt.value);
        this.render();
        this.callback(this.config);
      });
    }

    const playBtn = querySelector("div.control-panel div.buttons button.play");
    console.log("playBtn: ", playBtn);
    playBtn.addEventListener("click", () => {
      console.log("click");
      this.isPlaying = !this.isPlaying;
      this.render();
    });
  }

  setConfig(config: Config) {
    this.config = config;
    this.render();
  }
}
