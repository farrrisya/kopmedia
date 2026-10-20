// --1. imports--
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';

// --2. main component--
export default function AdminLayout({ children, headerTitle = 'Dashboard' }) {
    const user = usePage().props.auth.user; // properties
    const [sidebarOpen, setSidebarOpen] = useState(false); // state

    const navigationGroups = [ // state
        {
            title: 'Pengurusan Utama',
            items: [
                {
                    name: 'Dashboard',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    ),
                    route: 'admin.dashboard',
                    active: route().current('admin.dashboard')
                },
                {
                    name: 'Slider Banner',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    ),
                    route: 'admin.sliders.index',
                    active: route().current('admin.sliders.index')
                },
            ]
        },
        {
            title: 'Kandungan & Penerbitan',
            items: [
                {
                    name: 'Berita & Notis',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    ),
                    route: 'admin.notices.index',
                    active: route().current('admin.notices.index') || route().current('admin.notices.create') || route().current('admin.notices.edit')
                },
                {
                    name: 'Penerbitan & Laporan',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    ),
                    route: 'admin.penerbitan.index',
                    active: route().current('admin.penerbitan.index') || route().current('admin.penerbitan.create') || route().current('admin.penerbitan.edit')
                },
                {
                    name: 'Pusat Dokumen',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    ),
                    route: 'admin.muat-turun.index',
                    active: route().current('admin.muat-turun.index') || route().current('admin.muat-turun.create') || route().current('admin.muat-turun.edit')
                },
                {
                    name: 'Galeri Media',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    ),
                    route: 'admin.galleries.index',
                    active: route().current('admin.galleries.index')
                },
                {
                    name: 'Media Library',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    route: 'admin.media.index',
                    active: route().current('admin.media.index')
                }
            ]
        },
        {
            title: 'Modul & Perkhidmatan',
            items: [
                {
                    name: 'Perkhidmatan',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    ),
                    route: 'admin.produk-perkhidmatan.index',
                    active: route().current('admin.produk-perkhidmatan.index') || route().current('admin.produk-perkhidmatan.create') || route().current('admin.produk-perkhidmatan.edit')
                },
                {
                    name: 'Ar-Rahnu',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    ),
                    route: 'admin.page.edit',
                    routeParams: 'ar-rahnu',
                    active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/page/ar-rahnu')
                },
                {
                    name: 'Coop Mart',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    ),
                    route: 'admin.page.edit',
                    routeParams: 'coop-mart',
                    active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/page/coop-mart')
                },
                {
                    name: 'KNSTP Solutions',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    ),
                    route: 'admin.page.edit',
                    routeParams: 'knstp',
                    active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/page/knstp')
                },
            ]
        },
        {
            title: 'Sistem & Konfigurasi',
            items: [
                {
                    name: 'Soalan Lazim',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    route: 'admin.soalan-lazim.index',
                    active: route().current('admin.soalan-lazim.index')
                },
                {
                    name: 'Tetapan Portal',
                    icon: (
                        <svg className="w-4 h-4 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    ),
                    route: 'admin.settings.index',
                    active: route().current('admin.settings.index')
                }
            ]
        }
    ];

    // --3. UI--
    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans flex antialiased">
            {/* Mobile Drawer Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)} // trigger
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
                />
            )}

            {/* Main Navigation Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 z-50 md:z-30 w-64 h-screen bg-white text-slate-600 border-r border-slate-200/80 flex flex-col justify-between shadow-xs transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Brand Header */}
                    <div className="h-20 border-b border-slate-100 px-6 flex items-center justify-between shrink-0 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shadow-xs shrink-0">
                                <img
                                    src="/logotoo.png"
                                    alt="Kopmedia Logo"
                                    className="h-8 w-auto object-contain"
                                />
                            </div>
                            <div>
                                <span className="font-black text-slate-900 text-xs tracking-wider block">KOPMEDIA</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Portal CMS</span>
                            </div>
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setSidebarOpen(false)} // trigger
                            className="md:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Navigation Items with comfortable spacing and sleek scroll */}
                    <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
                        {navigationGroups.map((group) => (
                            <div key={group.title} className="space-y-1">
                                <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {group.title}
                                </div>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.routeParams ? route(item.route, item.routeParams) : route(item.route)} // redirect
                                            onClick={() => setSidebarOpen(false)} // trigger
                                            className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                                                item.active
                                                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                        >
                                            <span className={`transition-colors ${item.active ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-700'}`}>
                                                {item.icon}
                                            </span>
                                            <span className="truncate">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                <header className="h-20 bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)} // trigger
                            className="text-slate-600 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 focus:outline-none md:hidden flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                                {headerTitle}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-xl">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-all duration-150 focus:outline-none"
                                        >
                                            <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center text-xs">
                                                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                                            </div>
                                            <span>{user.name}</span>

                                            <svg
                                                className="h-3.5 w-3.5 text-slate-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href="/" // redirect
                                        target="_blank"
                                        className="flex items-center justify-between"
                                    >
                                        <span>Lihat Portal Awam</span>
                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')} // redirect
                                        method="post"
                                        as="button"
                                        onClick={(e) => { // trigger
                                            if (!window.confirm("Adakah anda pasti mahu log keluar daripada akaun?")) { // check
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        Log Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                <main className="p-6 sm:p-8 md:p-10 max-w-[1400px] w-full mx-auto flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
