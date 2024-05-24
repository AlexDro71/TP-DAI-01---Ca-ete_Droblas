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
    validarMail = async(email) => {
        regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(regex.test(mail)){
            return true;
        }else{
            return false;
        }
    
    }
        


}