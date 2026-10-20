// --1. imports--
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

// --2. main component--
export default function Index({ auth, applications = [] }) {
    const { patch, processing } = useForm();

    const handleStatusUpdate = (id, newStatus) => {
        if (confirm(`Adakah anda pasti mahu menukar status permohonan ini kepada ${newStatus === 'approved' ? 'LULUS' : 'TOLAK'}?`)) {
            patch(route('admin.applications.update-status', id), {
                data: { status: newStatus },
                preserveScroll: true
            });
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            approved: 'bg-green-50 text-green-700 border-green-200',
            rejected: 'bg-red-50 text-red-700 border-red-200',
        };
        const labels = {
            pending: 'Menunggu Kelulusan',
            approved: 'Diluluskan',
            rejected: 'Ditolak',
        };
        return (
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${styles[status] || styles.pending}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <AdminLayout headerTitle="Permohonan Pembiayaan">
            <Head title="Kelulusan Pembiayaan - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-55 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Permohonan Pembiayaan</h3>
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                            Semak dan sahkan permohonan pembiayaan anggota
                        </span>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">
                        {applications.length} Permohonan
                    </span>
                </div>

                {applications.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada permohonan pembiayaan.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                                    <th className="p-4 text-left whitespace-nowrap w-auto">No. Rujukan</th>
                                    <th className="p-4 text-left w-full">Pemohon</th>
                                    <th className="p-4 text-left whitespace-nowrap w-auto">Skim</th>
                                    <th className="p-4 text-left whitespace-nowrap w-auto">Jumlah Dipohon</th>
                                    <th className="p-4 text-left whitespace-nowrap w-auto">Tarikh Mohon</th>
                                    <th className="p-4 text-left whitespace-nowrap w-auto">Status</th>
                                    <th className="p-4 text-left whitespace-nowrap w-auto">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="p-4 font-bold text-slate-800 align-middle">#APP-{1000 + app.id}</td>
                                        <td className="p-4 align-middle">
                                            <div className="font-bold text-slate-800">{app.user?.name}</div>
                                            <div className="text-[10px] text-slate-400">{app.user?.email}</div>
                                        </td>
                                        <td className="p-4 text-slate-600 font-medium align-middle">{app.scheme?.name}</td>
                                        <td className="p-4 text-left font-bold text-slate-800 align-middle">
                                            RM {parseFloat(app.amount_requested).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 text-slate-500 align-middle">
                                            {new Date(app.created_at).toLocaleDateString('ms-MY', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="p-4 align-middle">{getStatusBadge(app.status)}</td>
                                        <td className="p-4 align-middle">
                                            {app.status === 'pending' ? (
                                                <div className="flex justify-start gap-1.5">
                                                    {/* Approve Button */}
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'approved')} // trigger
                                                        disabled={processing}
                                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-green-50 text-slate-500 hover:text-green-600 flex items-center justify-center transition duration-150 disabled:opacity-50"
                                                        title="Luluskan"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    {/* Reject Button */}
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'rejected')} // trigger
                                                        disabled={processing}
                                                        className="w-8 h-8 rounded bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition duration-150 disabled:opacity-50"
                                                        title="Tolak"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center text-slate-400 font-medium">Selesai</div>
                                            )}
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
