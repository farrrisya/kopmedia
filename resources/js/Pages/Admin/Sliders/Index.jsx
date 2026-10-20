import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';
import Modal from '@/Components/Modal';

export default function Index({ auth, sliders = [] }) {
    const { delete: destroy, processing } = useForm();
    const [viewSlider, setViewSlider] = useState(null);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleDelete = (id) => {
        if (confirm('Adakah anda pasti mahu memadam slider ini?')) {
            router.delete(route('admin.sliders.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Adakah anda pasti mahu memadam ${selectedIds.length} slider yang dipilih?`)) {
            router.delete(route('admin.sliders.bulk-destroy'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    setSelectedIds([]);
                    setIsSelectionMode(false);
                }
            });
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === sliders.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(sliders.map(s => s.id));
        }
    };

    const toggleStatus = (id, currentStatus) => {
        router.patch(route('admin.sliders.update-status', id), {
            is_active: !currentStatus
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout headerTitle="Slider">
            <Head title="Slider - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Slider</h3>
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
                                href={route('admin.sliders.create')}
                                className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Slider Baru
                            </Link>
                        )}
                    </div>
                </div>

                {sliders.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada slider dimuat naik.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                                    {isSelectionMode && (
                                        <th className="px-6 py-4 w-[5%] whitespace-nowrap text-left">
                                            <input 
                                                type="checkbox"
                                                checked={sliders.length > 0 && selectedIds.length === sliders.length}
                                                onChange={toggleSelectAll}
                                                className="w-5 h-5 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f] cursor-pointer"
                                            />
                                        </th>
                                    )}
                                    <th className="px-6 py-4 w-auto whitespace-nowrap text-left">Imej</th>
                                    <th className="px-6 py-4 w-full text-left">Kandungan</th>
                                    <th className="px-6 py-4 w-auto whitespace-nowrap text-center">Susunan</th>
                                    <th className="px-6 py-4 w-auto whitespace-nowrap text-center">Terbit</th>
                                    {!isSelectionMode && <th className="px-6 py-4 w-auto whitespace-nowrap text-center">Tindakan</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {sliders.map((slider) => (
                                    <tr 
                                        key={slider.id} 
                                        className={`transition-colors ${isSelectionMode ? 'cursor-pointer' : ''} ${selectedIds.includes(slider.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}
                                        onClick={() => isSelectionMode && toggleSelect(slider.id)}
                                    >
                                        {isSelectionMode && (
                                            <td className="px-6 py-4 align-middle">
                                                <input 
                                                    type="checkbox"
                                                    checked={selectedIds.includes(slider.id)}
                                                    readOnly
                                                    className="w-5 h-5 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f] pointer-events-none"
                                                />
                                            </td>
                                        )}
                                        <td className="px-6 py-4 align-middle">
                                            <img
                                                src={`/storage/${slider.image_path}`}
                                                alt={slider.title || 'Slider'}
                                                className="w-48 min-w-[70px] h-auto aspect-video object-cover rounded-md border border-slate-200 shadow-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="font-bold text-slate-800 text-sm">
                                                {slider.title || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-center font-bold text-slate-600">
                                            {slider.sort_order}
                                        </td>
                                        <td className="px-6 py-4 align-middle text-center">
                                            <button
                                                onClick={() => !isSelectionMode && toggleStatus(slider.id, slider.is_active)}
                                                disabled={isSelectionMode}
                                                className={`relative inline-flex h-6 w-11 shrink-0 ${isSelectionMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${slider.is_active ? 'bg-amber-400' : 'bg-slate-300'}`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${slider.is_active ? 'translate-x-5' : 'translate-x-0'}`}
                                                />
                                            </button>
                                        </td>
                                        {!isSelectionMode && (
                                            <td className="px-6 py-4 align-middle">
                                                <div className="flex justify-center gap-1.5">
                                                    {/* Lihat Button */}
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); setViewSlider(slider); }}
                                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition duration-150"
                                                        title="Lihat"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>

                                                    {/* Edit Button */}
                                                    <Link
                                                        href={route('admin.sliders.edit', slider.id)}
                                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-600 flex items-center justify-center transition duration-150"
                                                        title="Kemaskini"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDelete(slider.id)}
                                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition duration-150 shadow-xs"
                                                        title="Padam"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                }
            </div>


            {/* View Media Modal */}
            <Modal show={!!viewSlider} onClose={() => setViewSlider(null)} maxWidth="2xl">
                <div className="bg-white rounded-md overflow-hidden relative">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-800 truncate pr-8">{viewSlider?.title || 'Paparan Slider'}</h3>
                        <button onClick={() => setViewSlider(null)} className="text-slate-400 hover:text-slate-600 transition absolute top-4 right-4 bg-slate-100 rounded-full p-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-6 flex justify-center bg-slate-100/50 min-h-[300px] items-center">
                        {viewSlider?.image_path && (
                            <img
                                src={`/storage/${viewSlider.image_path}`}
                                alt={viewSlider.title}
                                className="max-w-full max-h-[70vh] rounded shadow-sm"
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
