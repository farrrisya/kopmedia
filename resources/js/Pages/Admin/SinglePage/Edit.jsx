import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';


export default function Edit({ auth, slug, pageTitle, product }) {
    const { data, setData, post, processing, errors , wasSuccessful, isDirty } = useForm({
        title: product?.title || '',
        media_type: product?.media_type || 'file',
        file: null,
        url_link: product?.url_link || '',
        file_path: product?.file_path || '',
        description: product?.description || '',
        description2: product?.description2 || '',
    });

    const submitForm = (e) => {
        e.preventDefault();
        post(route('admin.page.update', slug));
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'align',
        'link', 'image'
    ];

    return (
        <AdminLayout user={auth.user} headerTitle={pageTitle}>
            <Head title={`Kemaskini ${pageTitle}`} />

            
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
            <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <h3 className="font-bold text-slate-800 text-lg">
                        Kemaskini Halaman {pageTitle}
                    </h3>
                </div>

                <form onSubmit={submitForm} className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Tajuk</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                        </div>

                        <div>
                            <UnifiedMediaInput
                                label="Fail Dokumen / Pautan URL"
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
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Teks / Penerangan</label>
                            <div className="bg-white rounded-md overflow-hidden border border-slate-200 [&_.ql-toolbar]:bg-slate-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-sm">
                                <ReactQuill
                                    theme="snow"
                                    value={data.description}
                                    onChange={(content) => setData('description', content)}
                                    modules={modules}
                                    formats={formats} />
                            </div>
                            {errors.description && <div className="text-red-500 text-xs mt-1 font-bold">{errors.description}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Teks / Penerangan 2 (Pilihan)</label>
                            <div className="bg-white rounded-md overflow-hidden border border-slate-200 [&_.ql-toolbar]:bg-slate-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-sm">
                                <ReactQuill
                                    theme="snow"
                                    value={data.description2}
                                    onChange={(content) => setData('description2', content)}
                                    modules={modules}
                                    formats={formats} />
                            </div>
                            {errors.description2 && <div className="text-red-500 text-xs mt-1 font-bold">{errors.description2}</div>}
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-6 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${wasSuccessful && !isDirty ? "!bg-emerald-50 !border !border-emerald-500 !text-emerald-700 hover:!bg-emerald-100 shadow-none" : "text-white"}`}
                        >
                            {processing && (
                                <svg className="animate-spin h-3 w-3 text-current" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {wasSuccessful && !isDirty && (
                                <svg className="w-4 h-4 text-emerald-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {wasSuccessful && !isDirty ? 'Telah dikemaskini' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
