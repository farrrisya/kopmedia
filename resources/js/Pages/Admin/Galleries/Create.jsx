// --1. imports--
import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';

// --2. main component--
export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: 'image',
        image: null,
        video_url: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.galleries.store'));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Tambah Media">
            <Head title="Tambah Media - Admin" />

            
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
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-lg font-extrabold text-slate-700">
                        Tambah Media Baru
                    </h3>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Tajuk (Pilihan)</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                        </div>

                        <div className="bg-slate-50 p-6 rounded border border-slate-100">
                            <label className="block text-sm font-bold text-slate-700 mb-4">Pilih Sumber Media</label>
                            <UnifiedMediaInput 
                                label="Media Galeri"
                                accept="image/*,video/*"
                                allowUrl={true}
                                value={
                                    data.type === 'video' && data.video_url ? { type: 'url', url: data.video_url } :
                                    data.image_path ? { type: 'media', path: data.image_path } :
                                    data.image ? { type: 'upload', file: data.image } : null
                                }
                                onChange={(val) => {
                                    if (!val) {
                                        setData({ ...data, type: 'image', image: null, video_url: '', image_path: '' });
                                    } else if (val.type === 'upload') {
                                        setData({ ...data, type: 'image', image: val.file, video_url: '', image_path: '' });
                                    } else if (val.type === 'media') {
                                        setData({ ...data, type: 'image', image_path: val.path, image: null, video_url: '' });
                                    } else if (val.type === 'url') {
                                        setData({ ...data, type: 'video', video_url: val.url, image: null, image_path: '' });
                                    }
                                }}
                                error={errors.image || errors.video_url || errors.image_path}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Penerangan Ringkas (Pilihan)</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"
                            ></textarea>
                            {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={processing || (!data.image && !data.video_url && !data.image_path)}
                                className="px-6 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 disabled:opacity-50"
                            >
                                {processing ? 'Sedang Dimuat Naik...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
