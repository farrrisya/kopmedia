import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

// --2. main component--
export default function Index({ auth, faqs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => { // trigger
        if (confirm('Adakah anda pasti mahu memadam Soalan Lazim ini?')) { // check
            destroy(route('admin.soalan-lazim.destroy', id)); // save
        }
    };

    const toggleStatus = (id, currentStatus) => {
        router.patch(route('admin.soalan-lazim.update-status', id), {
            is_active: !currentStatus
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Soalan Lazim (FAQ)">
            <Head title="Soalan Lazim - Admin" />

            {/* List Section */}
            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden mb-8">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Soalan Lazim</h3>
                    </div>
                    <Link
                        href={route('admin.soalan-lazim.create')}
                        className="px-4 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 shadow-xs flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Soalan
                    </Link>
                </div>

                {faqs.length > 0 ? ( // check
                    <div className="divide-y divide-slate-100">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50/50 transition-colors group">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                                            {faq.question}
                                        </h3>
                                        {!faq.is_active && (
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">
                                                Tidak Aktif
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                                        {faq.answer}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-1.5 shrink-0 self-start md:self-center opacity-100 transition-opacity">
                                    <button
                                        onClick={() => toggleStatus(faq.id, faq.is_active)}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${faq.is_active ? 'bg-amber-400' : 'bg-slate-300'}`}
                                        title="Status (Terbit/Sembunyi)"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${faq.is_active ? 'translate-x-5' : 'translate-x-0'}`}
                                        />
                                    </button>
                                    <Link
                                        href={route('admin.soalan-lazim.edit', faq.id)} // trigger
                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-600 flex items-center justify-center transition duration-150"
                                        title="Kemaskini"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(faq.id)} // trigger
                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition duration-150"
                                        title="Padam"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada Soalan Lazim ditemui. Sila tambah soalan baharu.
                    </div>
                )}
            </div>

        </AdminLayout>
    );
}
