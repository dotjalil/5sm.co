import { query } from '../../lib/db';
const fs = require('fs');

export default async function handler(req, res) {
    try {
        const querySql = "SELECT BrandID, BrandName, BrandNameAR, Logo FROM Brands";
        const valueParams = [];
        const data = await query({ query: querySql, values: [valueParams] });
        fs.writeFileSync('data/keywords.json', JSON.stringify(data, null, 4));
        res.status(200).json( data );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}