import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import GetCountry from '../helper/getCountry'
import Image from 'next/image'
import { useRouter } from 'next/router';


function Home({data}) {
  const router = useRouter();
  const [keywords, setKeywords] = useState(null)
  const [brandsList, setBrandsList] = useState(null);
  const [couponCountList, setCouponCountList] = useState(null);
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  
  const [country] = GetCountry();

  // Get stores data
  useEffect(() => {
    async function getStoresList() {
      const apiUrlEndpoint = 'http://localhost:3000/api/getStoresList';
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryId: country.CountryID,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      const brands = res.brands;
      brands.sort((a, b) => a.BrandName.localeCompare(b.BrandName));
      setBrandsList(brands);
    }
    getStoresList();
  }, [router])


  // Get coupon counts list
  useEffect(() => {
    async function getCouponCountList() {
      const apiUrlEndpoint = 'http://localhost:3000/api/getCouponsCount';
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryId: country.CountryID,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      const countList = res.data;
      // brands.sort((a, b) => a.BrandName.localeCompare(b.BrandName));
      // setBrandsList(brands);
      setCouponCountList(countList)
    }
    getCouponCountList();
  }, [brandsList])

  // Get search keywords
  useEffect(() => {
    async function getSearchKeywords() {
      const apiUrlEndpoint = 'http://localhost:3000/api/getKeywords';
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
    }
    getSearchKeywords();
  }, [])

  // function saveKeywordFile() {
    
  // }

  function displayCouponsCount(brandId) {
    let countObj = couponCountList.filter(countItem => countItem.BrandID == brandId)
    return countObj[0].CouponsCount;
  }

  return (
    <>
      <div>
        {
          brandsList 
          && 
          (
            <table className="min-w-max w-full table-fixed">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs leading-normal">
                  <th className="w-72 py-3 px-6 text-right">البراند</th>
                  <th className="py-3 px-6 text-center">عدد الكوبونات</th>
                  <th className="py-3 px-6 text-center">أخر تحديث</th>
                  <th className="py-3 px-6 text-center">التصنيف</th>
                </tr>
              </thead>
            </table>
          )
        }
        {
          brandsList && alpha.map((char) => {
            let group = brandsList.filter((brand) => brand.BrandName[0].toLowerCase() == char)
            
            return (
              <>
                <table 
                key={char}
                className="min-w-max w-full table-fixed"
                >
                  <thead className='bg-gray-50'>
                    <tr className="text-gray-600 bg-gray-50 text-sm leading-normal">
                      <th className="w-72 py-3 px-6 text-right text-lg">{char.toUpperCase()}</th>
                      <th className="py-3 px-6 text-right"></th>
                      <th className="py-3 px-6 text-right"></th>
                      <th className="py-3 px-6 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {
                      group.map(brand => {
                        return (
                          <tr 
                          key={brand.BrandID}
                          className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="w-1/10 py-3 px-6 text-right whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-2">
                                  {brand.Logo && 
                                  <Image 
                                    className='rounded-full' 
                                    width="48"
                                    height="48"
                                    alt="{brand.BrandName}"
                                    src={brand.Logo} 
                                  />
                                  }
                                </div>
                                <Link 
                                  href={`/store/${brand.BrandID}`} 
                                  className="font-medium"
                                >
                                  {brand.BrandName}
                                </Link>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              {
                              couponCountList && displayCouponsCount(brand.BrandID)
                              }
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center text-xs">
                                  5 Jan 2023
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">متعدد البائعين</span>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </>
            )
            
          })
        }
      </div>
    </>
  )
}


export default Home