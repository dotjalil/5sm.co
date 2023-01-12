import mysql from 'mysql2/promise'

export async function query({query, values = []}) {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const db_name = process.env.DB_NAME;
    const db_user = process.env.DB_USER;
    const db_password = process.env.DB_PASSWORD;
    
    const dbconnection = await mysql.createConnection({
        host: host,
        database: db_name,
        port: port,
        user: db_user,
        password: db_password,
    });
    try {
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();
        return data;
    } catch (error) {
        throw Error(error.message);
    }
    
}