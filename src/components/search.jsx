import { useState } from 'react'
import Fuse from 'fuse.js'
import keywords from '../../tmp/keywords.json'
import Link from 'next/link'
import Image from 'next/image'

const Search = () => {
    const [query, setQuery] = useState('')
    const fuse = new Fuse(keywords, {
        keys: [
          'BrandName',
          'BrandNameAR'
        ]
    });
    const results = fuse.search(query);

    function onSearch( { currentTarget } ){
        setQuery(currentTarget.value);
    }

    function clearSearchField() {
      setQuery('');
    }

    return (
        <section className="text-gray-600 body-font pt-10">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">محرك بحث أكواد الخصم الأول عربيا</h1>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
              <form>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
                    placeholder="ابحث عن كود خصم ..." 
                    value={query} 
                    onChange={onSearch} 
                    required 
                  />
                    <div className="flex justify-center">
                    {!!results.length && (<div className="dropdown relative w-full">
                        <ul className="
                          dropdown-menu
                          absolute
                          bg-white
                          z-50
                          float-left
                          py-2
                          list-none
                          text-left
                          rounded-lg
                          shadow-lg
                          mt-1
                          m-0
                          bg-clip-padding
                          border-none
                          w-full
                        " aria-labelledby="dropdownMenuButton1">
                          {
                            results.map((result) => {
                                return (
                                    <li key={result.item.ID}>
                                        <Link 
                                        className="
                                        dropdown-item
                                        text-sm
                                        py-2
                                        px-4
                                        text-right
                                        font-normal
                                        flex
                                        gap-2
                                        items-center
                                        w-full
                                        whitespace-nowrap
                                        bg-transparent
                                        text-gray-700
                                        hover:bg-gray-100
                                        " 
                                        href={`/store/${result.item.BrandID}`}
                                        onClick={() => clearSearchField()}
                                        >
                                          {result.item.Logo && 
                                            <Image alt={result.item.BrandName} width="24" height="24" className='w-6 h-6 rounded-full' src={result.item.Logo} />
                                          }
                                          <span className='text-xs'>
                                              {result.item.BrandName}
                                          </span>
                                        </Link>
                                    </li>
                                )
                            })
                          }
                        </ul>
                        
                      </div>)}
                  
                  </div>
                  
                
                </div>
              </form>
              </div>
            </div>
          </div>
        </section>
    // <section id="search-box">
    //     <h1 className='mr-6'>محرك بحث الخصومات الأول عربيا</h1>
    //     {/* Search */}
    //     <input type="search" id="search" name="search" placeholder="ابحث عن كود خصم" value={query} onChange={onSearch}/>
    //     <div className='search-completion'>
    //         <ul>
    //         {
    //         results && results.map((result) => {
    //             return (
    //                 <li key={result.item.ID}><Link href={`/store/${result.item.BrandID}`}>{result.item.Keyword}</Link></li>
    //             )
    //         })
    //         }
    //         </ul>
    //     </div>
    // </section>
)}

export default Search