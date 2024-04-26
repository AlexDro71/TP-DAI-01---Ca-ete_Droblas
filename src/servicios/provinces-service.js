export default class ProvincesService {

    //Punto 7
    async crearProvince(name, fullName, latitude, longitude) {
        const sql = `
            INSERT INTO provinces (name, full_name, latitude, longitude)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await pool.query(sql, [name, fullName, latitude, longitude]);
        return rows[0];
    }

    async getAllProvinces(pageSize = 10, page = 0) {
        const offset = pageSize * page;
        const sql = `
            SELECT * FROM provinces
            ORDER BY id
            LIMIT $1 OFFSET $2
        `;
        const { rows } = await pool.query(sql, [pageSize, offset]);
        return rows;
    }

    async getProvinceById(id) {
        const sql = `
            SELECT * FROM provinces
            WHERE id = $1
        `;
        const { rows } = await pool.query(sql, [id]);
        return rows[0];
    }

    async putProvince(id, name, fullName, latitude, longitude) {
        const sql = `
            UPDATE provinces
            SET name = $1, full_name = $2, latitude = $3, longitude = $4
            WHERE id = $5
            RETURNING *
        `;
        const { rows } = await pool.query(sql, [name, fullName, latitude, longitude, id]);
        return rows[0];
    }

    async borrarProvince(id) {
        const sql = `
            DELETE FROM provinces
            WHERE id = $1
        `;
        await pool.query(sql, [id]);
    }
}
