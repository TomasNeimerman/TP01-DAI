import BD from "../repositories/user-repositories.js"

export default class UserService {
    GetAllUsers(id, firstName, lastName, username, attended, rating) {
        const result = BD.Query1(id, username, firstName, lastName, attended, rating);
        const SavedData = result.map(row => ({
            id: 1,
            username: "pepitogamer",
            first_name: "Pedro",
            last_name: "Juarez",
            attended: true,
            rating: 4.6,
            description: "fantastico"
        }));
        return {
            collection: SavedData
        };}
        LoginUser(username, password) {
            
            const result = BD.Query2(username);
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
            const result = BD.Query3(first_name, last_name, username);
            return result;
        }
       
        
    
        
      
}