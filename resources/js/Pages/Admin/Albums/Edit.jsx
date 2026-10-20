import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, album, availableGalleries = [] }) {
    const { data, setData, put, processing, errors, wasSuccessful, isDirty } = useForm({
        title: album?.title || '',
        description: album?.description || '',
        gallery_ids: (album?.galleries || []).filter(g => g).map(g => g.id),
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('admin.albums.update', album.id));
    };

    const toggleGallerySelection = (id) => {
        const currentIds = data.gallery_ids || [];
        if (currentIds.includes(id)) {
            setData('gallery_ids', currentIds.filter(gId => gId !== id));
        } else {
            setData('gallery_ids', [...currentIds, id]);
        }
    };

    return (
        <AdminLayout headerTitle="Kemaskini Album" user={auth.user}>
            <Head title="Kemaskini Album - Admin" />

            
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
                        Kemaskini Album
                    </h3>
                </div>

                <form onSubmit={handleUpdate} className="p-6 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Tajuk Album (Pilihan)</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1 font-bold">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Penerangan Ringkas (Pilihan)</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows="4"
                            className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-xs mt-1 font-bold">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Pilih Gambar</label>
                        <div className="h-96 overflow-y-auto border border-slate-200 rounded-md p-4 bg-slate-50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {/* Currently in album */}
                            {(album?.galleries || []).filter(g => g).map(gallery => (
                                <div key={`cur-${gallery.id}`} onClick={() => toggleGallerySelection(gallery.id)} className={`relative cursor-pointer rounded-md overflow-hidden border-4 transition-all aspect-square bg-slate-200 ${(data?.gallery_ids || []).includes(gallery.id) ? 'border-[#0a192f] scale-95 shadow-md' : 'border-transparent'}`}>
                                    {gallery.image_path && <img src={`/storage/${gallery.image_path}`} alt="" className="w-full h-full object-cover" />}
                                    {(data?.gallery_ids || []).includes(gallery.id) && (
                                        <div className="absolute top-2 right-2 bg-[#0a192f] text-white rounded-full p-1 shadow-md">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Available to add */}
                            {(availableGalleries || []).filter(g => g).map(gallery => (
                                <div key={`avail-${gallery.id}`} onClick={() => toggleGallerySelection(gallery.id)} className={`relative cursor-pointer rounded-md overflow-hidden border-4 transition-all aspect-square bg-slate-200 ${(data?.gallery_ids || []).includes(gallery.id) ? 'border-[#0a192f] scale-95 shadow-md' : 'border-transparent'}`}>
                                    {gallery.image_path && <img src={`/storage/${gallery.image_path}`} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />}
                                    {(data?.gallery_ids || []).includes(gallery.id) && (
                                        <div className="absolute top-2 right-2 bg-[#0a192f] text-white rounded-full p-1 shadow-md">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    )}
                                </div>
                            ))}
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
                            {wasSuccessful && !isDirty ? 'Telah dikemaskini' : 'Kemaskini'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
