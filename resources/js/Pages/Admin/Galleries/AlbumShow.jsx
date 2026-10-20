// --1. imports--
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

// --2. main component--
export default function AlbumShow({ auth, album, availableGalleries = [] }) {
    const [showEditForm, setShowEditForm] = useState(false); // state
    const [viewMedia, setViewMedia] = useState(null); // state

    const { data, setData, put, processing, errors } = useForm({ // state
        title: album?.title || '',
        description: album?.description || '',
        gallery_ids: (album?.galleries || []).map(g => g.id),
    });

    // --3. handlers--
    const handleUpdate = (e) => { // trigger
        e.preventDefault();
        put(route('admin.albums.update', album.id), {
            onSuccess: () => setShowEditForm(false), // check
        });
    };

    const handleDelete = () => { // trigger
        if (confirm('Adakah anda pasti mahu memadam album ini? Gambar di dalamnya tidak akan dipadam.')) { // check
            router.delete(route('admin.albums.destroy', album.id)); // save
        }
    };

    const removeImageFromAlbum = (galleryId) => { // trigger
        if (confirm('Keluarkan gambar ini dari album?')) { // check
            const newIds = (album?.galleries || []).filter(g => g.id !== galleryId).map(g => g.id);
            router.put(route('admin.albums.update', album.id), {
                title: album?.title,
                description: album?.description,
                gallery_ids: newIds
            }, {
                preserveScroll: true
            });
        }
    };

    const toggleGallerySelection = (id) => { // state
        const currentIds = data.gallery_ids || [];
        if (currentIds.includes(id)) {
            setData('gallery_ids', currentIds.filter(gId => gId !== id));
        } else {
            setData('gallery_ids', [...currentIds, id]);
        }
    };

    // --4. UI--
    return (
        <AdminLayout headerTitle={`Album: ${album.title}`}>
            <Head title={`${album.title} - Album Admin`} />

            <div className="mb-6 flex items-center justify-between">
                <button type="button" onClick={() => window.history.back()}  className="text-sm text-slate-500 hover:text-[#0a192f] font-bold flex items-center gap-2"> {/* redirect */}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Galeri
                </button>
                <div className="flex gap-3">
                    <Link
                        href={route('admin.albums.edit', album.id)} // redirect
                        className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                    >
                        Kemaskini Album
                    </Link>
                    <button
                        onClick={handleDelete} // trigger
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                    >
                        Padam Album
                    </button>
                </div>
            </div>

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden mb-6">
                <div className="p-6">
                    <h2 className="text-xl font-extrabold text-slate-800">{album.title}</h2>
                    {album.description && <p className="text-sm text-slate-500 mt-2">{album.description}</p>}
                </div>
            </div>

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Gambar dalam Album Ini</h3>
                </div>

                {(album?.galleries || []).length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada gambar dalam album ini.
                    </div>
                ) : (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {(album?.galleries || []).map((gallery) => (
                            <div key={gallery.id} className="group relative bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                    <img
                                        src={`/storage/${gallery.image_path}`}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                                        <button
                                            onClick={(e) => { e.preventDefault(); setViewMedia(gallery); }}
                                            className="w-10 h-10 bg-white/20 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                            title="Lihat"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => removeImageFromAlbum(gallery.id)} // trigger
                                            className="w-10 h-10 bg-white/20 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                            title="Keluarkan dari Album"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug">{gallery.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            

            {/* View Media Modal */}
            <Modal show={!!viewMedia} onClose={() => setViewMedia(null)} maxWidth="2xl">
                <div className="bg-white rounded-md overflow-hidden relative">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-800 truncate pr-8">{viewMedia?.title}</h3>
                        <button onClick={() => setViewMedia(null)} className="text-slate-400 hover:text-slate-600 transition absolute top-4 right-4 bg-slate-100 rounded-full p-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    <div className="p-6 flex justify-center bg-slate-100/50 min-h-[300px] items-center">
                        {viewMedia?.image_path && (
                            <img
                                src={`/storage/${viewMedia.image_path}`}
                                alt={viewMedia.title}
                                className="max-w-full max-h-[70vh] rounded shadow-sm"
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
