import { useRouter } from 'next/router';


const GetCountry = function (){
    const countryList = [
        {
            CountryID: 1,
            CountryName: 'Egypt',
            CountryNameAR: 'مصر',
            CountryCode: 'EG',
            CountryLogo: '/eg.svg',
            Locale: 'ar-EG',
        },
        {
          CountryID: 2,
          CountryName: 'ٍSaudi Arabia',
          CountryNameAR: 'السعودية',
          CountryCode: 'SA',
          CountryLogo: '/sa.svg',
          Locale: 'ar-SA',
        },
        {
          CountryID: 3,
          CountryName: 'United Arab Emirates',
          CountryNameAR: 'الإمارات',
          CountryCode: 'AE',
          CountryLogo: '/ae.svg',
          Locale: 'ar-AE',
        },
        {
          CountryID: 4,
          CountryName: 'Qatar',
          CountryNameAR: 'قطر',
          CountryCode: 'QA',
          CountryLogo: '/qa.svg',
          Locale: 'ar-QA',
        },
        {
          CountryID: 5,
          CountryName: 'Kuwait',
          CountryNameAR: 'الكويت',
          CountryCode: 'KW',
          CountryLogo: '/kw.svg',
          Locale: 'ar-KW',
        },
        {
          CountryID: 6,
          CountryName: 'Bahrain',
          CountryNameAR: 'البحرين',
          CountryCode: 'BH',
          CountryLogo: '/bh.svg',
          Locale: 'ar-BH',
        },
        {
          CountryID: 7,
          CountryName: 'Oman',
          CountryNameAR: 'عمان',
          CountryCode: 'OM',
          CountryLogo: '/om.svg',
          Locale: 'ar-OM',
        },
        {
          CountryID: 8,
          CountryName: 'Jordan',
          CountryNameAR: 'الأردن',
          CountryCode: 'JO',
          CountryLogo: '/jo.svg',
          Locale: 'ar-JO',
        },
        {
          CountryID: 9,
          CountryName: 'Morocco',
          CountryNameAR: 'المغرب',
          CountryCode: 'MA',
          CountryLogo: '/ma.svg',
          Locale: 'ar-MA',
        }
    ];

    const router = useRouter();
    const countryLocale = router.locale.split('-')[1];
    const [country] = countryList.filter(countryObj=>countryObj.CountryCode == countryLocale);
    return [
      country,
      countryList
    ]
}

export default GetCountry;