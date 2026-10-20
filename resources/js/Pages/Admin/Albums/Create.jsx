// --1. imports--
import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// --2. main component--
export default function Create({ auth, allImages = [] }) {
    const { data: albumData, setData: setAlbumData, post: postAlbum, processing: processingAlbum, errors: errorsAlbum } = useForm({
        title: '',
        description: '',
        gallery_ids: [],
    });

    const toggleGallerySelection = (id) => {
        const currentIds = albumData?.gallery_ids || [];
        if (currentIds.includes(id)) {
            setAlbumData('gallery_ids', currentIds.filter(gId => gId !== id));
        } else {
            setAlbumData('gallery_ids', [...currentIds, id]);
        }
    };

    const handleAlbumSubmit = (e) => {
        e.preventDefault();
        postAlbum(route('admin.albums.store'));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Tambah Album Baru">
            <Head title="Tambah Album - Admin" />

            
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
                    <h2 className="text-lg font-bold text-slate-800">Tambah Album Baru</h2>
                </div>

                <div className="p-6">
                    <form onSubmit={handleAlbumSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Tajuk Album (Pilihan)</label>
                            <input type="text" value={albumData.title} onChange={e => setAlbumData('title', e.target.value)} className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]" />
                            {errorsAlbum.title && <div className="text-red-500 text-xs mt-1">{errorsAlbum.title}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Penerangan Ringkas (Pilihan)</label>
                            <textarea value={albumData.description} onChange={e => setAlbumData('description', e.target.value)} rows="3" className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"></textarea>
                            {errorsAlbum.description && <div className="text-red-500 text-xs mt-1">{errorsAlbum.description}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Pilih Gambar dari Galeri</label>
                            {allImages.length === 0 ? (
                                <div className="p-4 bg-slate-50 text-slate-500 text-xs rounded-md border border-slate-100 text-center">
                                    Tiada gambar yang belum dimasukkan ke album. Sila tambah media baru.
                                </div>
                            ) : (
                                <div className="max-h-[500px] overflow-y-auto border border-slate-100 rounded-md p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {(allImages || []).filter(g=>g).map(gallery => (
                                        <div key={gallery.id} onClick={() => toggleGallerySelection(gallery.id)} className={`relative cursor-pointer rounded overflow-hidden border-4 transition-all aspect-square bg-slate-100 ${(albumData?.gallery_ids || []).includes(gallery.id) ? 'border-[#0a192f] scale-95' : 'border-transparent hover:border-slate-200'}`}>
                                            {gallery.image_path && <img src={`/storage/${gallery.image_path}`} alt="" className="w-full h-full object-cover" />}
                                            {(albumData?.gallery_ids || []).includes(gallery.id) && (
                                                <div className="absolute top-2 right-2 bg-[#0a192f] text-white rounded-full p-1 shadow-md">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100 mt-8">
                            <button type="submit" disabled={processingAlbum} className="px-6 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 disabled:opacity-50">
                                {processingAlbum ? 'Sedang Disimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
