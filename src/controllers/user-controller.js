import express from "express"
import UsuarioServicios from "../servicios/user-service.js";

const router = express.Router();
const userService = new UsuarioServicios();

router.post("/login", async (request, response) => {
    const { username, password } = request.body;
    try {
        const usuario = await userService.autenticarUsuario(username, password);
        if (!usuario) {
            return response.status(401).json({ error: 'Credenciales inválidas' });
        }
        return response.json(usuario);
    } catch (error) {
        console.error('Error en la autenticación del usuario:', error);
        return response.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
});


router.post("/register", (request, response) => {
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