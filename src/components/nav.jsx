import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import GetCountry from "../../helper/getCountry";
import { useRouter } from "next/router";

const Nav = () => {
    const router = new useRouter();
    const [toggleCountryLanguage, setToggleCountryLanguage] = useState(false);
    const [country, countryList] = GetCountry();

    function toggleCountryMenu() {
        if (toggleCountryLanguage) {
            setToggleCountryLanguage(false);
        } else {
            setToggleCountryLanguage(true);
        }
    }

    function handleToggleCountryForm(locale) {
        router.push('/', '/', { locale: locale });
        setToggleCountryLanguage(false);
    }

    return (
        <header id="header" className="sticky z-100 top-0 right-0 left-0 z-1000 h-20 text-gray-600 bg-white drop-shadow-sm">
            <div className="container h-full mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
            
            {/* <button className="hidden md:inline-flex bg-teal-500 text-white py-2 px-6 rounded-full inline-flex items-center">
                <span className="ml-2">تثبيت</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
    
            </button> */}
    
            <div className="relative">
            {country && 
                <button
                    className="
                    flex items-center gap-1
                    text-xs 
                    rounded-full 
                    px-4 py-2 
                    border border-slate-300
                    font-mono
                    "
                    onClick={() => toggleCountryMenu()}
                >
                    <Image
                    src={country.CountryLogo}
                    alt={country.CountryName}
                    className="rounded"
                    width={20}
                    height={10}
                    />
                    <span>{country.CountryNameAR}</span>  
                </button>
            }
            
    
                {toggleCountryLanguage && <div className="absolute top-16 right-0 w-60 bg-white rounded overflow-hidden shadow-lg">
                <p className="p-4">اختر الدولة</p>
                <div className="border-b-2 m-0"></div>
                <div className="p-4">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleToggleCountryForm(e.target.elements.namedItem('countries').value);
                    }}>
                    <fieldset className="mb-5">
                        <legend className="sr-only">
                        Countries
                        </legend>
                        {countryList.length && countryList.map((countryObj) => {
                            return(
                                <div key={countryObj.CountryID} className="flex items-center mb-4">
                                    <label htmlFor={countryObj.CountryCode} className="text-sm font-medium text-gray-900 block">
                                        <input 
                                            id={countryObj.CountryCode} 
                                            type="radio" 
                                            name="countries" 
                                            defaultValue={countryObj.Locale} 
                                            className="h-4 w-4 ml-2 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                                            aria-labelledby="country-option-1" 
                                            aria-describedby="country-option-1" 
                                            defaultChecked={(countryObj.CountryID === country.CountryID) ? true : false} 
                                        />
                                            {countryObj.CountryNameAR}
                                    </label>
                                </div>
                            )
                        })}
                    </fieldset>
                    <button
                    className="w-full p-2 rounded bg-slate-300"
                    type="submit"
                    >
                        تأكيد
                    </button>
                    </form>
                </div>
                </div>
                }
            </div>
            
    
            <Link href="/" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center md:mb-0">
                <span className="ml-3 text-xl">5sm.co</span>
            </Link>
            
            <div className="navigation">
                <input type="checkbox" className="navigation__checkbox" id="nav-toggle" />
                <label htmlFor="nav-toggle" className="navigation__button border border-slate-100">
                <span className="navigation__icon" aria-label="toggle navigation menu" />
                </label>
                <div className="navigation__background" />
                <nav className="navigation__nav" role="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">
                    <a href="#" className="navigation__link"><span className="ml-4">01</span>عن موقع خصم</a>
                    </li>
                    <li className="navigation__item">
                    <a href="#" className="navigation__link"><span className="ml-4">02</span>تواصل معي</a>
                    </li>
                    <li className="navigation__item">
                    <a href="#" className="navigation__link"><span className="ml-4">03</span>سياسة الخصوصية</a>
                    </li>
                </ul>
                <p 
                dir="ltr" 
                className="absolute bottom-0 w-full text-center text-slate-300 text-xs mb-4"
                >
                    Made with ❤️ by 
                    <Link href="https://mjalil.com" target="_blank" className="text-slate-400 underline"> Mo. J.</Link>
                </p>
                </nav>
            </div>
    
            </div>
        </header>
    )
}

export default Nav