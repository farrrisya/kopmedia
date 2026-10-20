// --1. imports--
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

// --2. main component--
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({ // state
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false); // ui state

    // --3. actions--
    const submit = (e) => { // trigger
        e.preventDefault();

        post(route('login'), { // save
            onFinish: () => reset('password'),
        });
    };

    // --4. UI--
    return (
        <GuestLayout>
            <Head title="Log Masuk CMS - Kopmedia" />

            <div className="mb-8 text-left">
                <h2 className="text-3xl font-black text-[#0a192f] tracking-tight">Log Masuk Admin</h2>
                <p className="text-[14px] text-slate-500 mt-2 font-medium max-w-sm">
                    Sila masukkan e-mel dan kata laluan anda untuk mengakses portal.
                </p>
            </div>

            {status && ( // check
                <div className="mb-6 text-sm font-medium text-green-700 bg-green-50/80 p-3.5 rounded-lg border border-green-200">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Alamat E-mel" className="text-[12px] font-bold text-slate-700 uppercase tracking-wider mb-2" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email} // input
                        className="block w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-[14px] text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#0a192f] focus:ring-1 focus:ring-[#0a192f] shadow-sm transition-all duration-300"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)} // trigger
                    />
                    <InputError message={errors.email} className="mt-1.5 text-[12px] font-medium" /> {/* error */}
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Laluan" className="text-[12px] font-bold text-slate-700 uppercase tracking-wider mb-2" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password} // input
                            className="block w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 pl-4 pr-12 text-[14px] text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#0a192f] focus:ring-1 focus:ring-[#0a192f] shadow-sm transition-all duration-300"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)} // trigger
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a192f] transition-colors focus:outline-none"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5 text-[12px] font-medium" /> {/* error */}
                    {canResetPassword && ( // check
                        <div className="mt-2 text-right">
                            <Link
                                href={route('password.request')} // redirect
                                className="text-[12px] font-medium text-slate-500 hover:text-[#0a192f] transition-colors"
                            >
                                Lupa kata laluan?
                            </Link>
                        </div>
                    )}
                </div>

                <div className="pt-2 flex items-center">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember} // input
                            onChange={(e) => setData('remember', e.target.checked)} // trigger
                            className="rounded-md border-slate-300 text-[#0a192f] shadow-sm focus:ring-[#0a192f] h-4 w-4 transition-colors"
                        />
                        <span className="ms-3 text-[13px] text-slate-600 font-medium select-none group-hover:text-[#0a192f] transition-colors">
                            Ingat saya
                        </span>
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3.5 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-[13px] tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(10,25,47,0.15)] hover:shadow-[0_6px_20px_rgba(10,25,47,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        disabled={processing} // toggle
                    >
                        {processing && (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {processing ? 'Memproses...' : 'Log Masuk'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
