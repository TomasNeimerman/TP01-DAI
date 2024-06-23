import BD from "../repositories/user-repositories.js"
const bd = new BD();

export default class UserService {
    async autenticarUsuario(username, password) {
        const sql = `
            SELECT *
            FROM users
            WHERE username = $1 AND password = $2
        `;
        const values = [username, password];
        try {
            const rta = await bd.Consulta(sql, values);
            return rta.rows[0];
        } catch (error) {
            throw new Error("Error al autenticar usuario: " + error.message);
        }
    }
    async autenticarRegistro(first_name, last_name, username, password) {
        const existingUser = await this.buscarUsuarioPorUsername(username);
        if (existingUser) {
            throw new Error("El nombre de usuario ya está en uso.");
        }
        const sql = `
            INSERT INTO users (first_name, last_name, username, password)
            VALUES ('${first_name}', '${last_name}', '${username}', '${password}')
        `;
        const values = [first_name, last_name, username, password];
        try {
            const rta = await bd.Consulta(sql, values);
            return rta.rows[0];
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error.message);
        }
    }
    async buscarUsuarioPorUsername(username) {
        const sql = `
            SELECT *
            FROM users
            WHERE username = $1
        `;
        const values = [username];
        try {
            const rta = await bd.Consulta(sql, values); 
            return rta.rows[0];
        } catch (error) {
            throw new Error("Error al buscar usuario por nombre de usuario: " + error.message);
        }  
    }
}