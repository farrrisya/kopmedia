import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, faq }) {
    const { data, setData, post, processing, errors , wasSuccessful, isDirty } = useForm({
        _method: 'put',
        question: faq.question || '',
        answer: faq.answer || '',
        is_active: faq.is_active !== undefined ? faq.is_active : true,
        sort_order: faq.sort_order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.soalan-lazim.update', faq.id));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Kemaskini Soalan Lazim">
            <Head title="Kemaskini Soalan Lazim - Admin" />

            
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
                        Kemaskini Soalan Lazim
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

                    </div>

                    <div className="flex justify-end pt-6 mt-6 border-t border-slate-100 gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-5 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-xs rounded-md shadow-xs transition disabled:opacity-50 flex items-center gap-1.5 ${wasSuccessful && !isDirty ? "!bg-emerald-50 !border !border-emerald-500 !text-emerald-700 hover:!bg-emerald-100 shadow-none" : "text-white"}`}
                        >
                            
                                {wasSuccessful && !isDirty && (
                                    <svg className="w-4 h-4 text-emerald-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {wasSuccessful && !isDirty ? 'Telah dikemaskini' : (processing ? 'Menyimpan...' : 'Kemaskini')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
