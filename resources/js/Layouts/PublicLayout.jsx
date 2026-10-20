// --1. imports--
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

// --2. main component--
export default function PublicLayout({ auth = {}, isHome = false, hideNavbar = false, hideFooter = false, children }) {
    const { settings } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state
    const [openMenu, setOpenMenu] = useState(null); // state
    const [isScrolled, setIsScrolled] = useState(false); // state
    const [isMenuHidden, setIsMenuHidden] = useState(false); // state
    const headerRef = useRef(null); // state
    const hamburgerRef = useRef(null); // state
    const [headerHeight, setHeaderHeight] = useState(0); // state
    const [closePos, setClosePos] = useState({ top: 32, right: 32, bottom: 100 }); // state
    const currentDay = new Date().getDay(); // check
    const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu); // trigger
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }); // trigger

    // trigger
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // state
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // trigger
    useEffect(() => {
        if (isScrolled) {
            setIsMenuHidden(true);
        } else {
            const timer = setTimeout(() => setIsMenuHidden(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isScrolled]);

    // trigger
    useEffect(() => {
        if (!headerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // adding border height (if border-box is not fully captured or just use offsetHeight)
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        });

        observer.observe(headerRef.current);

        // Also fallback window events just in case
        const updatePos = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };
        window.addEventListener('resize', updatePos);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updatePos);
        };
    }, []);

    // trigger
    useEffect(() => {
        const updatePos = () => {
            if (hamburgerRef.current) {
                const rect = hamburgerRef.current.getBoundingClientRect();
                setClosePos({
                    top: rect.top,
                    right: window.innerWidth - rect.right,
                    bottom: rect.bottom
                });
            }
        };

        if (isSidebarOpen) {
            updatePos();
            window.addEventListener('resize', updatePos);
            window.addEventListener('scroll', updatePos);
            return () => {
                window.removeEventListener('resize', updatePos);
                window.removeEventListener('scroll', updatePos);
            };
        }
    }, [isSidebarOpen, isScrolled]);

    const getLinkStyle = (path) => { // state
        const isActive = typeof window !== 'undefined' && (path === '/' ? window.location.pathname === '/' : window.location.pathname.startsWith(path));
        
        if (!isScrolled) {
            return isActive 
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white drop-shadow-md' 
                : 'text-white drop-shadow-md after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-300 after:ease-in-out';
        }
        
        return isActive 
            ? 'text-[#0a192f] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0a192f]' 
            : 'text-slate-600 hover:text-[#0a192f] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0a192f] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-300 after:ease-in-out';
    };

    return (
        <div className={`min-h-screen ${isHome ? 'bg-gradient-to-br from-slate-50 via-white to-slate-100' : 'bg-white'} text-slate-800 font-sans antialiased relative`}>

            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-gradient-to-tr from-[#0a192f]/10 via-amber-500/3 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-[45%] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-amber-500/8 via-[#0a192f]/3 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-[15%] left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#0a192f]/10 via-red-500/2 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Header Placeholder to prevent layout shift */}
            {/* Removed so the page content goes all the way to the top under the transparent navbar */}

            {/* Fixed Scrolling Header */}
            {!hideNavbar && (
                <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none w-full">
                    <header ref={headerRef} className="w-full relative pointer-events-auto">
                        {/* Hardware-accelerated Smooth Frosted Background Layer */}
                        <div 
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none ${
                                isScrolled 
                                    ? 'opacity-100 bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.5] shadow-[0_4px_25px_rgba(0,0,0,0.03)]' 
                                    : 'opacity-0 bg-transparent'
                            }`} 
                        />

                        <div className="max-w-[1350px] mx-auto w-full px-4 md:px-8 relative z-10">
                            <div className="w-full">
                                {/* Header Content with strictly consistent height */}
                                <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2.5 md:py-3' : 'pt-4 pb-3 md:pt-6 md:pb-4'}`}>

                                    {/* Left: Logo */}
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link href="/" className="flex items-center relative h-10 sm:h-12 md:h-14 lg:h-16 aspect-[800/680]" /* redirect */>
                                            {/* White theme logo at top */}
                                            <img
                                                src="/logo.png?v=20260903b"
                                                alt="Kopmedia Logo"
                                                className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                                    !isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}
                                            />
                                            {/* Original logo when scrolled */}
                                            <img
                                                src="/logotoo.png?v=20260903b"
                                                alt="Kopmedia Logo"
                                                className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                                    isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}
                                            />
                                        </Link>
                                    </div>

                                    {/* Right: Full Menu */}
                                    <div className="flex-1 ml-2 sm:ml-4 lg:ml-8 overflow-visible py-2 flex justify-end">
                                        <ul
                                            className="flex items-center justify-end gap-x-3.5 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 font-bold tracking-[0.05em] uppercase whitespace-nowrap transition-all duration-300 ease-in-out text-[9px] sm:text-[10px] lg:text-[12px]"
                                            style={{ fontFamily: "'Chivo', sans-serif" }}
                                        >
                                            {/* Utama */}
                                            <li className="relative group/item">
                                                <Link href={route('home')} className={`relative flex items-center py-1 transition-colors duration-500 ${getLinkStyle('/')}`}>
                                                    Utama
                                                </Link>
                                            </li>

                                            {/* Profil */}
                                            <li className="relative group/item">
                                                <Link href={route('profil')} className={`relative flex items-center py-1 transition-colors duration-500 ${getLinkStyle('/profil')}`}>
                                                    Profil
                                                </Link>
                                            </li>



                                            {/* Perkhidmatan */}
                                            <li className="relative group/item">
                                                <Link href={route('perkhidmatan')} className={`relative flex items-center py-1 transition-colors duration-500 ${getLinkStyle('/perkhidmatan')}`}>
                                                    Perkhidmatan
                                                </Link>
                                            </li>

                                            {/* Dokumen */}
                                            <li className="relative group/item">
                                                <Link href={route('dokumen')} className={`relative flex items-center py-1 transition-colors duration-500 ${getLinkStyle('/dokumen')}`}>
                                                    Dokumen
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Footer */}
            {!hideFooter && (
                <footer className="w-full bg-[#061122] text-slate-300 border-t border-slate-800/50 pt-12 pb-0 relative z-20 shadow-md">
                    {/* Clean, professional top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

                    <div className="max-w-[1350px] mx-auto px-4 md:px-8 space-y-8 md:space-y-10 pb-6 md:pb-8">
                        {/* Top Row: Brand & Socials (Left) and Navigation Sections (Right) */}
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
                            {/* Brand & Social (Left Side) */}
                            <div className="w-full lg:max-w-[300px] flex flex-col items-start gap-4 md:gap-6 text-left shrink-0">
                                <div className="group flex items-center gap-3.5 sm:gap-4 transition-opacity duration-200 hover:opacity-90 cursor-pointer">
                                    <img
                                        src="/logo.png"
                                        alt="Kopmedia Logo"
                                        className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-[2] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-opacity duration-200"
                                    />
                                    <div className="text-left">
                                        <span className="font-black text-white tracking-wide text-lg sm:text-xl block leading-none mb-1">KOPMEDIA</span>
                                        <span className="text-[9px] sm:text-[10px] text-red-600 font-bold uppercase tracking-widest block leading-tight transition-colors duration-200 group-hover:text-red-500">Koperasi Media Prima Berhad</span>
                                    </div>
                                </div>
                                
                                {/* Social media - Mobile: Horizontal Row */}
                                <div className="flex md:hidden flex-col items-start gap-2.5 mt-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ikuti Kami</span>
                                    
                                    <div className="flex items-center gap-2.5">
                                        {settings?.social_facebook && (
                                            <a
                                                href={settings.social_facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Facebook Koperasi Media Prima"
                                                className="group flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-200 shadow-sm" /* redirect */
                                                title={`Facebook (${settings?.social_facebook_username || 'Koperasi Media Prima'})`}
                                            >
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                </svg>
                                            </a>
                                        )}
                                        
                                        {settings?.social_instagram && (
                                            <a
                                                href={settings.social_instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram Koperasi Media Prima"
                                                className="group flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:border-transparent hover:text-white transition-all duration-200 shadow-sm" /* redirect */
                                                title={`Instagram (${settings?.social_instagram_username || 'Koperasi Media Prima'})`}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </a>
                                        )}

                                        {settings?.social_tiktok && (
                                            <a
                                                href={settings.social_tiktok}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="TikTok Koperasi Media Prima"
                                                className="group flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:bg-white hover:border-white hover:text-black transition-all duration-200 shadow-sm" /* redirect */
                                                title={`TikTok (${settings?.social_tiktok_username || 'Koperasi Media Prima'})`}
                                            >
                                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512" aria-hidden="true">
                                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Social media - Desktop: Vertical List */}
                                <div className="hidden md:flex flex-col items-start gap-3 mt-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Ikuti Kami</span>
                                    
                                    {settings?.social_facebook && (
                                        <a
                                            href={settings.social_facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Facebook Koperasi Media Prima"
                                            className="group flex items-center gap-3 py-1 transition-colors duration-200" /* redirect */
                                            title="Facebook"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-400 group-hover:bg-[#1877F2] group-hover:border-[#1877F2] group-hover:text-white transition-colors duration-200 shrink-0">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                </svg>
                                            </div>
                                            <span className="text-[13px] font-medium text-slate-400 group-hover:text-white transition-colors duration-200">
                                                {settings?.social_facebook_username || 'Facebook'}
                                            </span>
                                        </a>
                                    )}
                                    
                                    {settings?.social_instagram && (
                                        <a
                                            href={settings.social_instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram Koperasi Media Prima"
                                            className="group flex items-center gap-3 py-1 transition-colors duration-200" /* redirect */
                                            title="Instagram"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-[#f58529] group-hover:via-[#dd2a7b] group-hover:to-[#8134af] group-hover:border-transparent group-hover:text-white transition-colors duration-200 shrink-0">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                            <span className="text-[13px] font-medium text-slate-400 group-hover:text-white transition-colors duration-200">
                                                {settings?.social_instagram_username || 'Instagram'}
                                            </span>
                                        </a>
                                    )}

                                    {settings?.social_tiktok && (
                                        <a
                                            href={settings.social_tiktok}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="TikTok Koperasi Media Prima"
                                            className="group flex items-center gap-3 py-1 transition-colors duration-200" /* redirect */
                                            title="TikTok"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-400 group-hover:bg-white group-hover:border-white group-hover:text-black transition-colors duration-200 shrink-0">
                                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512" aria-hidden="true">
                                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                                </svg>
                                            </div>
                                            <span className="text-[13px] font-medium text-slate-400 group-hover:text-white transition-colors duration-200">
                                                {settings?.social_tiktok_username || 'TikTok'}
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Pautan Pantas, Hubungi Kami & Waktu Operasi */}
                            <div className="w-full lg:w-auto flex-1 grid grid-cols-2 md:flex md:flex-row justify-between lg:justify-end gap-8 sm:gap-10 md:gap-16 lg:gap-16 xl:gap-24">
                                {/* Pautan Pantas */}
                                <div className="flex flex-col gap-3 sm:gap-4 text-left min-w-[120px] sm:min-w-[140px]">
                                    <h4 className="flex items-center justify-start gap-1.5 sm:gap-2 text-[14px] sm:text-[15px] font-bold text-white/90">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                        Pautan Pantas
                                    </h4>
                                    <div className="flex flex-col gap-2 sm:gap-3 px-0.5 sm:px-1 text-[12px] sm:text-[13px] font-medium text-slate-400 text-left">
                                        <Link href={route('home')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Utama
                                        </Link>
                                        <Link href={route('profil')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Profil
                                        </Link>
                                        <Link href={route('perkhidmatan')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Perkhidmatan
                                        </Link>
                                        <Link href={route('dokumen')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Dokumen
                                        </Link>
                                        <Link href={route('public.penerbitan')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Penerbitan
                                        </Link>
                                        <Link href={route('public.notices')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Berita & Notis
                                        </Link>
                                        <Link href={route('galeri')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Galeri
                                        </Link>
                                    </div>
                                </div>

                                {/* Hubungi Kami & FAQ */}
                                <div className="flex flex-col gap-3 sm:gap-4 text-left min-w-[130px] sm:min-w-[170px]">
                                    <Link href={route('hubungi-kami')} className="group flex items-center justify-start gap-1.5 sm:gap-2 text-[14px] sm:text-[15px] font-bold text-white/90 hover:text-white transition-colors duration-200" /* redirect */>
                                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Hubungi Kami
                                    </Link>
                                    <div className="flex flex-col gap-2 sm:gap-3 px-0.5 sm:px-1 text-[12px] sm:text-[13px] font-medium text-slate-400 text-left">
                                        <Link href={route('hubungi-kami')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Talian Hubungan
                                        </Link>
                                        <Link href={route('hubungi-kami')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Direktori Staf
                                        </Link>
                                        <Link href={route('hubungi-kami')} className="group flex items-center justify-start gap-1.5 hover:text-white transition-colors duration-200" /* redirect */>
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            Lokasi Pejabat
                                        </Link>
                                        <Link href={route('faq')} className="group flex items-center justify-start gap-1.5 pt-1 sm:pt-2 text-white/90 hover:text-white font-semibold transition-colors duration-200" /* redirect */>
                                            <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Soalan Lazim (FAQ)
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Waktu Operasi - Mobile View: Compact grouped cards */}
                                <div className="col-span-2 block md:hidden flex flex-col gap-3 text-left min-w-[200px]">
                                    <h4 className="flex items-center justify-start gap-1.5 text-[14px] font-bold text-white/90">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Waktu Operasi
                                    </h4>
                                    <div className="flex flex-col gap-2.5 text-[12px] text-slate-400 text-left w-full max-w-[280px]">
                                        <div className={`flex justify-between items-center py-2 px-3 rounded-lg border transition-all ${currentDay >= 1 && currentDay <= 5 ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200 shadow-sm' : 'bg-slate-800/40 border-slate-700/50 text-slate-300'}`}>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${currentDay >= 1 && currentDay <= 5 ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-slate-500'}`}></span>
                                                <span className="font-semibold text-[12px]">Isnin – Jumaat</span>
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-300">09:00 AM – 06:00 PM</span>
                                        </div>

                                        <div className={`flex justify-between items-center py-2 px-3 rounded-lg border transition-all ${currentDay === 0 || currentDay === 6 ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-sm' : 'bg-slate-800/40 border-slate-700/50 text-slate-400'}`}>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${currentDay === 0 || currentDay === 6 ? 'bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]' : 'bg-slate-600'}`}></span>
                                                <span className="font-semibold text-[12px]">Sabtu & Ahad</span>
                                            </div>
                                            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wide">Tutup</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Waktu Operasi - Desktop View: Full original 6-day list */}
                                <div className="hidden md:flex flex-col gap-4 text-left min-w-[220px]">
                                    <h4 className="flex items-center justify-start gap-2 text-[15px] font-bold text-white/90">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Waktu Operasi
                                    </h4>
                                    <div className="flex flex-col gap-2 px-1 text-[12px] text-slate-400 text-left w-full max-w-[240px]">
                                        {[
                                            { day: 'Isnin', time: '09:00 AM - 06:00 PM', isToday: currentDay === 1 },
                                            { day: 'Selasa', time: '09:00 AM - 06:00 PM', isToday: currentDay === 2 },
                                            { day: 'Rabu', time: '09:00 AM - 06:00 PM', isToday: currentDay === 3 },
                                            { day: 'Khamis', time: '09:00 AM - 06:00 PM', isToday: currentDay === 4 },
                                            { day: 'Jumaat', time: '09:00 AM - 06:00 PM', isToday: currentDay === 5 },
                                            { day: 'Sabtu & Ahad', time: 'Tutup', isToday: currentDay === 0 || currentDay === 6, isClosed: true },
                                        ].map((item) => (
                                            <div
                                                key={item.day}
                                                className={`flex justify-between items-center gap-4 transition-colors ${
                                                    item.isToday
                                                        ? 'font-bold text-white'
                                                        : item.isClosed
                                                        ? 'text-rose-500/80 font-normal'
                                                        : 'text-slate-400 font-normal'
                                                }`}
                                            >
                                                <span>{item.day}</span>
                                                <span>{item.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Horizontal Logos */}
                        <div className="pt-6 md:pt-8 mt-2 md:mt-4 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
                            <h4 className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap text-center md:text-left mb-2 md:mb-0">
                                Rangkaian Koperasi & Rakan Korporat
                            </h4>
                            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6 md:gap-8 invert grayscale contrast-125 brightness-110">
                                <a href="https://www.skm.gov.my/" target="_blank" rel="noopener noreferrer" aria-label="Suruhanjaya Koperasi Malaysia (SKM)" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-skm.png" alt="SKM Logo" loading="lazy" decoding="async" className="h-6 md:h-8 w-auto object-contain" />
                                </a>
                                <a href="https://www.angkasa.coop/" target="_blank" rel="noopener noreferrer" aria-label="Angkasa" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-angkasa.png" alt="Angkasa Logo" loading="lazy" decoding="async" className="h-6 md:h-8 w-auto object-contain" />
                                </a>
                                <a href="https://ikma.edu.my/" target="_blank" rel="noopener noreferrer" aria-label="Institut Koperasi Malaysia (IKMa)" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-ikma.png" alt="IKMa Logo" loading="lazy" decoding="async" className="h-6 md:h-8 w-auto object-contain" />
                                </a>
                                
                                {/* Subtle Divider between groups */}
                                <div className="hidden md:block w-[1px] h-4 bg-slate-700 mx-1"></div>
                                
                                <a href="https://www.mediaprima.com.my/" target="_blank" rel="noopener noreferrer" aria-label="Media Prima Berhad" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-mediaprima.png" alt="Media Prima" loading="lazy" decoding="async" className="h-4 md:h-6 w-auto object-contain" />
                                </a>
                                <a href="https://www.allianz.com.my/" target="_blank" rel="noopener noreferrer" aria-label="Allianz" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-allianz.png" alt="Allianz" loading="lazy" decoding="async" className="h-4 md:h-6 w-auto object-contain" />
                                </a>
                                <a href="https://www.sunlifemalaysia.com/" target="_blank" rel="noopener noreferrer" aria-label="Sun Life Malaysia" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-sunlife.png" alt="Sun Life" loading="lazy" decoding="async" className="h-4 md:h-6 w-auto object-contain" />
                                </a>
                                <a href="https://www.malaymail.com/" target="_blank" rel="noopener noreferrer" aria-label="Malay Mail" className="block opacity-60 hover:opacity-100 transition-opacity duration-300" /* redirect */>
                                    <img src="/images/logo-malaymail.png" alt="Malay Mail" loading="lazy" decoding="async" className="h-4 md:h-6 w-auto object-contain" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="bg-transparent py-6 border-t border-slate-800">
                        <div className="max-w-[1350px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
                            <p className="text-center md:text-left">© Koperasi Media Prima Berhad. Hak cipta terpelihara.</p>
                            <button onClick={scrollToTop} aria-label="Kembali ke Atas" className="group flex items-center gap-2 font-normal text-slate-400 hover:text-slate-300 transition-colors">
                                Kembali ke Atas
                                <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </footer>
            )}

            {/* Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[110] shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Absolute Close Button matches exact location of Hamburger */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Tutup Menu Navigasi"
                    className="absolute z-10 flex items-center text-slate-500 hover:text-black transition-colors"
                    style={{ top: closePos.top, right: closePos.right }}
                >
                    <svg className={`stroke-[1.5] transition-all duration-500 ease-out ${isScrolled ? 'w-6 h-6' : 'w-7 h-7'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto h-full w-full p-6 md:p-8 flex flex-col" style={{ paddingTop: closePos.bottom + 20 }}>
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-black">
                        <span className="font-black text-xl tracking-wider uppercase text-slate-900">Menu</span>
                    </div>

                    {/* Sidebar Links */}
                    <div className="flex flex-col gap-2 flex-grow font-medium tracking-wide text-[13px] md:text-sm">
                        <Link href={route('home')} className="block py-3 border-b border-slate-100 transition-colors hover:opacity-50 text-slate-800" onClick={() => setIsSidebarOpen(false)}>Utama</Link>

                        <Link href={route('profil')} className="block py-3 border-b border-slate-100 transition-colors hover:opacity-50 text-slate-800" onClick={() => setIsSidebarOpen(false)}>Profil</Link>



                        <div className="border-b border-slate-100">
                            <Link href={route('perkhidmatan')} className="block w-full py-3 transition-colors hover:opacity-50 text-slate-800" onClick={() => setIsSidebarOpen(false)}>
                                Perkhidmatan
                            </Link>
                        </div>

                        <div className="border-b border-slate-100">
                            <Link href={route('dokumen')} className="block w-full py-3 transition-colors hover:opacity-50 text-slate-800" onClick={() => setIsSidebarOpen(false)}>
                                Dokumen
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
