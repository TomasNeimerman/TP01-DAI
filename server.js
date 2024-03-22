import express from "express";
import eventcontroller from "./src/controller/event.controller.js";

const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 3508;
app.use("/event", eventcontroller);
