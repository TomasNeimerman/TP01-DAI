import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function generateToken(user) {
 
  const options = {
    expiresIn: "1h",
    issuer: "pablo y tomas",
  };

  const payload = {
    id: user.id,
    username: user.username
  };

  console.log(payload);
  const token = jwt.sign(payload, process.env.SECRET_KEY, options);
  return token;
}
