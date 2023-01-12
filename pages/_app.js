import '../styles/globals.css'
import Search from '../src/components/search'
import Nav from '../src/components/nav'
import { Noto_Kufi_Arabic  } from '@next/font/google'
import Footer from '../src/components/Footer'

const noto_kufi_arabic = Noto_Kufi_Arabic({
  weight: ['400', '700'],
  variable: "--noto-kufi-arabic",
  display: 'swap'
})

function MyApp({ Component, pageProps }) {

  return (
    <>
      <style jsx global>{`
          html {
            font-family: ${noto_kufi_arabic.style.fontFamily};
          }
      `}</style>
      <Nav />
      <div className='container mx-auto'>
        <Search />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}

export default MyApp
