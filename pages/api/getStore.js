import { query } from '../../lib/db';

export default async function handler(req, res) {
    const id = req.body.id;
    const countryId = req.body.countryId;
    try {
        const querySql = `SELECT * FROM Brands JOIN Coupons USING (BrandID) WHERE BrandID = '${id}' AND CountryID = '${countryId}'`;
        const valueParams = [id];
        const data = await query({ query: querySql, values: [valueParams] });
        res.status(200).json({ storeData: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}