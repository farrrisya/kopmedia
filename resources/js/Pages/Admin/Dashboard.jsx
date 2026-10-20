// --1. imports--
import { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --2. helpers--
const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInHours = diffInSeconds / 3600;

    if (diffInHours < 24) {
        if (diffInSeconds < 60) return `${Math.max(1, diffInSeconds)} saat lalu`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minit lalu`;
        return `${Math.floor(diffInHours)} jam lalu`;
    }

    return date.toLocaleString('ms-MY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// --3. main component--
export default function Dashboard({ auth, metrics = {}, latest_notices = [], latest_penerbitan = [], chart_data = [], recent_activities = [] }) {
    // state
    const [selectedMetric, setSelectedMetric] = useState('Semua');

    const today = new Date().toLocaleDateString('ms-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Metric Series Configuration
    const metricConfigs = {
        'Notis': { stroke: '#3b82f6', fill: '#3b82f6', name: 'Notis' },
        'Laporan': { stroke: '#10b981', fill: '#10b981', name: 'Laporan' },
        'Buletin': { stroke: '#f43f5e', fill: '#f43f5e', name: 'Buletin' },
        'Muat Turun': { stroke: '#f59e0b', fill: '#f59e0b', name: 'Dokumen' },
        'Perkhidmatan': { stroke: '#8b5cf6', fill: '#8b5cf6', name: 'Perkhidmatan' },
    };

    // Filter chart data based on active category selection
    const activeSeriesKeys = useMemo(() => { // convert
        if (selectedMetric === 'Semua') {
            return Object.keys(metricConfigs);
        }
        return [selectedMetric];
    }, [selectedMetric]);

    // --5. UI--
    return (
        <AdminLayout headerTitle="Dashboard">
            <Head title="CMS Dashboard - Admin" />

            <div className="py-2 space-y-8">
                {/* 1. Welcome Banner */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold tracking-wide">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Sistem Beroperasi Normal
                            </span>
                            <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {today}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Selamat Datang, {auth?.user?.name || 'Admin Kopmedia'}
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-3xl leading-relaxed">
                            Pantau statistik portal, urus penerbitan rasmi, dan jejak aktiviti sistem Koperasi Media Prima Berhad secara masa nyata.
                        </p>
                    </div>
                </div>

                {/* 2. Elevated Metric KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
                    {/* Notis KPI */}
                    <Link
                        href={route('admin.notices.index')} // redirect
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80 group-hover:opacity-100"></div>
                        <div>
                            <div className="w-11 h-11 mb-4 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1 group-hover:text-blue-600 transition-colors">
                                Berita & Notis
                            </span>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">
                                {metrics.total_notices || 0}
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-blue-600">
                            <span>Urus Notis</span>
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Link>

                    {/* Buletin KPI */}
                    <Link
                        href={route('admin.penerbitan.index')} // redirect
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-rose-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-400 opacity-80 group-hover:opacity-100"></div>
                        <div>
                            <div className="w-11 h-11 mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1 group-hover:text-rose-600 transition-colors">
                                Jumlah Buletin
                            </span>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">
                                {metrics.total_buletin || 0}
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-rose-600">
                            <span>Urus Buletin</span>
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Link>

                    {/* Laporan Tahunan KPI */}
                    <Link
                        href={route('admin.penerbitan.index')} // redirect
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80 group-hover:opacity-100"></div>
                        <div>
                            <div className="w-11 h-11 mb-4 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1 group-hover:text-emerald-600 transition-colors">
                                Laporan Tahunan
                            </span>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">
                                {metrics.total_laporan || 0}
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-emerald-600">
                            <span>Urus Laporan</span>
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Link>

                    {/* Dokumen KPI */}
                    <Link
                        href={route('admin.muat-turun.index')} // redirect
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-80 group-hover:opacity-100"></div>
                        <div>
                            <div className="w-11 h-11 mb-4 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1 group-hover:text-amber-600 transition-colors">
                                Pusat Dokumen
                            </span>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">
                                {metrics.total_muat_turun || 0}
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-amber-600">
                            <span>Urus Dokumen</span>
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Link>

                    {/* Perkhidmatan KPI */}
                    <Link
                        href={route('admin.produk-perkhidmatan.index')} // redirect
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden col-span-2 sm:col-span-1"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-400 opacity-80 group-hover:opacity-100"></div>
                        <div>
                            <div className="w-11 h-11 mb-4 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1 group-hover:text-purple-600 transition-colors">
                                Perkhidmatan
                            </span>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">
                                {metrics.total_produk || 0}
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-purple-600">
                            <span>Urus Produk</span>
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Link>
                </div>

                {/* 3. Upgraded Interactive Area Chart */}
                <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase">
                                    Analisis Penerbitan & Kandungan
                                </h2>
                            </div>
                            <p className="text-xs font-semibold text-slate-400">
                                Statistik penambahan kandungan portal sepanjang 12 bulan terkini.
                            </p>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
                            {['Semua', 'Notis', 'Laporan', 'Buletin', 'Muat Turun', 'Perkhidmatan'].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedMetric(category)} // trigger
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                                        selectedMetric === category
                                            ? 'bg-white text-slate-900 shadow-xs'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {category === 'Muat Turun' ? 'Dokumen' : category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[320px] sm:h-[360px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chart_data}
                                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="gradNotis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                                    </linearGradient>
                                    <linearGradient id="gradLaporan" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                                    </linearGradient>
                                    <linearGradient id="gradBuletin" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                                    </linearGradient>
                                    <linearGradient id="gradMuatTurun" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                                    </linearGradient>
                                    <linearGradient id="gradPerkhidmatan" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0a192f',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                                        color: '#ffffff',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        padding: '10px 14px',
                                    }}
                                    itemStyle={{ color: '#e2e8f0', padding: '2px 0' }}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '700' }}
                                />
                                {activeSeriesKeys.map((key) => {
                                    const conf = metricConfigs[key];
                                    const gradId = key === 'Muat Turun' ? 'gradMuatTurun' : `grad${key}`;
                                    return (
                                        <Area
                                            key={key}
                                            type="monotone"
                                            dataKey={key}
                                            name={conf.name}
                                            stroke={conf.stroke}
                                            strokeWidth={2.5}
                                            fillOpacity={1}
                                            fill={`url(#${gradId})`}
                                            activeDot={{ r: 6, strokeWidth: 2, stroke: '#ffffff' }}
                                        />
                                    );
                                })}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Latest Notices */}
                    <div className="bg-white rounded shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-base font-black text-[#0a192f] tracking-tight uppercase">Berita & Notis Terkini</h3>
                            <Link href={route('admin.notices.index')} className="text-[10px] uppercase tracking-widest font-extrabold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded transition-colors">Lihat Semua</Link>
                        </div>
                        <div className="divide-y divide-slate-50 flex-1">
                            {latest_notices.length > 0 ? latest_notices.map((notice) => (
                                <div key={notice.id} className="p-6 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <p className="text-sm font-bold text-slate-800 truncate mb-1.5">{notice.title}</p>
                                        <div className="flex items-center gap-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                            <span>{new Date(notice.created_at).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <span className={`px-2 py-0.5 rounded-full ${notice.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {notice.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-slate-400 text-sm font-medium">Tiada notis direkodkan.</div>
                            )}
                        </div>
                    </div>

                    {/* Latest Publications */}
                    <div className="bg-white rounded shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-base font-black text-[#0a192f] tracking-tight uppercase">Penerbitan Terkini</h3>
                            <Link href={route('admin.penerbitan.index')} className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded transition-colors">Lihat Semua</Link>
                        </div>
                        <div className="divide-y divide-slate-50 flex-1">
                            {latest_penerbitan.length > 0 ? latest_penerbitan.map((item) => (
                                <div key={item.id} className="p-6 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <p className="text-sm font-bold text-slate-800 truncate mb-1.5">{item.title}</p>
                                        <div className="flex items-center gap-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                            <span>{new Date(item.created_at).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <span className={`px-2 py-0.5 rounded-full ${item.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-slate-400 text-sm font-medium">Tiada penerbitan direkodkan.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Activity Log Table */}
                <div className="bg-white rounded-md shadow-sm border border-slate-100 overflow-hidden mt-8">
                    <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-base md:text-lg font-black text-[#0a192f] tracking-tight uppercase">Aktiviti Terkini</h3>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/50 font-extrabold border-b border-slate-100 tracking-wider">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Tindakan</th>
                                    <th scope="col" className="px-6 py-4 text-right">Tarikh & Masa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recent_activities.length > 0 ? recent_activities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col justify-center min-h-[44px]">
                                                <span className="font-bold text-slate-700 text-sm">
                                                    {activity.action === 'Log Masuk'
                                                        ? 'Log masuk ke sistem admin'
                                                        : `${activity.action} ${activity.description.replace('Menambah data ', '').replace('Mengemaskini data ', '').replace('Menghapus data ', '')}`}
                                                </span>
                                                {activity.action !== 'Log Masuk' && (activity.properties?.item_name || activity.properties?.new?.title || activity.properties?.new?.name) && (!String(activity.properties?.item_name || '').startsWith('ID:')) && (
                                                    <span className="text-xs font-semibold text-slate-500 mt-1">
                                                        - {activity.properties?.item_name || activity.properties?.new?.title || activity.properties?.new?.name}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-500 text-[11px] uppercase tracking-wider text-right whitespace-nowrap align-middle">
                                            {formatRelativeTime(activity.created_at)}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-12 text-center text-slate-400 font-medium text-sm">
                                            Tiada aktiviti direkodkan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
