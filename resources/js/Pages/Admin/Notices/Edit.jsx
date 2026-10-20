// --1. imports--
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// --2. main component--
export default function Edit({ auth, notice }) {
    const { data, setData, post, processing, errors, wasSuccessful, isDirty } = useForm({
        _method: 'put',
        title: notice.title || '',
        content: notice.content && notice.content !== '-' ? notice.content : '',
        image: null,
        image_path: notice.image_path || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.notices.update', notice.id));
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
        <AdminLayout headerTitle="Kemaskini Notis">
            <Head title="Kemaskini Notis - Admin" />

            
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
                <div className="p-6 border-b border-slate-50">
                    <h3 className="text-lg font-extrabold text-slate-700">Kemaskini Notis</h3>
                </div>

                <div className="p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Tajuk Notis</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"
                                required
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Teks / Penerangan</label>
                            <div className="bg-white rounded-md">
                                <ReactQuill
                                    theme="snow"
                                    value={data.content}
                                    onChange={(content) => setData('content', content)}
                                    modules={modules}
                                    formats={formats}
                                    className="h-64 mb-12"
                                />
                            </div>
                            {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                        </div>

                        <div>
                            <UnifiedMediaInput
                                label="Poster ouBerita / Notis"
                                accept="image/*"
                                allowUrl={false}
                                value={
                                    data.image_path ? { type: 'media', path: data.image_path } :
                                        data.image ? { type: 'upload', file: data.image } : null
                                }
                                onChange={(val) => {
                                    if (!val) {
                                        setData({ ...data, image: null, image_path: '' });
                                    } else if (val.type === 'upload') {
                                        setData({ ...data, image: val.file, image_path: '' });
                                    } else if (val.type === 'media') {
                                        setData({ ...data, image_path: val.path, image: null });
                                    }
                                }}
                                error={errors.image || errors.image_path}
                            />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
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
            </div>
        </AdminLayout>
    );
}
