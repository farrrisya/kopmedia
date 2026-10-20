import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'buletin',
        sub_category: 'kopmedia',
        media_type: 'file',
        file: null,
        url_link: '',
        file_path: '',
        image: null,
    });

    const submitForm = (e) => {
        e.preventDefault();
        post(route('admin.penerbitan.store'));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Tambah Penerbitan">
            <Head title="Tambah Penerbitan - Admin" />

            
            <div className="mb-6">
                <button type="button" onClick={() => window.history.back()} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0a192f] transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali
                </button>
            </div>
            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden w-full">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <h3 className="font-bold text-slate-800 text-lg">
                        Tambah Penerbitan Baru
                    </h3>
                </div>

                <form onSubmit={submitForm} className="p-6 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Tajuk</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                            required
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Kategori</label>
                        <select
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                            required
                        >
                            <option value="buletin">Buletin</option>
                            <option value="laporan">Laporan</option>
                        </select>
                        {errors.category && <div className="text-red-500 text-xs mt-1 font-bold">{errors.category}</div>}
                    </div>

                    {data.category === 'buletin' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Sub Kategori</label>
                            <select
                                value={data.sub_category}
                                onChange={e => setData('sub_category', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                                required
                            >
                                <option value="kopmedia">Buletin Kopmedia</option>
                                <option value="kontemporari">Buletin Kontemporari</option>
                            </select>
                            {errors.sub_category && <div className="text-red-500 text-xs mt-1 font-bold">{errors.sub_category}</div>}
                        </div>
                    )}

                    <UnifiedMediaInput 
                        label={data.category === 'buletin' ? 'Fail Buletin / Pautan URL' : 'Fail Laporan / Pautan URL'}
                        accept=".pdf,.jpg,.jpeg,.png"
                        allowUrl={true}
                        value={
                            data.media_type === 'url' ? { type: 'url', url: data.url_link } :
                            data.media_type === 'media' ? { type: 'media', path: data.file_path } :
                            data.file ? { type: 'upload', file: data.file } : null
                        }
                        onChange={(val) => {
                            if (!val) {
                                setData({ ...data, media_type: 'file', file: null, url_link: '', file_path: '' });
                            } else if (val.type === 'upload') {
                                setData({ ...data, media_type: 'file', file: val.file, url_link: '', file_path: '' });
                            } else if (val.type === 'media') {
                                setData({ ...data, media_type: 'media', file_path: val.path, file: null, url_link: '' });
                            } else if (val.type === 'url') {
                                setData({ ...data, media_type: 'url', url_link: val.url, file: null, file_path: '' });
                            }
                        }}
                        error={errors.file || errors.url_link || errors.file_path}
                    />

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Gambar Poster (Pilihan)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('image', e.target.files[0])}
                            className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                        />
                        {errors.image && <div className="text-red-500 text-xs mt-1 font-bold">{errors.image}</div>}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {processing && (
                                <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            Tambah
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
