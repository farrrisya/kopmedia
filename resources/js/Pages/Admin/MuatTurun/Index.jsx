// --1. imports--
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

// --2. main component--
export default function Index({ auth, documents = [] }) {
    const { delete: destroy, processing } = useForm();
    const [activeTab, setActiveTab] = useState('borang-borang'); // state

    const handleDelete = (id) => { // trigger
        if (confirm('Adakah anda pasti mahu memadam muat turun ini?')) { // check
            destroy(route('admin.muat-turun.destroy', id)); // trigger
        }
    };

    const toggleStatus = (id, currentStatus) => {
        router.patch(route('admin.muat-turun.update-status', id), {
            is_active: !currentStatus
        }, { preserveScroll: true });
    };

    const renderMediaLink = (item) => { // ui
        if (item.media_type === 'file' || item.media_type === 'media') {
            return `${route('home').replace(/\/$/, '')}/storage/${item.file_path}`;
        }
        return item.url_link || '#';
    };

    const borangBorang = documents ? documents.filter(d => d.category === 'Borang-borang') : [];
    const undangUndang = documents ? documents.filter(d => d.category === 'Undang-Undang Kecil') : [];
    const jadualBayaran = documents ? documents.filter(d => d.category === 'Jadual Bayaran Balik Pembiayaan') : [];

    const renderTable = (items, emptyMessage, showKategori = true) => (
        items.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 font-medium">
                {emptyMessage}
            </div>
        ) : (
            <div className="p-6 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                            <th className="w-full px-6 py-4 text-left min-w-[300px]">Tajuk</th>
                            {showKategori && <th className="w-auto min-w-[250px] px-6 py-4 text-left">Kategori</th>}
                            <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Tarikh & Masa</th>
                            <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Terbit</th>
                            <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 align-middle">
                                    {item.title}
                                </td>
                                {showKategori && (
                                    <td className="px-6 py-4 text-slate-500 align-middle">
                                        <div className="flex flex-col items-start gap-1">
                                            {item.sub_category ? (
                                                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider whitespace-normal text-left leading-relaxed">
                                                    {item.sub_category}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic font-medium">-</span>
                                            )}
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4 text-slate-500 whitespace-nowrap align-middle text-center">
                                    {new Date(item.created_at || new Date()).toLocaleString('en-GB', {
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
                                        onClick={() => toggleStatus(item.id, item.is_active)}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.is_active ? 'bg-amber-400' : 'bg-slate-300'}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${item.is_active ? 'translate-x-5' : 'translate-x-0'}`}
                                        />
                                    </button>
                                </td>
                                <td className="px-6 py-4 align-middle">
                                    <div className="flex justify-center gap-1.5">
                                        {/* Lihat Button */}
                                        <a
                                            href={renderMediaLink(item)} // redirect
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 rounded bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition duration-150"
                                            title="Lihat"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </a>

                                        {/* Edit Button */}
                                        <Link
                                            href={route('admin.muat-turun.edit', item.id)} // trigger
                                            className="w-8 h-8 rounded bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-600 flex items-center justify-center transition duration-150"
                                            title="Kemaskini"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(item.id)} // trigger
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
        )
    );

    return (
        <AdminLayout user={auth.user} headerTitle="Dokumen">
            <Head title="Dokumen - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden mb-8">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Dokumen</h3>
                    </div>
                    <Link
                        href={route('admin.muat-turun.create')}
                        className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Dokumen Baru
                    </Link>
                </div>

                {/* tabs */}
                <div className="flex border-b border-slate-100 px-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('borang-borang')} // trigger
                        className={`py-4 px-6 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'borang-borang' ? 'border-[#0a192f] text-[#0a192f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        Borang-borang ({borangBorang.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('undang-undang')} // trigger
                        className={`py-4 px-6 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'undang-undang' ? 'border-[#0a192f] text-[#0a192f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        Undang-undang ({undangUndang.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('jadual-bayaran')} // trigger
                        className={`py-4 px-6 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'jadual-bayaran' ? 'border-[#0a192f] text-[#0a192f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        Jadual Bayaran Balik Pembiayaan ({jadualBayaran.length})
                    </button>
                </div>

                {activeTab === 'borang-borang' && renderTable(borangBorang, 'Tiada borang-borang direkodkan.', true)}
                {activeTab === 'undang-undang' && renderTable(undangUndang, 'Tiada undang-undang direkodkan.', false)}
                {activeTab === 'jadual-bayaran' && renderTable(jadualBayaran, 'Tiada jadual bayaran balik pembiayaan direkodkan.', false)}

            </div>

        </AdminLayout>
    );
}
