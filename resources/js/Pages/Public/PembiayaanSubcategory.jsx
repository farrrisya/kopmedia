import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

// --1. main component--
export default function PembiayaanSubcategory({ auth, products = [], subcategoryName }) {
  // --2. UI--
  return (
    <PublicLayout auth={auth}>
      <Head title={`${subcategoryName} - Kopmedia`} />
      
      {/* Header section */}
      <div className="relative overflow-hidden bg-[#0a192f] text-white min-h-[320px] md:min-h-[360px] flex flex-col items-center justify-start pt-28 md:pt-32 pb-8 md:pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a192f] to-[#0a192f] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-wider drop-shadow-lg text-center w-full mb-3 md:mb-4">
                {subcategoryName}
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-center">
                Pilih kemudahan pembiayaan yang bersesuaian dengan keperluan anda.
            </p>
        </div>

        {/* Minimalist Back Arrow at bottom left of header */}
        <div className="absolute bottom-3 md:bottom-4 inset-x-0 z-20 pointer-events-none">
            <div className="max-w-[1350px] mx-auto px-4 md:px-8">
                <Link
                    href={route('perkhidmatan')}
                    className="pointer-events-auto inline-flex items-center text-white/60 hover:text-white transition-colors duration-200 group p-1.5 -ml-1.5"
                    title="Kembali ke Perkhidmatan"
                >
                    <svg className="w-8 h-4 md:w-10 md:h-4 transform group-hover:-translate-x-1.5 transition-transform duration-200" fill="none" viewBox="0 0 32 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M31 6H1m0 0l5-5m-5 5l5 5" />
                    </svg>
                </Link>
            </div>
        </div>
      </div>

      <main className="max-w-[1350px] mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-24">
        {/* Content */}
        {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((doc) => (
                    <Link
                        key={doc.id}
                        href={route('public.produk.show', doc.id)}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 group overflow-hidden flex flex-col"
                    >
                        {doc.image && (
                            <div className="w-full h-48 bg-slate-100 overflow-hidden relative border-b border-slate-100">
                                <img src={doc.image} alt={doc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 mb-2">
                                {doc.sub_category || doc.category}
                            </span>
                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-snug mb-5">
                                {doc.title}
                            </h3>
                            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">Ketahui Lanjut</span>
                                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-600 mb-1">Tiada Maklumat Ditemui</h3>
                <p className="text-slate-400 text-sm">Harap maaf, senarai pembiayaan belum tersedia.</p>
            </div>
        )}
      </main>
    </PublicLayout>
  );
}
