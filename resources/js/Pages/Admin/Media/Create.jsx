// --1. imports--
import React, { useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// --2. main component--
export default function Create({ auth }) {
    const fileInput = useRef(null); // state

    const { data: uploadData, setData: setUploadData, post: postUpload, processing: processingUpload, errors: errorsUpload, progress } = useForm({
        media_type: 'file',
        file: null,
        url_link: '',
        file_name: '',
    });

    const submitUpload = (e) => { // trigger
        e.preventDefault();
        postUpload(route('admin.media.store'));
    };

    return (
        <AdminLayout user={auth.user} headerTitle="Muat Naik Media Baru">
            <Head title="Muat Naik Media - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden w-full">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800">Muat Naik Fail Media</h2>
                </div>

                <div className="p-6">
                    <form onSubmit={submitUpload} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Sumber Media</label>
                            <div className="flex gap-4 mb-6">
                                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-md border border-slate-200 flex-1 hover:border-[#0a192f] transition-colors">
                                    <input
                                        type="radio"
                                        name="media_type"
                                        value="file"
                                        checked={uploadData.media_type === 'file'}
                                        onChange={() => setUploadData('media_type', 'file')}
                                        className="text-[#0a192f] focus:ring-[#0a192f]"
                                    />
                                    <span className="text-sm font-bold text-slate-700">Muat Naik Fail</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-md border border-slate-200 flex-1 hover:border-[#0a192f] transition-colors">
                                    <input
                                        type="radio"
                                        name="media_type"
                                        value="url"
                                        checked={uploadData.media_type === 'url'}
                                        onChange={() => setUploadData('media_type', 'url')}
                                        className="text-[#0a192f] focus:ring-[#0a192f]"
                                    />
                                    <span className="text-sm font-bold text-slate-700">Pautan URL</span>
                                </label>
                            </div>

                            {uploadData.media_type === 'file' ? (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Fail</label>
                                    <div
                                        className="border-2 border-dashed border-slate-300 rounded py-12 px-8 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                                        onClick={() => fileInput.current.click()}
                                    >
                                        <svg className="w-10 h-10 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-sm text-slate-600 font-semibold mb-1">
                                            {uploadData.file ? uploadData.file.name : 'Klik untuk memilih fail'}
                                        </p>

                                        <input
                                            type="file"
                                            ref={fileInput}
                                            className="hidden"
                                            onChange={(e) => setUploadData('file', e.target.files[0])}
                                        />
                                    </div>
                                    {errorsUpload.file && <p className="text-red-500 text-xs mt-2 font-bold">{errorsUpload.file}</p>}

                                    {progress && (
                                        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
                                            <div className="bg-[#0a192f] h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Pautan URL</label>
                                        <input
                                            type="url"
                                            value={uploadData.url_link}
                                            onChange={e => setUploadData('url_link', e.target.value)}
                                            className="w-full rounded-md border-slate-200 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] bg-slate-50"
                                        />
                                        {errorsUpload.url_link && <p className="text-red-500 text-xs mt-2 font-bold">{errorsUpload.url_link}</p>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <Link
                                href={route('admin.media.index')}
                                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-all"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processingUpload || (uploadData.media_type === 'file' ? !uploadData.file : !uploadData.url_link)}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-[#0a192f] hover:bg-[#0a192f] rounded-md transition-all disabled:opacity-50"
                            >
                                {processingUpload ? 'Memuat Naik...' : 'Muat Naik'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
