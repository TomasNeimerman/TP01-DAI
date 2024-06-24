import express from "express";
import UserService from "../servicios/user-service.js";
import generateToken from "../auth/token.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const router = express.Router();
const userService = new UserService();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(username)) {
      return res.status(400).json({
        success: false,
        message: "El email es inválido.",
        token: ""
      });
    }
    const user = await userService.authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Usuario o clave inválida",
        token: ""
      });
    }
    const token = await generateToken(user);
    return res.json({ 
      success: true,
      message: "Logeado exitosamente",
      token
    });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    const registerResponse = await userService.registerUser(first_name, last_name, username, password);
    return res.json(registerResponse);
  } catch (error) {
    console.error("Error durante el registro de usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    return res.json(user);
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
