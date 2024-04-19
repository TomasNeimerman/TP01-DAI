import express, { response } from "express";
import {UserService} from "../servicios/user-service.js/"
const router = express.Router();
const userService = new UserService();


router.get("/:id/enrollment", (request, response) => {
    const first_name = request.query.fisrt_name
    const last_name = request.query.last_name
    const username = request.query.username
    const attended = request.query.attended
    const rating = request.query.rating
    try{
        const BusquedaUsuario = userService.GetAllUsers(first_name, last_name, username, attended, rating)
        return response.json(BusquedaUsuario)
    }catch(error){
        console.log("Ej 5")
        return response.json("Ej 5")
    }

})
router.post('/user/login', (request, response) => {
    const { username, password } = request.body;
    try {
        const autenticarUsuario = userService.LoginUser(username, password);
        return response.json(autenticarUsuario);
    } catch (error) {
        console.error('Error en la autenticación del usuario:', error);
        return response.status(500).json({ error: 'Error en el servidor' });
    }
});

router.post('/user/register', (request, response) => {
    const { first_name, last_name, username, password } = request.body;
    try {
        const autenticarRegistro = userService.RegisterUser(first_name, last_name, username, password);
        return response.json(autenticarRegistro);
    } catch (error) {
        console.error('Error en el registro de usuario:');
        return response.json('Error en el servidor');
    }
});
export default router;