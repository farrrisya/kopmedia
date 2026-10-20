import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState, useMemo } from 'react';

// --1. helpers--
const getFileStyle = (ext) => {
    switch (ext?.toLowerCase()) {
        case 'pdf':
            return {
                color: 'text-red-600',
                bg: 'bg-red-50',
                border: 'border-red-200/80',
                badge: 'bg-red-100/80 text-red-700 border-red-200',
                btnHover: 'hover:bg-red-600 hover:text-white hover:border-red-600',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                )
            };
        case 'doc':
        case 'docx':
            return {
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-200/80',
                badge: 'bg-blue-100/80 text-blue-700 border-blue-200',
                btnHover: 'hover:bg-blue-600 hover:text-white hover:border-blue-600',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            };
        case 'xls':
        case 'xlsx':
            return {
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                border: 'border-emerald-200/80',
                badge: 'bg-emerald-100/80 text-emerald-700 border-emerald-200',
                btnHover: 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            };
        case 'url':
            return {
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
                border: 'border-indigo-200/80',
                badge: 'bg-indigo-100/80 text-indigo-700 border-indigo-200',
                btnHover: 'hover:bg-indigo-600 hover:text-white hover:border-indigo-600',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                )
            };
        default:
            return {
                color: 'text-slate-600',
                bg: 'bg-slate-50',
                border: 'border-slate-200/80',
                badge: 'bg-slate-100 text-slate-700 border-slate-200',
                btnHover: 'hover:bg-[#0a192f] hover:text-white hover:border-[#0a192f]',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                )
            };
    }
};

const getCategoryStyle = (category) => {
    const t = category.toLowerCase();
    if (t.includes('borang')) {
        return {
            bg: 'bg-amber-500/10',
            text: 'text-amber-600',
            border: 'border-amber-200',
            hover: 'group-hover:bg-amber-500 group-hover:text-white',
            shadow: 'hover:shadow-amber-500/5',
            badge: 'bg-amber-50 text-amber-700 border-amber-200/80'
        };
    }
    if (t.includes('jadual')) {
        return {
            bg: 'bg-blue-500/10',
            text: 'text-blue-600',
            border: 'border-blue-200',
            hover: 'group-hover:bg-blue-600 group-hover:text-white',
            shadow: 'hover:shadow-blue-500/5',
            badge: 'bg-blue-50 text-blue-700 border-blue-200/80'
        };
    }
    if (t.includes('polisi') || t.includes('laporan') || t.includes('tadbir') || t.includes('undang')) {
        return {
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            hover: 'group-hover:bg-emerald-600 group-hover:text-white',
            shadow: 'hover:shadow-emerald-500/5',
            badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
        };
    }
    return {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        hover: 'group-hover:bg-indigo-600 group-hover:text-white',
        shadow: 'hover:shadow-indigo-500/5',
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
    };
};

const HighlightedText = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <mark key={i} className="bg-amber-200 text-amber-900 rounded px-1">{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

const getCategoryIcon = (category) => {
    const t = category.toLowerCase();
    if (t.includes('borang')) return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    if (t.includes('jadual')) return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    if (t.includes('polisi') || t.includes('laporan') || t.includes('tadbir') || t.includes('undang')) return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
    );
};

// --2. main component--
export default function Dokumen({ auth, documents = [] }) {
    // state
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);

    // convert & filter documents
    const filteredDocuments = useMemo(() => {
        return documents.filter(doc => {
            const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 (doc.sub_category && doc.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                 (doc.category && doc.category.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesSearch;
        }).map(doc => {
            let filePath = "#";
            if (doc.media_type === 'file' || doc.media_type === 'media') {
                const baseUrl = route('home').replace(/\/$/, '');
                filePath = doc.file_path ? `${baseUrl}/storage/${doc.file_path}` : "#";
            } else if (doc.media_type === 'url') {
                filePath = doc.url_link || "#";
            }

            const fileExt = doc.file_path ? doc.file_path.split('.').pop().toUpperCase() : "PDF";

            return {
                ...doc,
                file_ext: fileExt,
                download_path: filePath
            };
        });
    }, [documents, searchTerm]);

    const categoriesToRender = useMemo(() => {
        const cats = [...new Set(filteredDocuments.map(p => p.category))].filter(Boolean);
        const normalCats = cats.filter(c => !c.toLowerCase().includes('jadual')).sort();
        const jadualCats = cats.filter(c => c.toLowerCase().includes('jadual')).sort();
        return [...normalCats, ...jadualCats];
    }, [filteredDocuments]);

    // group by category for display
    const groupedDocuments = useMemo(() => {
        const groups = {};
        filteredDocuments.forEach(doc => {
            if (!groups[doc.category]) groups[doc.category] = [];
            groups[doc.category].push(doc);
        });
        return groups;
    }, [filteredDocuments]);

    const handleDownload = (e, file_path, title) => { // trigger
        if (file_path === '#') { // check
            e.preventDefault();
            alert(`Sistem Simulasi: Memulakan pautan/fail "${title}"... (Fail fizikal tidak ditemui di pelayan)`);
        }
    };

    const toggleCategory = (category) => { // toggle
        setExpandedCategory(prev => prev === category ? null : category);
    };

    const renderDocumentItem = (doc) => {
        const style = getFileStyle(doc.file_ext);
        return (
            <div 
                key={doc.id} 
                className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200 group/item hover:shadow-xs"
            >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border ${style.bg} ${style.color} ${style.border} group-hover/item:scale-105 transition-transform duration-200`}>
                        {style.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-800 text-xs sm:text-sm group-hover/item:text-[#0a192f] transition-colors leading-snug truncate">
                            <HighlightedText text={doc.title} highlight={searchTerm} />
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${style.badge}`}>
                                {doc.file_ext}
                            </span>
                            {doc.sub_category && doc.category === 'Borang-borang' && (
                                <span className="text-[11px] text-slate-400 font-medium truncate">
                                    • {doc.sub_category}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <a
                    href={doc.download_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleDownload(e, doc.download_path, doc.title)} // trigger
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-50 hover:bg-[#0a192f] text-slate-600 hover:text-white border border-slate-200 hover:border-[#0a192f] text-xs font-bold transition-all duration-200 shrink-0 shadow-2xs group-hover/item:border-slate-300"
                    title="Buka / Muat Turun Dokumen"
                >
                    <span className="hidden sm:inline">Muat Turun</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            </div>
        );
    };

    // --3. UI--
    return (
        <PublicLayout auth={auth}>
            <Head title="Dokumen & Muat Turun - Kopmedia" />

            <div className="bg-[#f4f7fb] min-h-screen pb-24">
                {/* Header section */}
                <div className="relative overflow-hidden bg-[#0a192f] text-white min-h-[320px] md:min-h-[360px] flex flex-col items-center justify-start pt-28 md:pt-32 pb-8 md:pb-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a192f] to-[#0a192f] pointer-events-none"></div>

                    <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-wider drop-shadow-lg text-center w-full mb-3 md:mb-4">
                            DOKUMEN
                        </h1>
                        <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-center">
                            Pusat muat turun dokumen, borang, jadual bayaran balik, dan rujukan rasmi koperasi.
                        </p>
                    </div>

                    {/* Minimalist Back Arrow at bottom left of header */}
                    <div className="absolute bottom-3 md:bottom-4 inset-x-0 z-20 pointer-events-none">
                        <div className="max-w-[1350px] mx-auto px-4 md:px-8">
                            <Link
                                href={route('home')}
                                className="pointer-events-auto inline-flex items-center text-white/60 hover:text-white transition-colors duration-200 group p-1.5 -ml-1.5"
                                title="Kembali ke Laman Utama"
                            >
                                <svg className="w-8 h-4 md:w-10 md:h-4 transform group-hover:-translate-x-1.5 transition-transform duration-200" fill="none" viewBox="0 0 32 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M31 6H1m0 0l5-5m-5 5l5 5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                <main className="max-w-[1350px] mx-auto px-4 md:px-8 pt-8 pb-16">

                    {/* Left-aligned Search Bar to match Perkhidmatan page */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari dokumen, borang, atau jadual..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // input
                                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0a192f]/10 focus:border-[#0a192f] transition-all"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-rose-500 transition-colors" /* trigger */>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200/90 px-3.5 py-2.5 rounded-xl shadow-xs self-start sm:self-auto">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Jumlah Dokumen: <span className="font-bold text-[#0a192f]">{filteredDocuments.length}</span>
                        </div>
                    </div>

                    {/* Content Main Accordions */}
                    {categoriesToRender.length > 0 ? (
                        <div className="flex flex-col gap-5 w-full">
                            {categoriesToRender.map((category) => {
                                const items = groupedDocuments[category] || [];
                                const isExpanded = expandedCategory === category || searchTerm.trim().length > 0;
                                const style = getCategoryStyle(category);

                                let contentToRender;
                                if (category === 'Borang-borang') {
                                    // Group by sub_category
                                    const subGroups = {};
                                    items.forEach(doc => {
                                        const sub = doc.sub_category || 'Lain-lain';
                                        if (!subGroups[sub]) subGroups[sub] = [];
                                        subGroups[sub].push(doc);
                                    });

                                    contentToRender = (
                                        <div className="space-y-6">
                                            {Object.keys(subGroups).sort().map(sub => (
                                                <div key={sub} className="space-y-3">
                                                    <div className="flex items-center gap-2 px-1">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-md">
                                                            {sub}
                                                        </span>
                                                        <span className="text-xs text-slate-400 font-medium">
                                                            ({subGroups[sub].length})
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {subGroups[sub].map(doc => renderDocumentItem(doc))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                } else {
                                    contentToRender = (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {items.map(doc => renderDocumentItem(doc))}
                                        </div>
                                    );
                                }

                                return (
                                    <div 
                                        id={`accordion-${category}`}
                                        key={category} 
                                        className="flex flex-col w-full scroll-mt-24"
                                    >
                                        {/* Card Header matching Perkhidmatan style */}
                                        <div
                                            onClick={() => toggleCategory(category)} // toggle
                                            className={`flex items-center justify-between gap-4 bg-white p-5 sm:p-6 transition-all duration-300 border cursor-pointer group w-full ${
                                                isExpanded 
                                                    ? `rounded-t-2xl border-slate-300/90 border-b-transparent ring-2 ring-[#0a192f]/5 shadow-xs ${style.shadow}` 
                                                    : `rounded-2xl border-slate-200/90 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${style.shadow}`
                                            }`}
                                        >
                                            <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
                                                <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 ${style.bg} ${style.text} ${style.hover} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-xs`}>
                                                    {getCategoryIcon(category)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`font-black ${isExpanded ? 'text-[#0a192f]' : 'text-slate-800 group-hover:text-[#0a192f]'} text-base sm:text-lg transition-colors leading-snug truncate`}>
                                                        {category}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}>
                                                            {items.length} Dokumen
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 ml-2">
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                                                    <svg className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Collapsible Content */}
                                        <div className={`grid transition-all duration-300 ease-in-out bg-slate-50/70 border-x border-b shadow-xs rounded-b-2xl ${isExpanded ? 'grid-rows-[1fr] border-slate-300/90 opacity-100' : 'grid-rows-[0fr] border-transparent opacity-0 pointer-events-none'}`}>
                                            <div className="overflow-hidden">
                                                <div className="p-4 sm:p-6">
                                                    {contentToRender}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center">
                            <div className="relative w-24 h-24 mb-5 text-slate-300">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg font-black text-slate-800 mb-1.5 uppercase tracking-wider">Tiada Dokumen Ditemui</h3>
                            <p className="text-slate-500 max-w-sm text-xs sm:text-sm leading-relaxed mx-auto font-medium">
                                Tiada dokumen atau borang yang sepadan dengan carian "{searchTerm}". Sila cuba kata kunci lain.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </PublicLayout>
    );
}
