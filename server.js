import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvincesController from "./src/controllers/provinces-controller.js";
import express from "express"

const app = express(); 
app.use(express.json()); 
const port = 3000;

app.use("/event", EventController);
app.use("/user", UserController);
app.use("/provincia", ProvincesController);

app.listen(port, () =>{
    console.log("Anda el server")
})