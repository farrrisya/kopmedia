// --1. imports--
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

// --2. main component--
export default function Members({ auth, members = [] }) {
    return (
        <AdminLayout headerTitle="Senarai Anggota">
            <Head title="Ahli Koperasi - Admin" />

            <div className="bg-white rounded border border-slate-100 shadow-xs overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Senarai Keanggotaan Berdaftar</h3>
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                            Papar dan uruskan maklumat semua anggota berdaftar
                        </span>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">
                        {members.length} Anggota
                    </span>
                </div>

                {members.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">
                        Tiada anggota berdaftar.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">E-mel</th>
                                    <th className="p-4">No. Telefon</th>
                                    <th className="p-4">Jabatan</th>
                                    <th className="p-4">Tarikh Daftar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {members.map((member) => (
                                    <tr key={member.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="p-4 font-bold text-slate-800 align-middle">{member.name}</td>
                                        <td className="p-4 text-slate-500 align-middle">{member.email}</td>
                                        <td className="p-4 text-slate-500 align-middle">{member.phone_number || '-'}</td>
                                        <td className="p-4 text-slate-500 align-middle">{member.department || '-'}</td>
                                        <td className="p-4 text-slate-500 align-middle">
                                            {new Date(member.created_at).toLocaleDateString('ms-MY', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
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
