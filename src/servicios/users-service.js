export default class UsersService {

//punto 5
listaUsuarios(id){
    const sql = `SELECT U.first_name, U.last_name 
    FROM users U 
    JOIN event_enrollments ER on ER.id_user = U.id 
    JOIN events E on E.id = ER.id_event
    WHERE E.id = '${id}'`

}
}