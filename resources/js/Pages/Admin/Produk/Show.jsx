import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, product }) {
  let filePath = "#";
  if (product.media_type === 'file' || product.media_type === 'media') {
    const baseUrl = route('home').replace(/\/$/, '');
    filePath = product.file_path ? `${baseUrl}/storage/${product.file_path}` : "#";
  } else if (product.media_type === 'url') {
    filePath = product.url_link || "#";
  }

  const hasMedia = filePath !== "#";
  const hasDescription = product.description && product.description.trim() !== '' && product.description !== '<p><br></p>';

  return (
    <AdminLayout user={auth.user} headerTitle="Maklumat Produk & Perkhidmatan">
      <Head title={`Maklumat ${product.title} - Admin`} />

      <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden w-full mb-8">
        <div className="p-6 border-b border-slate-50 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#0a192f]/10 text-[#0a192f] text-xs uppercase font-black tracking-wider rounded-md border border-[#0a192f]/20">
              {product.category}
            </span>
            {product.sub_category && (
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs uppercase font-extrabold tracking-wider rounded border border-amber-100">
                {product.sub_category}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black mt-2 text-[#0a192f] leading-tight">
            {product.title}
          </h1>
        </div>

        <div className="p-6 md:p-8">
          {hasDescription ? (
            <div 
              className="prose prose-slate max-w-none mb-10 text-slate-700 leading-relaxed font-medium [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline [&_strong]:font-black [&_strong]:text-slate-900 [&_b]:font-black [&_b]:text-slate-900"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <div className="text-slate-500 italic mb-10">
              Tiada penerangan disediakan untuk produk/perkhidmatan ini.
            </div>
          )}

          {hasMedia && (
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-slate-700">Lampiran Tambahan</span>
                <span className="text-sm text-slate-500">Klik butang untuk melihat atau memuat turun fail berkaitan.</span>
              </div>
              <a
                href={filePath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0a192f] hover:bg-[#0a192f] text-white rounded-md text-sm font-extrabold uppercase tracking-wide shadow-md transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {product.media_type === 'url' ? 'Buka Pautan' : 'Muat Turun Fail'}
              </a>
            </div>
          )}
          
          <div className="flex justify-end pt-8 border-t border-slate-100 mt-8">
            <button type="button" onClick={() => window.history.back()} 
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-bold transition shadow-xs flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
