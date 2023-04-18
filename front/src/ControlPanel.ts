import { step } from "./constant";
import { Config } from "./interfaces/Config";
import { getKeys, querySelector, sleep } from "./misc";

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

  async play() {
    while (this.isPlaying) {
      await sleep(200);
      console.log("increment");

      let mf = this.config.multiplicationFactor;
      mf = mf + step;
      console.log("mf: ", mf);
      mf = mf % 100;
      mf = Math.round(mf * 1e2) / 1e2;
      console.log("mf: ", mf);
      this.config.multiplicationFactor = mf;

      this.render();
      this.callback(this.config);
    }
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
      if (this.isPlaying) {
        this.play();
      }
    });
  }

  setConfig(config: Config) {
    this.config = config;
    this.render();
  }
}
