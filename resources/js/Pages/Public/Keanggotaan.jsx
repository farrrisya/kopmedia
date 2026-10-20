import React, { useState, useCallback } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

// --1. properties--
const benefits = [
    {
        id: '01',
        title: 'Tabungan & Pelaburan',
        subtitle: 'Simpanan & Pulangan',
        badgeBg: 'bg-blue-50 text-blue-600 border-blue-200/80',
        tagBg: 'bg-blue-50 text-blue-700 border-blue-200/60',
        iconBg: 'bg-blue-100 text-blue-600',
        accentGradient: 'from-blue-600 via-indigo-600 to-blue-700',
        items: [
            'Caruman minima RM50 sebulan',
            'Simpanan Khas',
            'Dividen Tahunan',
            'Skim Pelaburan Dana Ar Rahn',
            'Buku Simpanan Emas (BSE)',
        ],
    },
    {
        id: '02',
        title: 'Skim Pembiayaan',
        subtitle: 'Bantuan Kewangan',
        badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
        tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        iconBg: 'bg-emerald-100 text-emerald-600',
        accentGradient: 'from-emerald-600 via-teal-600 to-emerald-700',
        items: [
            'Tunai Segera RM 600',
            'Kecemasan RM3000',
            'Kembali ke Sekolah RM1800',
            'Sara Hidup RM1000',
            'Skim Peribadi Tanpa Penjamin RM5000',
            'Insurans, Cukai Jalan & Tayar RM 5000',
        ],
    },
    {
        id: '03',
        title: 'Skim Perlindungan',
        subtitle: 'Takaful & Perlindungan',
        badgeBg: 'bg-red-50 text-red-600 border-red-200/80',
        tagBg: 'bg-red-50 text-red-700 border-red-200/60',
        iconBg: 'bg-red-100 text-red-600',
        accentGradient: 'from-red-600 via-rose-600 to-red-700',
        items: [
            'Perlindungan anggota & keluarga serendah RM10/bulan',
            'Manfaat perlindungan sehingga RM34,000 seorang',
            'Tuntutan pampasan pantas dan mudah',
        ],
    },
    {
        id: '04',
        title: 'Tabung Kebajikan Am',
        subtitle: 'Sumbangan & Kebajikan',
        badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
        tagBg: 'bg-amber-50 text-amber-700 border-amber-200/60',
        iconBg: 'bg-amber-100 text-amber-600',
        accentGradient: 'from-amber-500 via-orange-500 to-amber-600',
        items: [
            'Kemasukan Tahun 1 RM100',
            'Penyakit Kronik RM200',
            'Bencana Alam RM300',
            'Anugerah Kecemerlangan Pendidikan',
        ],
    },
    {
        id: '05',
        title: 'Tabung Khairat Kematian',
        subtitle: 'Bantuan Pengurusan',
        badgeBg: 'bg-purple-50 text-purple-600 border-purple-200/80',
        tagBg: 'bg-purple-50 text-purple-700 border-purple-200/60',
        iconBg: 'bg-purple-100 text-purple-600',
        accentGradient: 'from-purple-600 via-violet-600 to-purple-700',
        items: [
            'Anggota RM1000',
            'Pasangan RM500',
            'Anak RM500',
            'Ibu/Bapa RM300',
            'Ibu/Bapa Mertua RM300',
        ],
    },
    {
        id: '06',
        title: 'Manfaat Lain',
        subtitle: 'Peluang & Aktiviti',
        badgeBg: 'bg-cyan-50 text-cyan-600 border-cyan-200/80',
        tagBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
        iconBg: 'bg-cyan-100 text-cyan-600',
        accentGradient: 'from-cyan-600 via-sky-600 to-blue-600',
        items: [
            'Latihan/Kursus IKMA dengan yuran minima',
            'Terlibat dengan aktiviti & program koperasi',
            'Diskaun rakan niaga terpilih',
        ],
    },
];

// --2. main component--
export default function Keanggotaan() {
    const [activeIndex, setActiveIndex] = useState(0); // state
    const [touchStartX, setTouchStartX] = useState(null); // state
    const [touchEndX, setTouchEndX] = useState(null); // state
    const [isDragging, setIsDragging] = useState(false); // state

    // --3. actions--
    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => Math.max(0, prev - 1)); // trigger
    }, []);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => Math.min(benefits.length - 1, prev + 1)); // trigger
    }, []);

    const handleTouchStart = (e) => {
        setTouchStartX(e.targetTouches[0].clientX); // trigger
        setTouchEndX(null); // trigger
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX); // trigger
    };

    const handleTouchEnd = () => {
        if (touchStartX === null || touchEndX === null) return; // check
        const distance = touchStartX - touchEndX;
        if (distance > 45 && activeIndex < benefits.length - 1) {
            nextSlide(); // trigger
        } else if (distance < -45 && activeIndex > 0) {
            prevSlide(); // trigger
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true); // trigger
        setTouchStartX(e.clientX); // trigger
        setTouchEndX(null); // trigger
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return; // check
        setTouchEndX(e.clientX); // trigger
    };

    const handleMouseUp = () => {
        if (!isDragging) return; // check
        setIsDragging(false); // trigger
        if (touchStartX === null || touchEndX === null) return; // check
        const distance = touchStartX - touchEndX;
        if (distance > 45 && activeIndex < benefits.length - 1) {
            nextSlide(); // trigger
        } else if (distance < -45 && activeIndex > 0) {
            prevSlide(); // trigger
        }
    };

    const getCardStyle = (index) => {
        const diff = index - activeIndex;
        const absDiff = Math.abs(diff);

        if (absDiff === 0) {
            return {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1,
                zIndex: 30,
                pointerEvents: 'auto',
                filter: 'none',
            };
        } else if (absDiff === 1) {
            return {
                transform: `translate(calc(-50% + ${diff * 70}%), -50%) scale(0.88)`,
                opacity: 0.65,
                zIndex: 20,
                pointerEvents: 'auto',
                filter: 'blur(0.3px)',
                cursor: 'pointer',
            };
        } else if (absDiff === 2) {
            return {
                transform: `translate(calc(-50% + ${diff * 135}%), -50%) scale(0.76)`,
                opacity: 0.25,
                zIndex: 10,
                pointerEvents: 'auto',
                filter: 'blur(1px)',
                cursor: 'pointer',
            };
        } else {
            return {
                transform: `translate(calc(-50% + ${diff * 180}%), -50%) scale(0.65)`,
                opacity: 0,
                zIndex: 0,
                pointerEvents: 'none',
            };
        }
    };

    // --4. UI--
    return (
        <PublicLayout isHome={false}>
            <Head title="Keanggotaan - Kopmedia" />
            
            {/* Header Section */}
            <div className="relative overflow-hidden bg-[#0a192f] text-white min-h-[320px] md:min-h-[360px] flex flex-col items-center justify-start pt-28 md:pt-32 pb-8 md:pb-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a192f] to-[#0a192f] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-wider drop-shadow-lg text-center w-full mb-3 md:mb-4">
                        MANFAAT KEANGGOTAAN
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-center">
                        Nikmati pelbagai keistimewaan eksklusif termasuk penyelesaian kewangan bersepadu dan manfaat perlindungan yang direka khas untuk anda dan keluarga.
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

            <div className="max-w-[1350px] mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24 space-y-16 md:space-y-24">
                
                {/* 6 Benefits Coverflow Slider Section */}
                <div className="w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight">
                                Manfaat Utama
                            </h3>
                            <p className="text-slate-500 text-sm md:text-base">Kelebihan yang bakal anda nikmati sebagai anggota berdaftar.</p>
                        </div>

                        {/* Top quick navigation status with FIXED consistent box size */}
                        <div className="w-[260px] h-[40px] px-4 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between text-xs text-slate-600 shrink-0 self-start md:self-end">
                            <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
                                <span>{benefits[activeIndex].id}</span>
                                <span className="text-slate-300 font-normal">/</span>
                                <span className="text-slate-400 font-normal">06</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                            <span className="font-medium text-slate-700 truncate max-w-[145px] text-right">
                                {benefits[activeIndex].title}
                            </span>
                        </div>
                    </div>

                    {/* Neat Professional Coverflow Carousel Stage */}
                    <div 
                        className="relative w-full h-[490px] sm:h-[520px] md:h-[540px] rounded-2xl md:rounded-3xl bg-slate-50/70 border border-slate-200/80 overflow-hidden select-none flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {/* Clean minimalist Left Arrow Button */}
                        <button
                            type="button"
                            onClick={prevSlide}
                            disabled={activeIndex === 0}
                            aria-label="Previous Slide"
                            className={`absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-slate-800 border border-slate-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                                activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            }`}
                        >
                            <svg className="w-5 h-5 -translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Clean minimalist Right Arrow Button */}
                        <button
                            type="button"
                            onClick={nextSlide}
                            disabled={activeIndex === benefits.length - 1}
                            aria-label="Next Slide"
                            className={`absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-slate-800 border border-slate-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                                activeIndex === benefits.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            }`}
                        >
                            <svg className="w-5 h-5 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Enhanced Slide Cards */}
                        <div className="relative w-full h-full">
                            {benefits.map((benefit, index) => {
                                const style = getCardStyle(index);
                                const isCurrent = index === activeIndex;

                                return (
                                    <div
                                        key={benefit.id}
                                        onClick={() => {
                                            if (!isCurrent) setActiveIndex(index); // trigger
                                        }}
                                        style={style}
                                        className={`absolute top-1/2 left-1/2 w-[300px] sm:w-[360px] md:w-[410px] min-h-[390px] sm:min-h-[420px] md:min-h-[450px] bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden ${
                                            isCurrent 
                                                ? 'border-slate-300 shadow-[0_20px_45px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5' 
                                                : 'border-slate-200 shadow-md hover:border-slate-300'
                                        }`}
                                    >
                                        {/* Top Accent Gradient Bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${benefit.accentGradient}`}></div>

                                        {/* Card Header & Content */}
                                        <div>
                                            <div className="flex items-center justify-between mb-5 pt-1">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl font-serif border shadow-xs ${benefit.badgeBg}`}>
                                                    {benefit.id}
                                                </div>
                                                <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${benefit.tagBg}`}>
                                                    {benefit.subtitle}
                                                </span>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-snug">
                                                {benefit.title}
                                            </h3>

                                            {/* Bullet Items with neat clean SVG Checkmarks */}
                                            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
                                                {benefit.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2.5">
                                                        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${benefit.iconBg}`}>
                                                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Bottom Card Footer */}
                                        <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                            <span className="font-semibold tracking-wider text-[10px] text-slate-500 uppercase">Kopmedia Berhad</span>
                                            <span className="font-mono text-[10px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                                {benefit.id} / 06
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Small, Smart, Monochrome Pagination Dots */}
                    <div className="flex items-center justify-center gap-1.5 mt-5">
                        {benefits.map((benefit, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${
                                    i === activeIndex
                                        ? 'w-5 h-1.5 bg-slate-900 shadow-xs'
                                        : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Info and CTA Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Column: Eligibility & Contact (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Kelayakan Menjadi Anggota
                            </h4>
                            <ul className="text-slate-600 space-y-2.5 text-xs sm:text-sm">
                                <li className="flex items-start gap-2">- Kakitangan NSTP/MPB (Sepenuhnya Masa dan Kontrak HR)</li>
                                <li className="flex items-start gap-2">- Bekas Kakitangan NSTP/MPB</li>
                                <li className="flex items-start gap-2">- Ahli Keluarga</li>
                                <li className="flex items-start gap-2">- Rakan Niaga Koperasi</li>
                            </ul>
                            <p className="text-[10px] text-slate-400 mt-4 italic">* Tertakluk Terma dan Syarat</p>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                            <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Pertanyaan & Bantuan
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mb-4">
                                Sebarang pertanyaan berkaitan pendaftaran, sila hubungi wakil kami:
                            </p>
                            <a 
                                href="https://wa.me/601120507235"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-slate-900 font-bold text-xs sm:text-sm bg-white hover:bg-emerald-50 p-3 rounded-xl border border-slate-200 hover:border-emerald-200 shadow-xs transition-all duration-300 group cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform duration-300 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                011-20507235 (Ismadi/Ridzwan)
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Registration Instructions & CTA (7 cols - slightly bigger) */}
                    <div className="lg:col-span-7 w-full bg-[#0a192f] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-800/20 via-[#172554]/20 to-transparent pointer-events-none"></div>
                        
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                                <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                                    Langkah Mudah Pendaftaran:
                                </h3>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shrink-0 self-start sm:self-auto">
                                    <img 
                                        src="/images/ikoop.png" 
                                        alt="i-Koop" 
                                        className="h-6 sm:h-7 w-auto object-contain brightness-110 drop-shadow-sm" 
                                    />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-200">
                                        Portal Rasmi
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8 relative z-10">
                                <div className="flex gap-4 items-center bg-white/[0.04] border border-white/10 rounded-2xl p-4 transition-colors hover:bg-white/[0.07]">
                                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                                        1
                                    </div>
                                    <p className="text-slate-300 text-xs sm:text-sm">
                                        Klik pada pautan <span className="text-white font-bold">DAFTAR ANGGOTA BARU</span> di portal i-Koop.
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center bg-white/[0.04] border border-white/10 rounded-2xl p-4 transition-colors hover:bg-white/[0.07]">
                                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                                        2
                                    </div>
                                    <p className="text-slate-300 text-xs sm:text-sm">
                                        Isi <span className="text-white font-bold">No. Kad Pengenalan (KP)</span> dan ikut arahan seterusnya yang dipaparkan.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-between">
                            <p className="text-slate-300 text-xs sm:text-sm max-w-xs text-center sm:text-left">
                                Daftar sekarang dan nikmati segala kemudahan serta manfaat khas untuk anda.
                            </p>
                            <a 
                                href="https://app.ikoop.com.my/knstp/index.php?page=login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 w-full sm:w-auto whitespace-nowrap"
                            >
                                <span>Klik Untuk Daftar</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}



