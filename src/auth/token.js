import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function generarToken(usuario) {
    const options = {
        expiresIn: "1h", 
        issuer: "neotictom",
    };

  
    const payload = {
        id: usuario.id,
        username: usuario.username,
  
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    return token;
}