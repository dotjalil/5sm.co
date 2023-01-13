import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import GetCountry from '../../helper/getCountry';

export default function Store() {
    const router = useRouter();
    const { id } = router.query;
    const [storeData, setStoreData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [animationClass, setAnimationClass] = useState();
    const [shareModal, setShareModal] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(null);
    const [sourceSites, setSourceSites] = useState(null);

    const [country] = GetCountry();
    const social = socialShareLinks();

    useEffect(() => {
        if(!router.isReady) return;

        async function getStoreData() {
            const apiUrlEndpoint = '/api/getStore';
            const postData = {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    countryId: country.CountryID,
                }),
            };

            const response = await fetch(apiUrlEndpoint, postData);
            const res = await response.json();
            setStoreData(res.storeData/*returned object name*/);
        }
        getStoreData();
    }, [router.query.id, router.isReady]);

    useEffect(() => {
        if(!router.isReady) return;

        async function getSourceSites() {
            const apiUrlEndpoint = '/api/getSourceSites';
            console.log('api call')
            console.log('api call')
            const postData = {
                method: "Post",
                headers: { "Content-Type": "application/json" },
            };

            const response = await fetch(apiUrlEndpoint, postData);
            const res = await response.json();
            setSourceSites(res.data);
            console.log(sourceSites)
        }
        getSourceSites();
    }, [router.isReady]);

    useEffect(() => {
        setCurrentUrl(globalThis?.window?.location.href);
    }, [])

    function copyToClipboard(e) {
        const code = e.target.dataset.code;
        navigator.clipboard.writeText(code).then(
            () => {
                setShowModal(true);
                setAnimationClass("popup-open-animation");
                setTimeout(() => {
                    setAnimationClass("popup-close-animation");
                    setTimeout(() => {
                        setShowModal(false);
                    }, 250);
                }, 1000)
            },
            (err) => {
                console.log(err);
            }
        );
    }

    function handleCopyPageUrl() {
        navigator.clipboard.writeText(globalThis?.window?.location.href);
    }

    function countryClass(countryId) {
        if (countryId == 1) {
            return 'bg-blue-50 text-blue-600';
        } else if (countryId == 2) {
            return 'bg-indigo-50 text-indigo-600';
        } else if (countryId == 3) {
            return 'bg-violet-50 text-violet-600';
        } else if (countryId == 4) {
            return 'bg-purple-50 text-purple-600';
        } else if (countryId == 5) {
            return 'bg-fuchsia-50 text-fuchsia-600';
        } else if (countryId == 6) {
            return 'bg-cyan-50 text-cyan-600';
        } else if (countryId == 7) {
            return 'bg-teal-50 text-teal-600';
        } else if (countryId == 8) {
            return 'bg-emerald-50 text-emerald-600';
        } else if (countryId == 9) {
            return 'bg-yellow-50 text-yellow-600';
        }
    }

    function getCouponSource(sourceSiteId) {
        const [sourceSite] = sourceSites.filter(site => site.SiteID == sourceSiteId)
        return sourceSite.SiteName
    }

    function socialShareLinks() {
        const url = globalThis?.window?.location.href;
        const social = {};
        social.facebook = "https://www.facebook.com/share.php?u=" + encodeURIComponent(url);
        social.whatsapp = "https://api.whatsapp.com/send?text=" + encodeURIComponent(url);
        social.instagram = "https://instagram.com";
        social.twitter = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(url);
        social.telegram = "https://telegram.me/share/url?url=" + encodeURIComponent(url);
        return social;
    }

    

    return (
        <>
            {/* Share & Page Props */}
            <div className='container mx-auto flex justify-between items-end'>
                <button
                className='btn group flex items-center bg-gray-100 rounded-full py-2 px-4 text-xs'
                onClick={() => setShareModal(true)}>
                    شير
                    <svg className="mr-2 svg-icon" style={{width: '1.5em', height: '1.5em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M889.4 460.8l-282.2-264c-3.4-3.2-6.6-5-11.2-4.8-8.8 0.4-20 6.6-20 16v132.4c0 4-3.2 7.6-7.2 8.2C288.2 391.6 170 601.6 128.2 819.6c-1.6 8.6 10 16.6 15.4 9.8 102.4-129 227-213.2 424-214.8 4.4 0 8.4 5.2 8.4 9.6v130c0 14 18.6 20.2 29 10.6l284.2-268.6c5.2-4.8 6.8-10.4 7-16.8-0.2-6.4-1.8-13.8-6.8-18.6z" fill /></svg>
                </button>
                <p className='text-md p-2'>
                    {storeData && storeData.length}
                    &nbsp;كود تم العثور عليهم</p>
                <button 
                className="text-xs btn group flex items-center bg-transparent p-2"
                onClick={() => router.back()}
                >
                    <span className="relative pl-4">الرئيسية</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </button>
            </div>

            {
                storeData && (
                    <div className="container mx-auto overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 text-right">
                            <thead className="hidden md:table-header-group bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">كود الخصم</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">المصدر</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">الشروط</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">دولة الخصم</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">نسخ الكود</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    storeData && storeData.map((store) => {
                                        return (
                                            <tr key={store.CouponID}
                                                className="flex justify-between md:table-row items-center hover:bg-gray-50"
                                            >
                                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                                    <div className="relative h-10 w-10 flex">
                                                        { store && store.Logo &&
                                                            <Image 
                                                                className="w-full rounded-full object-contain object-center border" 
                                                                width={48}
                                                                height={48}
                                                                src={String(store.Logo)}
                                                                alt={store.BrandName} 
                                                            />
                                                        }
                                                    </div>
                                                    <div className="text-sm">
                                                        <div className="text-lg text-gray-70 font-mono">
                                                            {store.CouponCode}
                                                        </div>
                                                        <div className="text-gray-400 text-xs">
                                                            {store.Discount} <span className='md:hidden'>- {store.DescriptionAr || store.DescriptionEn}</span>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="hidden md:table-cell px-6 py-4">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                    {store.SiteID && getCouponSource(store.SiteID)}
                                                </span>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 text-xs">
                                                    {store.DescriptionAr || store.DescriptionEn}
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4">
                                                <div className="flex gap-2">
                                                    <span className={"inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold " + countryClass(store.CountryID)}>
                                                    { country.CountryNameAR }
                                                    </span>
                                                </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                <button 
                                                className="flex justify-center text-sm bg-gray-200 rounded py-2 px-3 transition"
                                                onClick={(e) => copyToClipboard(e)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                                    <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                                    </svg>
                                                    {store.CouponCode
                                                    &&
                                                    <span className='text-xs mr-2 w-max' data-code={store.CouponCode}>نسخ الكود</span>
                                                    }
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        
                    </div>
                )
            }
            {/* Debugging */}
            {/* <pre>
                <code>{storeData && JSON.stringify(storeData, null, 2)}</code>
            </pre>
            <pre>
                <code>{sourceSites && JSON.stringify(sourceSites, null, 2)}</code>
            </pre> */}
            {/* Modal */}
            { showModal 
                && 
                (<div className={"modal-background z-10 fixed top-0 right-0 left-0 bottom-0 h-screen w-full flex flex-col items-center justify-center " + animationClass}>
                    <div v-if="modal.visible" className="h-screen w-full absolute flex items-center justify-center bg-modal">
                    <div className="bg-white rounded shadow p-8 m-4 w-80 max-w-xs max-h-full text-center overflow-y-scroll">
                        <div className='checkmark'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
                                <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                            </svg>
                        </div>
                        <div className="mt-8 mb-8">
                        <h1>تم نسخ الكود بنجاح!</h1>
                        </div>
                    </div>
                    </div>
                </div>)
            }

            {/* CONTAINER MODAL*/}
            { shareModal 
                && (<div className="fixed top-0 right-0 left-0 bottom-0 min-h-screen modal-background flex items-center justify-center">
                    {/*MODAL ITEM*/}
                        <div className="bg-white drop-shadow-2xl w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
                            {/*MODAL HEADER*/}
                            <div className="flex justify-between items center border-b border-gray-200 py-3">
                                <div className="flex items-center justify-center">
                                <p className="text-xl font-bold text-gray-800">شاركها مع الأصدقاء</p>
                                </div>
                                <div className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
                                onClick={() => setShareModal(false)}>
                                x
                                </div>
                            </div>
                            {/*MODAL BODY*/}
                            <div className="my-4">
                                <p className="text-sm">شارك أكواد الخصم من خلال:</p>
                                <div className="flex justify-around my-4">
                                {/*FACEBOOK ICON*/}
                                <a href={social.facebook} target="_blank" rel="noreferrer">
                                    <div className="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                                        </svg>
                                    </div>
                                </a>
                                {/*TWITTER ICON*/}
                                <a href={social.twitter} target="_blank" rel="noreferrer">
                                    <div className="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                                        </svg>
                                    </div>
                                </a>
                                {/*INSTAGRAM ICON*/}
                                <a href={social.instagram} target="_blank" rel="noreferrer">
                                    <div className="border hover:bg-[#bc2a8d] w-12 h-12 fill-[#bc2a8d] hover:fill-white border-pink-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-pink-500/50 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
                                        <circle cx="16.806" cy="7.207" r="1.078" />
                                        <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z" />
                                        </svg>
                                    </div>
                                </a>
                                {/*WHATSAPP ICON*/}
                                <a href={social.whatsapp} target="_blank" rel="noreferrer">
                                    <div className="border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-white border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263" />
                                        </svg>
                                    </div>
                                </a>
                                {/*TELEGRAM ICON*/}
                                <a href={social.telegram} target="_blank" rel="noreferrer">
                                    <div className="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                                        </svg>
                                    </div>
                                </a>
                                </div>
                                <p className="text-sm">او انسخ الرابط</p>
                                {/*BOX LINK*/}
                                <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="fill-gray-500 mr-2">
                                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z" />
                                    <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z" />
                                </svg>
                                <input className="w-full outline-none bg-transparent" type="text" placeholder="link" defaultValue={currentUrl} />
                                <button className="bg-indigo-500 text-white rounded text-sm py-2 px-5 ml-2 hover:bg-indigo-600"
                                onClick={() => handleCopyPageUrl()}>
                                    نسخ
                                </button>
                                </div>
                            </div>
                    </div>
                </div>)
                }
        </>
    );
}