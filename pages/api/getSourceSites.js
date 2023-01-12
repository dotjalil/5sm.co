import { query } from '../../lib/db';

export default async function handler(req, res) {
    try {
        const querySql = `SELECT * FROM SourceSites;`;
        const data = await query({ query: querySql, values: [] });
        res.status(200).json({ data: data }); 
    } catch (error) {
        res.status(500).json({ error: error });
    }
}