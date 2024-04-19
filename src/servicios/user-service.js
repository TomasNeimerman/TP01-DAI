export class UserService {
    GetAllUsers(id, firstName, lastName, username, attended, rating) {
        const sql = `
            SELECT 
                u.id, u.username, u.first_name, u.last_name, ee.attended, ee.rating, ee.description 
            FROM 
                users u
            JOIN 
                event_enrollments ee ON u.id = ee.id_user
            WHERE 
                u.id = ${id} AND u.username = ${username} AND u.first_name = ${firstName} AND u.last_name = ${lastName} AND ee.attended = ${attended} AND ee.rating = ${rating}`;
        const result = Bd.Consulta(sql, [id, username, firstName, lastName, attended, rating]);
        const SavedData = result.map(row => ({
            id: row.id,
            username: row.username,
            first_name: row.first_name,
            last_name: row.last_name,
            attended: row.attended,
            rating: row.rating,
            description: row.description
        }));
        return {
            collection: SavedData
        };}
        LoginUser(username, password) {
            const sql = `SELECT id, username, password FROM users WHERE username = '${username}'`;
            const result = Bd.Consulta(sql, [username]);
            if (result.rows.length === 0) {
                return { error: 'Nombre de usuario incorrecto' };
            }
        
            const user = result.rows[0];
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch) {
                return { error: 'Contraseña incorrecta' };
            }
        
           
            return { token }; 
        }
        
  
        RegisterUser(first_name, last_name, username, password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const sql = `INSERT INTO users (first_name, last_name, username, password) VALUES ('${first_name}', '${last_name}', '${username}', '${password}') RETURNING id, username`;
            const result = Bd.Consulta(sql, [first_name, last_name, username, hashedPassword]);
            return result;
        }
        
        GetUser(first_name, last_name, username, attended, rating) {
            const sql = `SELECT id, username, first_name, last_name FROM users WHERE first_name = '${first_name}' AND last_name = '${last_name}' AND username = '${username}'`;
            const result = Bd.Consulta(sql, [first_name, last_name, username]);
            return result.rows;
        }
        
     
        VerifyDescription(enabled_for_enrollment, id_event, max_assistance) {
            
        }
        
      
}