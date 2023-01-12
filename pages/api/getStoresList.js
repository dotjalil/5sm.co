import { query } from '../../lib/db';

// async function getCounts(data, countryId) {
//     data.map(async (brand) => {
//         const countCouponsQuery = `SELECT COUNT(*) as count_coupons FROM Coupons WHERE BrandID = '${brand.BrandID}' AND CountryID = '${countryId}'`
//         const count = await query({ query: countCouponsQuery, values: [brand.BrandID, countryId] });
//         brand.CouponCount = count
//     })
// }

export default async function handler(req, res) {
    const countryId = req.body.countryId;
    console.log('contryId: ', req.body.countryId);
    try {
        const querySql = `SELECT * FROM Brands WHERE EXISTS (SELECT * FROM Coupons WHERE Coupons.BrandID = Brands.BrandID and Coupons.CountryID = '${countryId}');`;
        const valueParams = [countryId];
        const data = await query({ query: querySql, values: [valueParams] });
        // const newData = await getCounts(data, countryId);
        // const newData = await query({ query: 'SELECT COUNT(*) as count_coupons FROM Coupons WHERE BrandID = 1 AND CountryID = 1', values: [] })
        // console.log('new data', newData)
        // console.log(data);
        res.status(200).json({ brands: data }); 
    } catch (error) {
        res.status(500).json({ error: error });
    }
}