import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
        image_path: '',
        title: '',
        sort_order: 1
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.sliders.store'));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Tambah Slider Baru">
            <Head title="Tambah Slider - Admin" />

            
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
                    <h3 className="text-lg font-extrabold text-slate-700">
                        Tambah Slider Baru
                    </h3>
                </div>

                <div className="p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <UnifiedMediaInput 
                                label="Gambar Slider *"
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
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Tajuk (Pilihan)</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Susunan</label>
                            <input
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={e => setData('sort_order', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"
                            />
                            {errors.sort_order && <div className="text-red-500 text-xs mt-1">{errors.sort_order}</div>}
                        </div>
                        
                        <div className="flex justify-end pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
