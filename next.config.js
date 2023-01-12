/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: [
      "ar-AE",
      "ar-BH",
      "ar-DZ",
      "ar-EG",
      "ar-IQ",
      "ar-JO",
      "ar-KW",
      "ar-MA",
      "ar-OM",
      "ar-QA",
      "ar-SA",
      "ar-YE",
    ],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'ar-SA',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
    ]
  }
}

module.exports = nextConfig
