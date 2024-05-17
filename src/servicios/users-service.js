import jwt from 'jsonwebtoken';
import UsersRepository from './../../src/repositories/users-repository';  

export default class UsersService {
    crearUsuario = async (first_name, last_name, username, password) => {
        const repo = new UsersRepository();
        const returnArray = await repo.crearUsuario(first_name, last_name, username, password);
        return returnArray;
    }
    recibirToken = async (username, password) => {
        const repo = new UsersRepository();
        const validarUsuario = repo.validarUsuario(username, password)
        if(validarUsuario){
            return generarToken(validarUsuario.id, validarUsuario.username)
            
        }else{
            return false;
        }
    }
    generarToken = async (id, username) =>{
        const payload = {
            id: id,
            username: username
        }
        
        const secretKey = 'UmDoisTreisTriesDoisUmoTodoMundoSobreDoisRaizEmCadaUno'
        
        const options = {
            expiresIn : "4 Hours",
            issuer : 'santiago'
        }
        
        const token = jwt.sign(payload, secretKey, options)
        return token;
        }
        


}