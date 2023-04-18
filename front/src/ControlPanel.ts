import { Observable, Subscription, map, timer } from "rxjs";
import { step, url } from "./constant";
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
  subscription?: Subscription;
  o: Observable<void>;

  constructor() {
    this.o = timer(0, 16).pipe(
      map(() => {
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
      })
    );
    this.setActions();
    this.render();
  }

  onChange(callback: Callback) {
    this.callback = callback;
  }

  async play() {
    this.subscription = this.o.subscribe();
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
        return;
      }
      this.pause();
    });

    const randomConfigBtn = querySelector(
      "div.control-panel div.buttons button.random"
    );
    console.log("randomConfigBtn: ", randomConfigBtn);
    randomConfigBtn.addEventListener("click", () => {
      console.log("click");
      (async () => {
        const response = await fetch(url);
        console.log("response: ", response);
        const config = await response.json();
        console.log("config: ", config);
        this.config = config;
        this.render();
        this.callback(this.config);
      })();
    });
  }
  pause() {
    this.subscription?.unsubscribe();
  }

  setConfig(config: Config) {
    this.config = config;
    this.render();
  }
}
