import { Router } from "express";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const app = Router();

app.get("/random-config", (req, res) => {
  res.json({
    samples: rand(0, 200),
    multiplicationFactor: rand(0, 100),
  });
});

export default app;
