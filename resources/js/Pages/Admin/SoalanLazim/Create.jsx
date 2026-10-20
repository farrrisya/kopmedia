import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        question: '',
        answer: '',
        is_active: true,
        sort_order: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.soalan-lazim.store'));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Tambah Soalan Lazim Baru">
            <Head title="Tambah Soalan Lazim - Admin" />

            
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
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg">
                        Tambah Soalan Lazim Baru
                    </h3>
                </div>

                <form onSubmit={submit} className="p-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Soalan</label>
                            <input
                                type="text"
                                value={data.question}
                                onChange={e => setData('question', e.target.value)}
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                                required
                            />
                            {errors.question && <div className="text-red-500 text-xs mt-1 font-bold">{errors.question}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Jawapan</label>
                            <textarea
                                value={data.answer}
                                onChange={e => setData('answer', e.target.value)}
                                rows="5"
                                className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                                required
                            ></textarea>
                            {errors.answer && <div className="text-red-500 text-xs mt-1 font-bold">{errors.answer}</div>}
                        </div>

                        <div className="flex items-center justify-between gap-4 p-4 rounded-md border border-slate-100 bg-slate-50">
                            <div>
                                <label className="block text-sm font-bold text-slate-700">Status Aktif</label>
                                <p className="text-[10px] text-slate-500 mt-0.5">Tunjuk soalan ini di laman awam</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 mt-6 border-t border-slate-100 gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-xs rounded-md shadow-xs transition disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
