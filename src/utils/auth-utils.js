import express from 'express'
import cors from 'cors'


            function desencriptarToken(vtoken){
            const secretKey = "UmDoisTreisTriesDoisUmoTodoMundoSobreDoisRaizEmCadaUno";
            let token = vtoken;
            let payloadOriginal = null;
            try{
                payloadOriginal = jwt.verify(token, secretKey);
            } catch (e){
                console.error(e);
            }
        }

export function authMiddleware(request, response, next){
    if(!request.headers.authorization){
        response.status(403).json({message: "Token no existe"})
    }else{
        console.log(request.token)
        const desencriptado = desencriptarToken(request.token)
        if(!desencriptado){
            response.status(401).json({message: "No autenticado"})
        }else{
            request.user = payload;
            next();

        }
    }
}