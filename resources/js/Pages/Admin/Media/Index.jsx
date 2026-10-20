import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

const formatBytes = (bytes, decimals = 1) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function Index({ auth, mediaList }) {
  const [viewMedia, setViewMedia] = useState(null); // state
  const [editMedia, setEditMedia] = useState(null); // state
  const [isSelectionMode, setIsSelectionMode] = useState(false); // state
  const [selectedIds, setSelectedIds] = useState([]); // state

  const { delete: destroy } = useForm(); // state



  const { data: editData, setData: setEditData, put: putEdit, processing: processingEdit, errors: errorsEdit, reset: resetEdit } = useForm({
    file_name: '',
  });

  const handleDelete = (id) => { // trigger
    if (confirm('Adakah anda pasti mahu memadam media ini?')) { // check
      destroy(route('admin.media.destroy', id)); // trigger
    }
  };

  const handleBulkDelete = () => { // trigger
    if (selectedIds.length === 0) return;
    if (confirm(`Adakah anda pasti mahu memadam ${selectedIds.length} media yang dipilih?`)) { // check
      router.delete(route('admin.media.bulk-destroy'), {
        data: { ids: selectedIds },
        onSuccess: () => {
          setSelectedIds([]);
          setIsSelectionMode(false);
        }
      });
    }
  };

  const toggleSelect = (id) => { // state
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEditClick = (item) => { // trigger
    setEditData('file_name', item.file_name);
    setEditMedia(item);
  };

  const submitEdit = (e) => { // trigger
    e.preventDefault();
    putEdit(route('admin.media.update', editMedia.id), {
      onSuccess: () => {
        setEditMedia(null);
        resetEdit();
      }
    });
  };



  return (
    <AdminLayout user={auth.user} headerTitle="Senarai Media">
      <Head title="Media" />

      <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Media</h3>
          </div>
          <div className="flex items-center gap-2">
            {isSelectionMode ? (
              <>
                <button
                  onClick={handleBulkDelete}
                  disabled={selectedIds.length === 0}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Padam ({selectedIds.length})
                </button>
                <button
                  onClick={() => { setIsSelectionMode(false); setSelectedIds([]); }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md text-xs font-bold transition duration-150 shadow-xs"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSelectionMode(true)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
              >
                Pilih
              </button>
            )}
            {!isSelectionMode && (
              <Link
                href={route('admin.media.create')}
                className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Media
              </Link>
            )}
          </div>
        </div>

        {mediaList && mediaList.length > 0 ? ( // check
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaList.map((item) => (
              <div 
                key={item.id} 
                className={`group relative bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden flex flex-col transition-shadow ${isSelectionMode ? 'cursor-pointer ring-2 ring-transparent' : ''} ${selectedIds.includes(item.id) ? '!ring-[#0a192f] bg-slate-50' : ''}`}
                onClick={() => isSelectionMode && toggleSelect(item.id)}
              >
                {/* Image / Thumbnail */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {isSelectionMode && (
                    <div className="absolute top-3 left-3 z-20">
                      <input 
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        readOnly
                        className="w-5 h-5 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f] pointer-events-none"
                      />
                    </div>
                  )}
                  {item.file_type && item.file_type.includes('image') ? (
                    <img
                      src={item.file_type === 'url' ? item.file_path : `/storage/${item.file_path}`}
                      alt={item.file_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                      <svg className="w-12 h-12 mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-[10px] uppercase font-bold tracking-wider">{item.file_type === 'url' ? 'URL' : (item.file_type?.split('/')[1] || 'Fail')}</span>
                    </div>
                  )}

                  {/* Overlay Actions */}
                  {!isSelectionMode && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                      {!item.file_type?.includes('image') && !item.file_type?.includes('video') ? (
                        <a
                          href={item.file_type === 'url' ? item.file_path : `/storage/${item.file_path}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 bg-white/20 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                          title="Lihat"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                      ) : (
                        <button
                          onClick={() => setViewMedia(item)} // trigger
                          className="w-10 h-10 bg-white/20 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                          title="Lihat"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleEditClick(item)} // trigger
                        className="w-10 h-10 bg-white/20 hover:bg-[#0a192f] text-white rounded-full flex items-center justify-center transition-colors duration-200"
                        title="Kemaskini"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
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
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug flex-1">{item.file_name}</h4>
                  <div className="mt-3 text-[10px] text-slate-400 font-medium">
                    {item.created_at ? new Date(item.created_at).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase() : '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-400">
            Tiada media ditemui.
          </div>
        )}
      </div>

      {/* View Media Modal */}
      <Modal show={!!viewMedia} onClose={() => setViewMedia(null)} maxWidth="2xl">
        <div className="bg-white rounded-md overflow-hidden relative">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 truncate pr-8">{viewMedia?.file_name}</h3>
            <button onClick={() => setViewMedia(null)} className="text-slate-400 hover:text-slate-600 transition absolute top-4 right-4 bg-slate-100 rounded-full p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 flex justify-center bg-slate-100/50 min-h-[300px] items-center">
            {viewMedia?.file_type?.includes('image') ? (
              <img src={`/storage/${viewMedia?.file_path}`} alt={viewMedia?.file_name} className="max-w-full max-h-[70vh] rounded shadow-sm" />
            ) : viewMedia?.file_type?.includes('video') ? (
              <video src={`/storage/${viewMedia?.file_path}`} controls className="max-w-full max-h-[70vh] rounded shadow-sm" />
            ) : (
              <div className="flex flex-col items-center">
                <svg className="w-20 h-20 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <a href={viewMedia?.file_type === 'url' ? viewMedia?.file_path : `/storage/${viewMedia?.file_path}`} target="_blank" rel="noreferrer" className="text-[#0a192f] font-bold hover:underline">
                  Buka Fail (Tetingkap Baru)
                </a>
              </div>
            )}
          </div>
        </div>
      </Modal>



      {/* Edit Media Modal */}
      <Modal show={!!editMedia} onClose={() => { setEditMedia(null); resetEdit(); }} maxWidth="sm">
        <div className="bg-white p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Kemaskini Nama Fail</h3>
            <button onClick={() => { setEditMedia(null); resetEdit(); }} className="text-slate-400 hover:text-slate-600 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <form onSubmit={submitEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nama Fail</label>
              <input
                type="text"
                value={editData.file_name}
                onChange={e => setEditData('file_name', e.target.value)}
                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f]"
                required
              />
              {errorsEdit.file_name && <div className="text-red-500 text-xs mt-1">{errorsEdit.file_name}</div>}
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={processingEdit}
                className="px-5 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition disabled:opacity-50"
              >
                {processingEdit ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AdminLayout>
  );
}
