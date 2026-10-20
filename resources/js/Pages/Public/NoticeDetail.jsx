// --1. imports--
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import 'react-quill/dist/quill.snow.css';

// --2. main component--
export default function NoticeDetail({ auth, notice }) {
    return (
        <PublicLayout auth={auth}>
            <Head title={`${notice.title} - Kopmedia`} />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[#0a192f] text-white min-h-[320px] md:min-h-[360px] flex flex-col items-center justify-start pt-28 md:pt-32 pb-8 md:pb-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a192f] to-[#0a192f] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-wider drop-shadow-lg max-w-4xl text-center w-full">
                        {notice.title}
                    </h1>
                </div>

                {/* Minimalist Back Arrow at bottom left of header */}
                <div className="absolute bottom-3 md:bottom-4 inset-x-0 z-20 pointer-events-none">
                    <div className="max-w-[1350px] mx-auto px-4 md:px-8">
                        <Link
                            href="/notis"
                            className="pointer-events-auto inline-flex items-center text-white/60 hover:text-white transition-colors duration-200 group p-1.5 -ml-1.5"
                            title="Kembali ke Berita & Notis"
                        >
                            <svg className="w-8 h-4 md:w-10 md:h-4 transform group-hover:-translate-x-1.5 transition-transform duration-200" fill="none" viewBox="0 0 32 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M31 6H1m0 0l5-5m-5 5l5 5" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-[1350px] mx-auto px-4 md:px-8 pt-8 md:pt-10 pb-16">

                <div className="bg-white rounded-md border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden p-6 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-slate-100 pb-4">
                        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Diterbitkan pada:</span>
                        <span className="font-semibold text-slate-600">
                            {new Date(notice.published_at || notice.created_at).toLocaleString('en-GB', { // convert
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </span>
                    </div>

                    {notice.content && notice.content !== '-' && (
                        <div className="ql-snow">
                            <div 
                                className="ql-editor !p-0 text-slate-700 font-medium 
                                            [&_h2]:font-black [&_h2]:text-[#0a192f] [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4
                                            [&_h3]:font-bold [&_h3]:text-[#0a192f] [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3
                                            [&_a]:text-blue-600 hover:[&_a]:text-blue-800 [&_a]:underline
                                            [&_img]:rounded-xl [&_img]:shadow-md"
                                dangerouslySetInnerHTML={{ __html: notice.content }}
                            />
                        </div>
                    )}

                    {notice.image_path ? ( // check
                        <div className="w-full rounded-md overflow-hidden border border-slate-100 flex justify-center bg-slate-50">
                            <img
                                src={`/storage/${notice.image_path}`}
                                alt={notice.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto max-w-2xl mx-auto object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-full rounded-md border border-slate-100 bg-slate-50 py-20 text-center flex flex-col items-center justify-center">
                            <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-slate-400 font-bold">Tiada Poster Disediakan</span>
                        </div>
                    )}
                </div>
            </main>
        </PublicLayout>
    );
}
