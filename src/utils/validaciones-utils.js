export default class Validaciones{
    async existeObjeto(tabla, id){
        const sql = `SELECT  * FROM `+tabla+` WHERE id='${id}'`
        const response = await this.DBClient.query(sql);
        if(response.rows.length>0){
            return true;
        }else{
            return false;
        }
    }

    async menor3(campo){
        if(campo.length < 3){
            return true;
        }else{
            return false;
        }

    }

    async notANumber(campo){
        return isNaN(campo);
    }

    async asistenciaMayorACapacidad(max_assistance, id_event_location){
        const sql = `SELECT max_capacity FROM event_locations WHERE id = '${id_event_location}'`
        const response = await this.DBClient.query(sql);
        if(max_assistance > parseInt(response.rows[0].max_capacity)){
            return true;
        }else{
            return false;
        }

    }

    async min1Usuario(id){
            const sql = `SELECT COUNT(*) FROM event_enrollments WHERE id_Event = '${id}'`
            const response = await this.client.query(sql)
            if(response.rows>0){
                return true;
            }else{
                return false;
            }
    }
    



}