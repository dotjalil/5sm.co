import { query } from '../../lib/db';

export default async function handler(req, res) {
    const countryId = req.body.countryId;
    try {
        const querySql = `SELECT BrandID, COUNT(*) as CouponsCount FROM Coupons WHERE CountryID = '${countryId}' GROUP BY BrandID, CountryID;`;
        const valueParams = [countryId];
        const data = await query({ query: querySql, values: [valueParams] });
        res.status(200).json({ data: data }); 
    } catch (error) {
        res.status(500).json({ error: error });
    }
}