import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function decryptToken(token) {
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return payload;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
}
