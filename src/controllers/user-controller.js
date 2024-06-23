import express from "express";
import UsuarioServicios1 from "../servicios/user-service.js";
import generarToken from "../auth/token.js"; 
import AuthMiddleware from "../auth/authMiddleware.js"


const router = express.Router();
const UsuarioServicios = new UsuarioServicios1();

router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  let message = ""
  let success = ""
  try {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(regex.test(username)){
      success = true
    }else{
      return response.status(400).json({
        success: false,
        message: "El email es invalido.",
        token: ""
      })
    }
    const usuario = await UsuarioServicios.autenticarUsuario(
      username,
      password
    );
    if (!usuario) {
      return response.status(401).json({ 
        success: false,
        message: "Usuario o clave inválida",
        token: ""});
    }
    const token = await generarToken(usuario);
    return response.json({ 
      success: true,
      message : "",
      token });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    return response.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/register", async (request, response) => {
  const { first_name, last_name, username, password } = request.body;
  try {
    const AutenticarRegistro = await UsuarioServicios.autenticarRegistro(
      first_name,
      last_name,
      username,
      password
    );
    return response.json(AutenticarRegistro);
  } catch (error) {
    console.error("Error durante el registro de usuario:", error);
    return response.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/", AuthMiddleware, async (request, response) => {
    try {
        const usuario = request.user;
        return response.json(usuario);
    } catch(error) {
        console.error("Error al obtener la información del usuario:", error);
        return response.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;