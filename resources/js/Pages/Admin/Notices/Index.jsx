// --1. imports--
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';

// --2. main component--
export default function Index({ auth, notices = [] }) {
    const { delete: destroy, processing } = useForm();
    const [viewingNotice, setViewingNotice] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Adakah anda pasti mahu memadam notis ini?')) {
            destroy(route('admin.notices.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const toggleStatus = (id, currentStatus) => {
        router.patch(route('admin.notices.update-status', id), {
            is_active: !currentStatus
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout headerTitle="Berita & Notis">
            <Head title="Berita & Notis - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Berita & Notis</h3>
                    </div>
                    <Link
                        href={route('admin.notices.create')}
                        className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Notis Baru
                    </Link>
                </div>

                {notices.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada notis atau hebahan diterbitkan.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                                    <th className="w-auto whitespace-nowrap px-6 py-4 text-left">Poster</th>
                                    <th className="w-full px-6 py-4 text-left">Tajuk Notis</th>
                                    <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Tarikh & Masa</th>
                                    <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Terbit</th>
                                    <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {notices.map((notice) => (
                                    <tr key={notice.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-4 text-slate-455 align-middle">
                                            {notice.image_path ? (
                                                <img
                                                    src={`/storage/${notice.image_path}`}
                                                    alt={notice.title}
                                                    className="h-16 w-16 object-cover rounded-md border border-slate-200"
                                                />
                                            ) : (
                                                <div className="h-16 w-16 bg-slate-50 flex items-center justify-center rounded-md border border-slate-200">
                                                    <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800 align-middle">
                                            {notice.title}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap align-middle text-center">
                                            {new Date(notice.published_at || notice.created_at).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 align-middle text-center">
                                            <button
                                                onClick={() => toggleStatus(notice.id, notice.is_active)}
                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notice.is_active ? 'bg-amber-400' : 'bg-slate-300'}`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${notice.is_active ? 'translate-x-5' : 'translate-x-0'}`}
                                                />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex justify-center gap-1.5">
                                                {/* Quick View Button */}
                                                <button
                                                    onClick={() => setViewingNotice(notice)}
                                                    className="w-8 h-8 rounded bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition duration-150"
                                                    title="Lihat Poster"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>

                                                {/* Edit Button */}
                                                <Link
                                                    href={route('admin.notices.edit', notice.id)}
                                                    className="w-8 h-8 rounded bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-600 flex items-center justify-center transition duration-150"
                                                    title="Kemaskini"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(notice.id)} // trigger
                                                    disabled={processing}
                                                    className="w-8 h-8 rounded bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition duration-150 disabled:opacity-50"
                                                    title="Padam"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Quick View Modal */}
            <Modal show={!!viewingNotice} onClose={() => setViewingNotice(null)} maxWidth="2xl">
                <div className="bg-white rounded-md overflow-hidden relative">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-800 truncate pr-8">{viewingNotice?.title}</h3>
                        <button onClick={() => setViewingNotice(null)} className="text-slate-400 hover:text-slate-600 transition absolute top-4 right-4 bg-slate-100 rounded-full p-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    <div className="p-6 flex justify-center bg-slate-100/50 min-h-[300px] items-center">
                        {viewingNotice && viewingNotice.image_path ? (
                            <img
                                src={`/storage/${viewingNotice.image_path}`}
                                alt={viewingNotice.title}
                                className="max-w-full max-h-[70vh] rounded shadow-sm"
                            />
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center text-slate-400">
                                <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">Tiada poster untuk notis ini.</span>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
