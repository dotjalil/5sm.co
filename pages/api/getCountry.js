import { query } from '../../lib/db';

export default async function handler(req, res) {
    try {
        const querySql = `SELECT * FROM Countries`;
        const valueParams = [];
        const data = await query({ query: querySql, values: [valueParams] });
        res.status(200).json( data );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}