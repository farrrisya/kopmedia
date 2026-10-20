import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';

export default function Edit({ auth, document }) {
    const { data, setData, post, processing, errors , wasSuccessful, isDirty } = useForm({
        _method: 'put',
        title: document.title || '',
        category: document.category || 'Borang-borang',
        sub_category: document.sub_category || 'Skim Pembiayaan - Jangka Pendek',
        media_type: document.media_type || 'file',
        file: null,
        url_link: document.url_link || '',
        file_path: document.file_path || '',
    });

    const submitForm = (e) => {
        e.preventDefault();
        post(route('admin.muat-turun.update', document.id));
    };

    const borangSubCategories = [
        'Skim Pembiayaan - Jangka Pendek',
        'Skim Pembiayaan - Jangka Panjang',
        'Keanggotaan',
        'Insurans',
        'Dividen',
        'Kebajikan',
        'Lain-lain'
    ];

    return (
        <AdminLayout user={auth.user} headerTitle="Kemaskini Dokumen">
            <Head title="Kemaskini Dokumen - Admin" />

            
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
                        Kemaskini Dokumen
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
                            onChange={e => {
                                setData('category', e.target.value);
                                if (e.target.value !== 'Borang-borang') {
                                    setData('sub_category', '');
                                } else {
                                    setData('sub_category', 'Skim Pembiayaan - Jangka Pendek');
                                }
                            }}
                            className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                            required
                        >
                            <option value="Borang-borang">Borang-borang</option>
                            <option value="Undang-Undang Kecil">Undang-Undang Kecil</option>
                            <option value="Jadual Bayaran Balik Pembiayaan">Jadual Bayaran Balik Pembiayaan</option>
                        </select>
                        {errors.category && <div className="text-red-500 text-xs mt-1 font-bold">{errors.category}</div>}
                    </div>

                    {data.category === 'Borang-borang' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Sub Kategori</label>
                            <select
                                value={data.sub_category}
                                onChange={e => setData('sub_category', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                                required
                            >
                                {borangSubCategories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.sub_category && <div className="text-red-500 text-xs mt-1 font-bold">{errors.sub_category}</div>}
                        </div>
                    )}

                    <UnifiedMediaInput 
                        label="Fail Dokumen / Pautan URL (Abaikan jika tidak mahu tukar)"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        allowUrl={true}
                        value={
                                data.url_link ? { type: 'url', url: data.url_link } :
                                data.file ? { type: 'upload', file: data.file } :
                                data.file_path ? { type: 'media', path: data.file_path } : null
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

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-6 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 disabled:opacity-50 flex items-center gap-1.5 ${wasSuccessful && !isDirty ? "!bg-emerald-50 !border !border-emerald-500 !text-emerald-700 hover:!bg-emerald-100 shadow-none" : "text-white"}`}
                        >
                            
                                {wasSuccessful && !isDirty && (
                                    <svg className="w-4 h-4 text-emerald-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {wasSuccessful && !isDirty ? 'Telah dikemaskini' : (processing ? 'Menyimpan...' : 'Kemaskini')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
