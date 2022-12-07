import e from "express";
import express from "express";
import { TempTracker } from "./TempTracker";
const app = express();
const port = 3000;

const temperatureTracker = new TempTracker();

app.get("/", (req, res) => {
  res.redirect("temperature");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const displayCurrentArray = () =>
  `Current array: [${temperatureTracker.getTemps()}]`;

app.get("/temperature", (req, res) => {
  if (!req.query.temperature) {
    res.send(
      `This is not best practice; in truth we should compartmentalize the routes. However, for brevity's sake, this GET will handle everything. To insert a temperature, add a query to the URL like so: http://localhost:${port}/temperature?temperature={temperature}. (Focus routes: http://localhost:${port}/temperature/average, http://localhost:${port}/temperature/mode, http://localhost:${port}/temperature/max, http://localhost:${port}/temperature/min)`
    );
  } else {
    temperatureTracker.insertTemperature(Number(req.query.temperature));
    res.send(
      `Just accepted value ${req.query.temperature}. ${displayCurrentArray()}`
    );
  }
});

app.get("/temperature/average", (req, res) => {
  res.send(
    `Average is ${temperatureTracker.getAverage()}. ${displayCurrentArray()}`
  );
});

app.get("/temperature/mode", (req, res) => {
  res.send(`Mode is ${temperatureTracker.getMode()}. ${displayCurrentArray()}`);
});

app.get("/temperature/max", (req, res) => {
  res.send(`Max is ${temperatureTracker.getMax()}. ${displayCurrentArray()}`);
});

app.get("/temperature/min", (req, res) => {
  res.send(`Min is ${temperatureTracker.getMin()}. ${displayCurrentArray()}`);
});
