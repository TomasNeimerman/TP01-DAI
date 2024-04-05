export class UserService {
    getAllUsers(pageSize, requestedPage){

      const query = `select * from user limit ${pageSize} offset ${requestedPage}`;
      const query2 = `select count(*) from user`;

        throw new Error("Error en el servicio de usuarios");

        return{
            collection: query,
            pagination:{
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/users?limit=15&offset=1",
                total: query2,
            },
        }
    }
    
}