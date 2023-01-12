import mysql from 'mysql2/promise'

export async function query({query, values = []}) {
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "db_name",
        port: 'port',
        user: "user_name",
        password: "password",
    });
    try {
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();
        return data;
    } catch (error) {
        throw Error(error.message);
    }
    
}