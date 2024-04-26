import express from "express";
import eventcontroller from "./src/controller/event.controller.js";

const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 3000;
app.use("/event", eventcontroller);
app.use(cors());
app.use(express.json());
app.use('/front',express.static('public'));
app.use("/api/event", EventRouter);
app.use("/api/provinces", ProvinceRouter);
app.use("/api/user", UserRouter);
app.listen(port, ()=>{
    console.log(`"server" Listening on port ${port}`)
})
