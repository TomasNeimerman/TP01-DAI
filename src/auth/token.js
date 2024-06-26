import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function generateToken(user) {
 
  const options = {
    expiresIn: "1h",
    issuer: "neotictom",
  };

  const payload = {
    id: user.id,
    username: user.username
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, options);
  return token;
}
