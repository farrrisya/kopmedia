// --1. imports--
import React, { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

// --2. main component--
export default function Index({ auth, products = [] }) {
    // state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => { // trigger
        if (confirm('Adakah anda pasti mahu memadam rekod ini?')) { // check
            destroy(route('admin.produk-perkhidmatan.destroy', id));
        }
    };

    const toggleStatus = (id, currentStatus) => { // trigger
        router.patch(route('admin.produk-perkhidmatan.update-status', id), {
            is_active: !currentStatus
        }, { preserveScroll: true });
    };

    // helpers
    const categories = [
        'Semua Kategori',
        'Skim Pembiayaan',
        'Skim Kebajikan',
        'Skim Pelancongan',
        'Seminar',
        'Aliran Proses Pembiayaan dan Pengeluaran',
        'Anugerah Kecemerlangan Pendidikan Koperasi NSTP'
    ];

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const productCat = (p.category || '').toLowerCase();
            const selectedCat = selectedCategory.toLowerCase();
            const matchesCategory = selectedCategory === 'Semua Kategori' || productCat === selectedCat;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  productCat.includes(searchQuery.toLowerCase()) ||
                                  (p.sub_category && p.sub_category.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    // --3. UI--
    return (
        <AdminLayout user={auth.user} headerTitle="Produk & Perkhidmatan">
            <Head title="Produk & Perkhidmatan - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden mb-8">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Produk & Perkhidmatan</h3>
                    </div>
                    <Link
                        href={route('admin.produk-perkhidmatan.create')}
                        className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Rekod Baru
                    </Link>
                </div>

                {/* Filters Section */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // trigger
                                className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-[#0a192f] focus:border-[#0a192f] transition-shadow"
                            />
                        </div>
                    </div>
                    <div className="shrink-0 max-w-full sm:max-w-[50%]">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} // trigger
                            className="w-full sm:w-auto py-2 px-3 pr-8 text-sm border-slate-200 rounded-lg focus:ring-[#0a192f] focus:border-[#0a192f] transition-shadow text-slate-600 font-medium truncate"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? ( // check
                    <div className="p-12 text-center text-xs text-slate-400 font-medium flex flex-col items-center">
                        <svg className="w-12 h-12 text-slate-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        Tiada rekod ditemui berdasarkan carian atau tapisan anda.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                                    <th className="w-[35%] px-6 py-4 text-left">Tajuk</th>
                                    <th className="w-[20%] px-6 py-4 text-left">Kategori</th>
                                    <th className="w-[15%] px-6 py-4 text-left">Sub Kategori</th>
                                    <th className="w-[15%] whitespace-nowrap px-6 py-4 text-center">Tarikh & Masa</th>
                                    <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Terbit</th>
                                    <th className="w-auto whitespace-nowrap px-6 py-4 text-center">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800 align-middle">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 align-middle">
                                            <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider whitespace-normal text-left leading-relaxed inline-block">
                                                {item.category || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 align-middle">
                                            {item.sub_category ? ( // check
                                                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider whitespace-normal text-left leading-relaxed inline-block">
                                                    {item.sub_category}
                                                </span>
                                            ) : (
                                                <span className="text-slate-300 italic font-medium">-</span>
                                            )}
                                        </td>
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
                                                onClick={() => toggleStatus(item.id, item.is_active)} // trigger
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
                                                <Link
                                                    href={route('admin.produk-perkhidmatan.show', item.id)}
                                                    className="w-8 h-8 rounded bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition duration-150"
                                                    title="Lihat"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>

                                                {/* Edit Button */}
                                                <Link
                                                    href={route('admin.produk-perkhidmatan.edit', item.id)}
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
                )}
            </div>
        </AdminLayout>
    );
}

