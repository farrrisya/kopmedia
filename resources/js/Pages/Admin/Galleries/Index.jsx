// --1. imports--
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';
import Modal from '@/Components/Modal';

// --2. main component--
const getYoutubeThumbnail = (url) => {
    if (!url) return null;
    let videoId = null;
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

export default function Index({ auth, galleries = [], albums = [], allImages = [] }) {
    const [viewMedia, setViewMedia] = useState(null); // state
    const [activeTab, setActiveTab] = useState('gambar'); // state


    const allItems = [ // state
        ...albums.map(a => ({ ...a, item_type: 'album' })),
        ...galleries.map(g => ({ ...g, item_type: 'gallery' }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const albumsList = allItems.filter(item => item.item_type === 'album');
    const gambarList = allItems.filter(item => item.item_type === 'gallery' && item.type === 'image');
    const videoList = allItems.filter(item => item.item_type === 'gallery' && item.type === 'video');

    const displayedItems = activeTab === 'gambar' ? gambarList : activeTab === 'album' ? albumsList : videoList;


    const handleDelete = (id) => { // trigger
        if (confirm('Adakah anda pasti mahu memadam gambar ini?')) { // check
            router.delete(route('admin.galleries.destroy', id), { // save
                preserveScroll: true
            });
        }
    };


    // --4. UI--
    return (
        <AdminLayout headerTitle="Galeri">
            <Head title="Galeri - Admin" />

            {/* List Section */}
            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Galeri & Album</h3>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route('admin.albums.create')}
                            className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Album
                        </Link>
                        <Link
                            href={route('admin.galleries.create')}
                            className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Media
                        </Link>
                    </div>
                </div>

                {/* tabs */}
                <div className="flex border-b border-slate-100 px-6">
                    <button
                        onClick={() => setActiveTab('gambar')}
                        className={`py-4 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'gambar' ? 'border-[#0a192f] text-[#0a192f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        Gambar ({gambarList.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('album')}
                        className={`py-4 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'album' ? 'border-[#0a192f] text-[#0a192f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        Album ({albumsList.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`py-4 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'video' ? 'border-[#0a192f] text-[#0a192f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        Video ({videoList.length})
                    </button>
                </div>

                {displayedItems.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada rekod untuk paparan ini.
                    </div>
                ) : (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedItems.map((item) => (
                            <div key={`${item.item_type}-${item.id}`} className="group relative bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                {item.item_type === 'album' ? (
                                    <>
                                        <Link href={route('admin.albums.show', item.id)} className="aspect-[4/3] bg-amber-50 relative overflow-hidden flex items-center justify-center border-b border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer group-hover:opacity-90"> {/* redirect */}
                                            {item.latest_gallery ? (
                                                <>
                                                    <img src={`/storage/${item.latest_gallery.image_path}`} alt={item.title} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <div className="text-white flex flex-col items-center">
                                                            <svg className="w-12 h-12 mb-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                            </svg>
                                                            <span className="text-sm font-bold">{item.galleries_count || 0} Gambar</span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-amber-500 flex flex-col items-center">
                                                    <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    <span className="text-xs font-bold">{item.galleries_count || 0} Gambar</span>
                                                </div>
                                            )}
                                        </Link>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-extrabold uppercase rounded-md tracking-wider">Album</span>
                                            </div>
                                            <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug">{item.title}</h4>
                                            <p className="text-xs text-slate-500 mt-2 line-clamp-2 flex-1">{item.description}</p>
                                            <div className="mt-3 text-[10px] text-slate-400 font-medium">
                                                {item.created_at ? new Date(item.created_at).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase() : '-'}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                            {item.type === 'image' ? (
                                                <img
                                                    src={`/storage/${item.image_path}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full relative transition-transform duration-500">
                                                    {getYoutubeThumbnail(item.video_url) ? (
                                                        <img
                                                            src={getYoutubeThumbnail(item.video_url)}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="text-slate-400 text-center p-4 flex flex-col items-center justify-center h-full">
                                                            <svg className="w-12 h-12 mx-auto mb-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                                            </svg>
                                                            <span className="text-xs font-bold truncate block w-40 mx-auto">{item.video_url}</span>
                                                        </div>
                                                    )}
                                                    {getYoutubeThumbnail(item.video_url) && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => { // trigger
                                                        if (item.type === 'video') {
                                                            window.open(item.video_url, '_blank');
                                                        } else {
                                                            setViewMedia(item);
                                                        }
                                                    }} 
                                                    className="w-10 h-10 bg-white/20 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                                    title="Lihat"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <Link
                                                    href={route('admin.galleries.edit', item.id)} // trigger
                                                    className="w-10 h-10 bg-white/20 hover:bg-[#0a192f] text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                                    title="Kemaskini"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)} // trigger
                                                    className="w-10 h-10 bg-white/20 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                                    title="Padam"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-md tracking-wider ${item.type === 'video' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{item.type === 'video' ? 'Video' : 'Gambar'}</span>
                                            </div>
                                            <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug">{item.title}</h4>
                                            <p className="text-xs text-slate-500 mt-2 line-clamp-2 flex-1">{item.description}</p>
                                            <div className="mt-3 text-[10px] text-slate-400 font-medium">
                                                {item.created_at ? new Date(item.created_at).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase() : '-'}
                                            </div>
                                        </div>
                                    </>
                                )}
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
                        {viewMedia?.type === 'image' && (
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
