// --1. imports--
import { Link } from '@inertiajs/react';

// --2. main component--
export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen font-sans bg-[#0a192f] selection:bg-[#0a192f] selection:text-white relative overflow-hidden">
            
            {/* Enhanced Background with Texture & Grid */}
            <div className="absolute inset-0 z-0 bg-[#0a192f]">
                {/* 1. Base Image - Let original colors (like red gradient) show */}
                <div className="absolute inset-0 bg-[url('/images/welcome-banner.webp')] bg-cover bg-center"></div>
                
                {/* 2. Gradient Overlay - Heavy on left for text readability, clear on right for image volume */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/70 to-[#112240]/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-[#0a192f]/50 to-transparent"></div>
                
                {/* 3. Animated Glowing Orbs */}
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none animate-float"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none animate-float-delayed"></div>
                {/* Subtle red orb for volume */}
                <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[130px] pointer-events-none animate-float-delayed" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none animate-float"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row max-w-[1400px] mx-auto items-center justify-between px-6 sm:px-12 md:px-16 lg:px-8 xl:px-20 py-12 lg:py-0 gap-12 lg:gap-24 overflow-hidden">
                
                {/* Left Side: Typography and Features */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center mb-12 lg:mb-0 animate-fade-in-left opacity-0" style={{ animationDelay: '200ms' }}>
                    <div className="w-full max-w-[520px]">
                        
                        <div className="mb-10">
                            <Link href="/" className="inline-block transition-transform hover:scale-105 duration-500">
                                <img 
                                    src="/logo.png" 
                                    alt="Kopmedia Logo" 
                                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                                />
                            </Link>
                        </div>
                        
                        <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
                            Portal Pentadbir
                        </h2>
                        <p className="text-blue-100/90 text-[16px] leading-relaxed font-medium mb-12">
                            Sistem pengurusan kandungan yang selamat dan efisien. <br className="hidden sm:block" />
                            Akses alat pengurusan dan analitik portal secara bersepadu.
                        </p>

                        <div className="space-y-6">
                            {/* Feature 1 */}
                            <div className="flex items-center gap-5 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30 transition-colors group-hover:bg-blue-500/30">
                                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-[15px] tracking-wide">Pengurusan Kandungan</h4>
                                    <p className="text-blue-200/70 text-[14px] mt-0.5">Kawal sepenuhnya modul dan kandungan portal anda.</p>
                                </div>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="flex items-center gap-5 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/30 transition-colors group-hover:bg-amber-500/30">
                                    <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-[15px] tracking-wide">Analitik & Pelaporan</h4>
                                    <p className="text-blue-200/70 text-[14px] mt-0.5">Pantau statistik pelawat dan prestasi interaksi.</p>
                                </div>
                            </div>
                        </div>

                        {/* Back to Public Button */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <Link 
                                href="/"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                Kembali ke Laman Utama
                            </Link>
                        </div>
                    </div>
                    
                    <div className="mt-10 w-full max-w-[520px]">
                        <p className="text-[12px] font-medium text-blue-200/40 tracking-wide text-left">
                            &copy; {new Date().getFullYear()} Sistem Pengurusan Kandungan. Semua hak cipta terpelihara.
                        </p>
                    </div>
                </div>

                {/* Right Side: White Floating Login Card */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center items-center lg:items-end animate-fade-in-right opacity-0" style={{ animationDelay: '400ms' }}>
                    <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
