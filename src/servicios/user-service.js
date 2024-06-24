import BD from "../repositories/user-repositories.js";

const bd = new BD();

export default class UserService {
  async authenticateUser(username, password) {
    const sql = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    const values = [username, password];
    try {
      const result = await bd.query(sql, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error al autenticar usuario: " + error.message);
    }
  }

  async registerUser(first_name, last_name, username, password) {
    const existingUser = await this.findUserByUsername(username);
    if (existingUser) {
      throw new Error("El nombre de usuario ya está en uso.");
    }
    const sql = `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [first_name, last_name, username, password];
    try {
      const result = await bd.query(sql, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error al registrar usuario: " + error.message);
    }
  }

  async findUserByUsername(username) {
    const sql = `SELECT * FROM users WHERE username = $1`;
    const values = [username];
    try {
      const result = await bd.query(sql, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error al buscar usuario por nombre de usuario: " + error.message);
    }
  }
}
