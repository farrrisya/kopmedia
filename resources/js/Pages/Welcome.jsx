// --1. imports--
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import IKoopWidget from '@/Components/IKoopWidget';

// Custom component for subtle scroll reveal animation
function RevealOnScroll({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);
    
    return (
        <div 
            ref={ref} 
            className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// --2. main component--
export default function Welcome({ auth, notices: dbNotices, dbSliders, galleries, albums, penerbitans, arrahnuId, coopmartId, knstpId }) {
  const [activeSlide, setActiveSlide] = useState(0); // state
  const [hasInteracted, setHasInteracted] = useState(false); // state
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const galleryRef = useRef(null);
  const allItems = [
    ...(albums || []).map(a => ({ ...a, item_type: 'album', type: 'image' })),
    ...(galleries || []).map(g => ({ ...g, item_type: 'gallery' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

  const slides = dbSliders && dbSliders.length > 0
    ? dbSliders.map(s => ({
      image: `/storage/${s.image_path}`,
      link: s.link || '#'
    }))
    : [];

  const getPosterUrl = (item) => {
    if (item.image_path) return item.image_path.startsWith('http') ? item.image_path : `/storage/${item.image_path}`;
    if (item.file_path && item.file_path.match(/\.(jpeg|jpg|gif|png|webp)$/i)) return item.file_path.startsWith('http') ? item.file_path : `/storage/${item.file_path}`;
    if (item.url_link && item.url_link.match(/\.(jpeg|jpg|gif|png|webp)$/i)) return item.url_link;
    return null;
  };

  useEffect(() => { // trigger
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Infinite Auto-Scrolling for Gallery (Continuous Marquee)
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    const onEnter = () => setIsGalleryHovered(true);
    const onLeave = () => setIsGalleryHovered(false);
    
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('touchstart', onEnter, { passive: true });
    container.addEventListener('touchend', onLeave);

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchstart', onEnter);
      container.removeEventListener('touchend', onLeave);
    };
  }, [allItems, isGalleryHovered]);

  const notices = dbNotices && dbNotices.length > 0
    ? dbNotices.map(n => ({
      title: n.title,
      content: n.content && n.content !== '-' ? n.content.replace(/<[^>]*>?/gm, '') : '',
      image: n.image_path ? `/storage/${n.image_path}` : null,
      date: (n.published_at || n.created_at) ? new Date(n.published_at || n.created_at).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) : '',
      link: route('notices.show', n.id)
    }))
    : [];

  const activeServices = [
    {
      title: "AR-RAHNU",
      desc: "Pajak gadai Islam yang selamat, telus, dengan nilai pinjaman emas sehingga 75%.",
      link: arrahnuId ? route('public.produk.show', arrahnuId) : route('perkhidmatan'),
      logo: "/images/bg-arrahnu.webp",
      glowClass: "bg-blue-500",
      btnClass: "bg-blue-600/10 border-blue-500/20 group-hover:bg-blue-600/20 group-hover:border-blue-500/40 text-blue-50"
    },
    {
      title: "COOP MART",
      desc: "Kedai koperatif runcit menyediakan barangan keperluan harian pada harga mampu milik.",
      link: coopmartId ? route('public.produk.show', coopmartId) : route('perkhidmatan'),
      logo: "/images/bg-coopmart.jpg",
      glowClass: "bg-red-500",
      btnClass: "bg-red-600/10 border-red-500/20 group-hover:bg-red-600/20 group-hover:border-red-500/40 text-red-50"
    },
    {
      title: "KNSTP SMART SOLUTIONS",
      desc: "Penyelesaian pintar untuk pelbagai keperluan dan pengurusan.",
      link: knstpId ? route('public.produk.show', knstpId) : route('perkhidmatan'),
      logo: "/images/bg-knstp.jpg",
      glowClass: "bg-yellow-500",
      btnClass: "bg-yellow-500/10 border-yellow-500/20 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/40 text-yellow-50"
    }
  ];



  return (
    <PublicLayout auth={auth} isHome={true}>
      <Head title="Koperasi Media Prima Berhad (Kopmedia)" />

      {/* Full-width Top Banner */}
      <div className="w-full h-screen relative overflow-hidden flex items-center group/hero">
        {/* Background Image with Dynamic Ken Burns Effect */}
        <img 
          src="/images/welcome-banner.webp" 
          alt="Kopmedia Banner" 
          fetchPriority="high"
          decoding="async"
          className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] object-cover origin-center transform-gpu will-change-transform" 
          style={{ animation: 'kenburns 18s ease-in-out infinite alternate' }}
        />
        <style>{`
          @keyframes kenburns {
            0% {
              transform: scale(1.02) translate(0%, 0%);
            }
            100% {
              transform: scale(1.22) translate(-1%, -0.5%);
            }
          }
          @keyframes shine {
            0% { transform: translateX(-150%) skewX(-20deg); }
            45% { transform: translateX(150%) skewX(-20deg); }
            100% { transform: translateX(150%) skewX(-20deg); }
          }
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(6px); opacity: 0.95; }
          }
          @keyframes breath {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
        `}</style>

        {/* Gradient Overlay for Text Readability (Dark on left, transparent on right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 via-[#0a192f]/70 to-transparent"></div>

        {/* Content Container (Left Aligned) */}
        <div className="relative z-10 w-full max-w-[1350px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="max-w-2xl text-white">
            {/* Premium Accent Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-white/70"></div>
              <span className="text-white/90 font-black uppercase tracking-[0.25em] text-[11px] md:text-[12px]">
                Portal i-Koop
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.15] tracking-tight mb-6">
              Sertai Kami Sebagai Ahli Koperasi
            </h1>

            <p className="text-blue-50 text-base md:text-lg lg:text-xl leading-relaxed font-serif max-w-xl opacity-90 mb-10">
              Terokai kemudahan pembiayaan, kadar dividen yang kompetitif, dan perkhidmatan eksklusif khas untuk ahli.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="https://app.ikoop.com.my/knstp/index.php?page=login&error=" target="_blank" rel="noopener noreferrer" className="group/btn relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-red-600 text-white text-center font-bold uppercase tracking-widest text-[11px] lg:text-[12px] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:bg-red-700 whitespace-nowrap flex items-center justify-center gap-3">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" style={{ animation: 'shine 2.5s infinite ease-in-out' }}></div>
                <span className="relative z-10">Log Masuk</span>
                <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <Link href={route('keanggotaan')} className="group/btn w-full sm:w-auto px-8 py-4 bg-transparent text-white text-center font-bold uppercase tracking-widest text-[11px] lg:text-[12px] transition-all duration-300 border border-white/40 hover:border-white hover:bg-white/10 rounded-sm whitespace-nowrap flex items-center justify-center gap-3">
                Ketahui Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator - Sleek, Thin & Gentle */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none" style={{ animation: 'gentleFloat 2.5s ease-in-out infinite' }}>
          <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Top Row: Active Services */}
      <div className="w-full relative bg-slate-50 border-y border-slate-200 overflow-hidden">
        {/* Gradient Wallpaper Background */}
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-300/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-red-300/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] bg-yellow-200/25 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Cloud / Paint Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>

        <div className="w-full max-w-[1350px] mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {activeServices.map((srv, idx) => (
              <RevealOnScroll key={idx} delay={idx * 150} className="h-full">
                <Link
                  href={srv.link}
                  className="group bg-[#0a192f] rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-500 ease-out relative overflow-hidden flex flex-col h-full min-h-[380px]"
                >
                  {/* Soft ambient brand color glow spreading from top right */}
                  <div className={`absolute top-[-80px] right-[-80px] w-[250px] h-[250px] blur-[90px] rounded-full pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-60 ${srv.glowClass}`}></div>

                  {/* Top Half: Logo Background */}
                  <div className="h-[180px] w-full relative overflow-hidden bg-[#061122] shrink-0">
                    {srv.logo && (
                      <img src={srv.logo} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                    )}
                    {/* Gradient to softly blend the image into the bottom half */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent"></div>
                  </div>

                  {/* Bottom Half: Content */}
                  <div className="flex flex-col items-start relative z-10 p-8 pt-6 flex-1">

                    {/* Title */}
                    <h4 className="font-serif font-black text-2xl md:text-3xl text-white uppercase tracking-tight leading-none mb-6">{srv.title}</h4>

                    {/* Smooth Inset Text Well (No outlines) */}
                    <div className="bg-black/20 p-5 rounded-2xl w-full mb-4 shadow-[inset_0_2px_15px_rgba(0,0,0,0.2)]">
                      <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed line-clamp-3">
                        {srv.desc}
                      </p>
                    </div>

                    {/* Call to Action Button */}
                    <div className="mt-auto w-full pt-2">
                      <span className={`w-full py-3.5 border rounded-xl flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden ${srv.btnClass}`}>
                        <span className="transform group-hover:-translate-x-1 transition-transform duration-300 flex items-center">
                          TEROKAI
                        </span>
                        <span className="max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 overflow-hidden flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      {slides.length > 0 && (
        <div className="w-full bg-[#0a192f] relative overflow-hidden group">
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            {slides.map((slide, idx) => (
              <a
                key={idx}
                href={slide.link}
                className={`w-full transition-opacity duration-700 ease-in-out flex items-center justify-center ${idx === activeSlide ? 'relative opacity-100 z-10' : 'absolute inset-0 opacity-0 pointer-events-none z-0'}`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto select-none"
                />
              </a>
            ))}

            {/* Left/Right Buttons */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
                    setHasInteracted(true);
                  }} // trigger
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md"
                  aria-label="Previous Slide"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setActiveSlide((prev) => (prev + 1) % slides.length);
                    setHasInteracted(true);
                  }} // trigger
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md"
                  aria-label="Next Slide"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicator Dots */}
            {slides.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex justify-center pointer-events-none">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto shadow-sm">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveSlide(idx);
                        setHasInteracted(true);
                      }} // trigger
                      aria-label={`Slaid ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === activeSlide ? 'bg-white w-6 shadow-sm' : 'bg-white/40 hover:bg-white/70 w-2'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="w-full relative py-16 md:py-20 overflow-hidden bg-[#e9ecef] border-y border-[#dee2e6]">
        {/* Akses Pantas Content */}
        <div className="max-w-[1350px] mx-auto px-4 md:px-8 space-y-10 md:space-y-14 relative z-10">
          <RevealOnScroll>
            <div className="flex flex-col items-center justify-center gap-6 px-2 pb-2 text-center w-full">
              <div className="flex items-center justify-center gap-3 w-full">
                <span className="w-6 md:w-8 h-[2px] bg-red-600 rounded-full"></span>
                <span className="text-red-600 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] whitespace-nowrap">Navigasi Pintar</span>
                <span className="w-6 md:w-8 h-[2px] bg-red-600 rounded-full"></span>
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#0a192f] tracking-tight leading-[1.1]">
                Akses Pantas
              </h3>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed text-center max-w-xl">
                Terokai pelbagai perkhidmatan, bahan terbitan dan dokumen koperasi dengan mudah, semuanya di hujung jari anda.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            {/* Interactive expanding capsule pills */}
            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-6 md:gap-8 z-10">
              {/* Card 1: Penerbitan */}
              <Link
                href={route('public.penerbitan')}
                className="group relative flex items-center justify-between rounded-full bg-transparent border border-transparent overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[#0a192f] hover:border-rose-500/30 hover:shadow-[0_20px_50px_rgba(225,29,72,0.25)] w-[200px] h-[200px] hover:w-[calc(100vw-2rem)] max-w-[360px] sm:w-[240px] sm:h-[240px] sm:hover:w-[480px] sm:max-w-[480px] md:w-[320px] md:h-[320px] md:hover:w-[650px] md:max-w-[650px] cursor-pointer mx-auto"
                /* redirect */
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Left Circle Area (Centered Icon & Title) */}
                <div className="w-[200px] group-hover:w-[44%] sm:w-[240px] sm:group-hover:w-[44%] md:w-[320px] md:group-hover:w-[320px] h-full shrink-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-5 relative z-10 transition-all duration-700 text-center">
                  <span className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 group-hover:bg-rose-500/10 group-hover:border-rose-500/30 group-hover:scale-105 md:group-hover:scale-110 group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-500 shadow-[0_8px_20px_rgba(244,63,94,0.1)] group-hover:shadow-[0_0_30px_rgba(244,63,94,0.25)] relative overflow-hidden" style={{ animation: 'breath 4s ease-in-out infinite' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-rose-500 group-hover:drop-shadow-[0_0_12px_rgba(244,63,94,0.6)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </span>
                  <div className="flex flex-col items-center text-center transform group-hover:-translate-y-0.5 md:group-hover:-translate-y-1 transition-transform duration-500 px-2">
                    <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider md:tracking-widest text-slate-500 mb-0.5 md:mb-1.5 group-hover:text-rose-300 transition-colors duration-500">Koleksi Terbitan</span>
                    <h4 className="font-serif font-black text-base sm:text-lg md:text-xl text-[#0a192f] group-hover:text-white group-hover:text-lg md:group-hover:text-2xl transition-all duration-500">Penerbitan</h4>
                  </div>
                </div>

                {/* Right Content Area (Centered Content on Hover) */}
                <div className="flex-1 h-full flex flex-col items-center justify-center text-center px-3 sm:px-5 md:px-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 min-w-0 relative z-10">
                  <ul className="flex flex-col items-start gap-1.5 sm:gap-2 md:gap-3 mb-2.5 sm:mb-3 md:mb-5 text-[11px] sm:text-xs md:text-sm font-medium text-slate-300 w-fit mx-auto">
                    <li className="flex items-center gap-2.5 truncate"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] shrink-0"></span> <span className="truncate">Buletin Kopmedia</span></li>
                    <li className="flex items-center gap-2.5 truncate"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] shrink-0"></span> <span className="truncate">Buletin Kontemporari</span></li>
                    <li className="flex items-center gap-2.5 truncate"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] shrink-0"></span> <span className="truncate">Laporan Tahunan</span></li>
                  </ul>
                  <div className="inline-flex items-center justify-center gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-rose-400 group-hover:text-rose-300 transition-colors w-max py-1 px-3 md:py-2 md:px-4 rounded-full bg-white/5 border border-white/10 hover:bg-rose-500/20">
                    Baca Sekarang <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>

              {/* Card 2: Perkhidmatan */}
              <Link
                href={route('perkhidmatan')}
                className="group relative flex items-center justify-between rounded-full bg-transparent border border-transparent overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[#0a192f] hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.25)] w-[200px] h-[200px] hover:w-[calc(100vw-2rem)] max-w-[360px] sm:w-[240px] sm:h-[240px] sm:hover:w-[480px] sm:max-w-[480px] md:w-[320px] md:h-[320px] md:hover:w-[650px] md:max-w-[650px] cursor-pointer mx-auto"
                /* redirect */
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Left Circle Area (Centered Icon & Title) */}
                <div className="w-[200px] group-hover:w-[44%] sm:w-[240px] sm:group-hover:w-[44%] md:w-[320px] md:group-hover:w-[320px] h-full shrink-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-5 relative z-10 transition-all duration-700 text-center">
                  <span className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-cyan-50 flex items-center justify-center border border-cyan-100 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:scale-105 md:group-hover:scale-110 group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-500 shadow-[0_8px_20px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] relative overflow-hidden" style={{ animation: 'breath 4s ease-in-out infinite', animationDelay: '1s' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-cyan-500 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                  </span>
                  <div className="flex flex-col items-center text-center transform group-hover:-translate-y-0.5 md:group-hover:-translate-y-1 transition-transform duration-500 px-2">
                    <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider md:tracking-widest text-slate-500 mb-0.5 md:mb-1.5 group-hover:text-cyan-300 transition-colors duration-500">Pembiayaan & Fasiliti</span>
                    <h4 className="font-serif font-black text-base sm:text-lg md:text-xl text-[#0a192f] group-hover:text-white group-hover:text-lg md:group-hover:text-2xl transition-all duration-500">Perkhidmatan</h4>
                  </div>
                </div>

                {/* Right Content Area (Centered Content on Hover) */}
                <div className="flex-1 h-full flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 min-w-0 relative z-10">
                  <ul className="grid grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-1 sm:gap-y-1.5 md:gap-y-3 mb-2 sm:mb-3 md:mb-5 text-[10px] sm:text-xs md:text-sm font-medium text-slate-300 w-fit mx-auto">
                    <li className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></span> <span className="truncate">Pembiayaan</span></li>
                    <li className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></span> <span className="truncate">Kebajikan</span></li>
                    <li className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></span> <span className="truncate">Pelancongan</span></li>
                    <li className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></span> <span className="truncate">Seminar</span></li>
                    <li className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></span> <span className="truncate">Ar-Rahnu</span></li>
                    <li className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></span> <span className="truncate">Coop Mart</span></li>
                  </ul>
                  <div className="inline-flex items-center justify-center gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors w-max py-1 px-3 md:py-2 md:px-4 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20">
                    Lihat Semua <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>

              {/* Card 3: Pusat Dokumen */}
              <Link
                href={route('dokumen')}
                className="group relative flex items-center justify-between rounded-full bg-transparent border border-transparent overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[#0a192f] hover:border-amber-500/30 hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] w-[200px] h-[200px] hover:w-[calc(100vw-2rem)] max-w-[360px] sm:w-[240px] sm:h-[240px] sm:hover:w-[480px] sm:max-w-[480px] md:w-[320px] md:h-[320px] md:hover:w-[650px] md:max-w-[650px] cursor-pointer mx-auto"
                /* redirect */
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Left Circle Area (Centered Icon & Title) */}
                <div className="w-[200px] group-hover:w-[44%] sm:w-[240px] sm:group-hover:w-[44%] md:w-[320px] md:group-hover:w-[320px] h-full shrink-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-5 relative z-10 transition-all duration-700 text-center">
                  <span className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:scale-105 md:group-hover:scale-110 group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-500 shadow-[0_8px_20px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] relative overflow-hidden" style={{ animation: 'breath 4s ease-in-out infinite', animationDelay: '2s' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-amber-500 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </span>
                  <div className="flex flex-col items-center text-center transform group-hover:-translate-y-0.5 md:group-hover:-translate-y-1 transition-transform duration-500 px-2">
                    <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider md:tracking-widest text-slate-500 mb-0.5 md:mb-1.5 group-hover:text-amber-300 transition-colors duration-500">Borang Rasmi</span>
                    <h4 className="font-serif font-black text-base sm:text-lg md:text-xl text-[#0a192f] group-hover:text-white group-hover:text-lg md:group-hover:text-2xl transition-all duration-500">Dokumen</h4>
                  </div>
                </div>

                {/* Right Content Area (Centered Content on Hover) */}
                <div className="flex-1 h-full flex flex-col items-center justify-center text-center px-3 sm:px-5 md:px-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 min-w-0 relative z-10">
                  <ul className="flex flex-col items-start gap-1.5 sm:gap-2 md:gap-3 mb-2.5 sm:mb-3 md:mb-5 text-[11px] sm:text-xs md:text-sm font-medium text-slate-300 w-fit mx-auto">
                    <li className="flex items-center gap-2.5 truncate"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] shrink-0"></span> <span className="truncate">Borang-borang</span></li>
                    <li className="flex items-center gap-2.5 truncate"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] shrink-0"></span> <span className="truncate">Undang-Undang Kecil</span></li>
                    <li className="flex items-center gap-2.5 truncate"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] shrink-0"></span> <span className="truncate">Jadual Bayaran Balik</span></li>
                  </ul>
                  <div className="inline-flex items-center justify-center gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors w-max py-1 px-3 md:py-2 md:px-4 rounded-full bg-white/5 border border-white/10 hover:bg-amber-500/20">
                    Muat Turun <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <main className="w-full flex flex-col">

        {/* Berita & Notis Section */}
        <section className="w-full py-16 md:py-20 bg-[#e9ecef] relative overflow-hidden">
          {/* Very faint background elements to make it premium */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none"></div>

          {/* New Ambient Background Glows */}
          <div className="absolute top-[20%] left-[-10%] w-[35rem] h-[35rem] bg-blue-300/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-amber-300/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-[1350px] mx-auto px-4 md:px-8 flex flex-col gap-6 md:gap-10 relative z-10">
            <RevealOnScroll>
              {/* Upgraded Header Outside the Box */}
              <div className="flex flex-col items-center justify-center gap-3 px-2 pb-2 text-center w-full">
                <div className="flex items-center justify-center gap-3">
                  <span className="w-4 h-0.5 md:w-8 md:h-1 bg-red-600 rounded-full"></span>
                  <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.2em]">Terkini dari Koperasi</span>
                  <span className="w-4 h-0.5 md:w-8 md:h-1 bg-red-600 rounded-full"></span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif font-black text-[#0a192f] tracking-tight leading-tight">
                  Berita & Notis
                </h3>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              {/* News Cards Container */}
              <div className="w-full bg-white/95 rounded-[2.5rem] p-6 md:p-10 flex flex-col relative overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100">

              {/* Interactive Animated Background Elements (Non-hover) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Orb 1 */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-blue-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
                {/* Animated Orb 2 */}
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-rose-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '7s' }}></div>
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:24px_24px]"></div>
              </div>

              <div className={`grid grid-cols-1 ${penerbitans && penerbitans.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-6 md:gap-10 relative z-10 items-stretch`}>
                {/* Left Column: Featured Article (Hero) */}
                <div className="lg:col-span-1 flex flex-col h-full">
                  {notices.length > 0 ? (
                    <Link href={notices[0].link} className="flex-1 group relative block w-full overflow-hidden bg-slate-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.2)] transition-all duration-500">
                      {notices[0].image ? (
                        <img src={notices[0].image} alt={notices[0].title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top scale-[1.03]" />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                          <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* Dark gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>

                      {/* Text Content over Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end space-y-3">
                        <div className="inline-flex">
                          <span className="bg-red-600/90 backdrop-blur-sm border border-red-500/50 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest shadow-[0_4px_10px_rgba(220,38,38,0.4)] rounded-sm">Berita Utama</span>
                        </div>
                        <h4 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug drop-shadow-lg max-w-3xl group-hover:underline decoration-2 underline-offset-4">
                          {notices[0].title}
                        </h4>
                        {notices[0].content && (
                          <p className="text-slate-300 text-sm line-clamp-2 max-w-3xl drop-shadow-md mt-1">
                            {notices[0].content}
                          </p>
                        )}

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[11px] font-semibold w-fit mt-1">
                          <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{notices[0].date.split(', ')[0] || notices[0].date}</span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-full min-h-[300px] bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                      <span className="text-sm font-bold uppercase tracking-widest">Tiada Berita Terkini</span>
                    </div>
                  )}

                  {/* Button Lihat Semua Berita */}
                  <div className="mt-5 flex justify-start pl-2">
                    <Link href={route('public.notices')} className="inline-flex items-center gap-2 text-sm font-bold text-[#0a192f] hover:text-[#112a4f] hover:gap-3 transition-all duration-300 group">
                      <span className="border-b border-transparent group-hover:border-[#112a4f] pb-0.5">Lihat Semua Berita</span> <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Buletin Grid */}
                {penerbitans && penerbitans.length > 0 && (
                  <div className="lg:col-span-1 flex flex-col h-full">
                    <div className="flex-1 flex flex-col bg-slate-50/50 p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                      <div className="flex flex-col gap-1 mb-6 border-b border-slate-200/60 pb-4 shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Terbitan</span>
                        <h4 className="font-serif font-bold text-[#0a192f] text-xl lg:text-2xl">Buletin Kopmedia</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-6 lg:gap-8 flex-1">
                        {penerbitans.slice(0, 4).map((item, idx) => (
                          <a
                            key={idx}
                            href={item.url_link || (item.file_path && item.file_path !== '#' ? `/storage/${item.file_path}` : '#')}
                            target={item.file_path !== '#' ? "_blank" : "_self"}
                            className="group block relative w-full aspect-[1/1.414] rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-500 bg-slate-100"
                          >
                            {getPosterUrl(item) ? (
                              <img src={getPosterUrl(item)} alt="Buletin Kopmedia" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-slate-400 bg-slate-100 border border-slate-200">
                                <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-[11px] font-bold uppercase leading-tight line-clamp-3 px-2">{item.title}</span>
                              </div>
                            )}

                            {/* Glossy overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Button Lihat Semua Buletin */}
                    <div className="mt-5 flex justify-start pl-2">
                      <Link href={route('public.penerbitan')} className="inline-flex items-center gap-2 text-sm font-bold text-[#0a192f] hover:text-[#112a4f] hover:gap-3 transition-all duration-300 group">
                        <span className="border-b border-transparent group-hover:border-[#112a4f] pb-0.5">Lihat Semua Buletin</span> <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </RevealOnScroll>
          </div>
        </section>



        {/* Gallery Section */}
        <section className="w-full pt-16 pb-10 md:pt-20 md:pb-14 bg-[#e9ecef] border-t border-[#dee2e6]">
          <div className="max-w-[1350px] mx-auto space-y-10 md:space-y-12">
            <div className="flex flex-col items-center justify-center gap-3 px-2 pb-0 text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="w-4 h-0.5 md:w-8 md:h-1 bg-red-600 rounded-full"></span>
                <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.2em]">Koleksi Foto & Video</span>
                <span className="w-4 h-0.5 md:w-8 md:h-1 bg-red-600 rounded-full"></span>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif font-black text-[#0a192f] tracking-tight leading-tight">
                Galeri Aktiviti
              </h3>
            </div>
            {/* Interactive Carousel */}
            <div className="w-full">
              <div
                ref={galleryRef}
                className="flex overflow-hidden group/marquee pb-12 pt-4 w-full relative"
              >
              <div className="flex shrink-0 animate-marquee-slow gap-4 md:gap-8 pr-4 md:pr-8 min-w-max hover:[animation-play-state:paused]">
                {allItems.map((item, index) => (
                  <Link
                    key={`t1-${item.item_type}-${item.id}-${index}`}
                    href={item.item_type === 'album' ? route('galeri.album', item.id) : route('galeri')}
                    className="shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transform hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-300 cursor-pointer group/gal relative w-48 h-60 sm:w-64 sm:h-72 md:w-80 md:h-96 border border-slate-200 bg-white"
                  >
                    {item.item_type === 'album' && !item.latest_gallery ? (
                      <div className="w-full h-full bg-amber-50 text-amber-500 flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 md:w-10 md:h-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    ) : (
                      <>
                        <img
                          src={`/storage/${item.item_type === 'album' ? item.latest_gallery?.image_path : item.image_path}`}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/gal:scale-110"
                        />

                        {/* Dark gradient base that gets taller on hover to frame the button */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3.5 sm:p-4 md:p-6 transition-all duration-300 opacity-90 group-hover/gal:opacity-100">
                          <div className="flex flex-col gap-1.5 md:gap-2 w-full">

                            {/* Title slides up higher on hover */}
                            <span className="text-white font-serif font-bold text-sm sm:text-base md:text-xl leading-snug tracking-wide line-clamp-2 transform translate-y-4 md:translate-y-6 group-hover/gal:-translate-y-1 transition-transform duration-300 ease-out">
                              {item.title}
                            </span>

                            {/* Accent line */}
                            <div className="w-0 h-0.5 bg-white transform translate-y-4 md:translate-y-6 group-hover/gal:-translate-y-1 transition-all duration-300 group-hover/gal:w-10 md:group-hover/gal:w-16"></div>

                            {/* Interactive Button that slides in from the bottom */}
                            <div className="mt-1 md:mt-2 flex items-center gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest font-extrabold text-white opacity-0 transform translate-y-4 md:translate-y-6 group-hover/gal:opacity-100 group-hover/gal:translate-y-0 transition-all duration-300 ease-out delay-75">
                              Lihat Album <span className="text-white group-hover/gal:translate-x-1 transition-transform duration-300">&rarr;</span>
                            </div>

                          </div>
                        </div>
                      </>
                    )}
                  </Link>
                ))}
              </div>
              
              <div className="flex shrink-0 animate-marquee-slow gap-4 md:gap-8 pr-4 md:pr-8 min-w-max hover:[animation-play-state:paused]" aria-hidden="true">
                {allItems.map((item, index) => (
                  <Link
                    key={`t2-${item.item_type}-${item.id}-${index}`}
                    href={item.item_type === 'album' ? route('galeri.album', item.id) : route('galeri')}
                    className="shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transform hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-300 cursor-pointer group/gal relative w-48 h-60 sm:w-64 sm:h-72 md:w-80 md:h-96 border border-slate-200 bg-white"
                  >
                    {item.item_type === 'album' && !item.latest_gallery ? (
                      <div className="w-full h-full bg-amber-50 text-amber-500 flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 md:w-10 md:h-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    ) : (
                      <>
                        <img
                          src={`/storage/${item.item_type === 'album' ? item.latest_gallery?.image_path : item.image_path}`}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/gal:scale-110"
                        />

                        {/* Dark gradient base that gets taller on hover to frame the button */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3.5 sm:p-4 md:p-6 transition-all duration-300 opacity-90 group-hover/gal:opacity-100">
                          <div className="flex flex-col gap-1.5 md:gap-2 w-full">

                            {/* Title slides up higher on hover */}
                            <span className="text-white font-serif font-bold text-sm sm:text-base md:text-xl leading-snug tracking-wide line-clamp-2 transform translate-y-4 md:translate-y-6 group-hover/gal:-translate-y-1 transition-transform duration-300 ease-out">
                              {item.title}
                            </span>

                            {/* Accent line */}
                            <div className="w-0 h-0.5 bg-white transform translate-y-4 md:translate-y-6 group-hover/gal:-translate-y-1 transition-all duration-300 group-hover/gal:w-10 md:group-hover/gal:w-16"></div>

                            {/* Interactive Button that slides in from the bottom */}
                            <div className="mt-1 md:mt-2 flex items-center gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest font-extrabold text-white opacity-0 transform translate-y-4 md:translate-y-6 group-hover/gal:opacity-100 group-hover/gal:translate-y-0 transition-all duration-300 ease-out delay-75">
                              Lihat Album <span className="text-white group-hover/gal:translate-x-1 transition-transform duration-300">&rarr;</span>
                            </div>

                          </div>
                        </div>
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            </div>
            <div className="flex justify-center" style={{ marginTop: '2rem' }}>
              <Link href={route('galeri')} className="group shrink-0 flex items-center justify-center px-6 py-3 bg-[#0a192f] hover:bg-[#112a4f] text-white rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden">
                <span className="transform group-hover:-translate-x-1 transition-transform duration-300 flex items-center">
                  Lihat Semua Galeri
                </span>
                <span className="max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 overflow-hidden flex items-center justify-center">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
