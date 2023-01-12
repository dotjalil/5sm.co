const Footer = () => (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 mt-10">
        <div className="container mx-auto sm:flex sm:items-center sm:justify-between">
            <a href="#" target="_blank" className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-xl font-semibold whitespace-nowrap">5sm.co</span>
            </a>
            <ul className="flex flex-wrap items-center justify-center mb-6 sm:mb-0">
            <li>
                <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6">من نحن</a>
            </li>
            <li>
                <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6">سياسة الخصوصية</a>
            </li>
            <li>
                <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6">تواصل معنا</a>
            </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-xs text-gray-500 text-center">© 2023 <a href="/" target="_blank" className="hover:underline">موقع خصم™</a>. جميع الحقوق محفوظة.
        </span>
    </footer>
)

export default Footer;