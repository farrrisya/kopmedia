import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import UnifiedMediaInput from '@/Components/UnifiedMediaInput';

// --2. main component--
export default function Index({ auth, settings }) {
  const { data, setData, post, processing, errors, wasSuccessful, isDirty, transform } = useForm({
    contact_address: settings?.contact_address || '',
    contact_phone: settings?.contact_phone || '',
    contact_whatsapp: settings?.contact_whatsapp || '',
    contact_fax: settings?.contact_fax || '',
    contact_email: settings?.contact_email || '',
    contact_direktori_list: (function() {
      try { return settings?.contact_direktori_list ? JSON.parse(settings.contact_direktori_list) : []; }
      catch(e) { return []; }
    })(),
    contact_map_url: settings?.contact_map_url || '',
    contact_address_operasi: settings?.contact_address_operasi || '',
    contact_map_url_operasi: settings?.contact_map_url_operasi || '',
    social_facebook: settings?.social_facebook || '',
    social_facebook_username: settings?.social_facebook_username || '',
    social_instagram: settings?.social_instagram || '',
    social_instagram_username: settings?.social_instagram_username || '',
    social_tiktok: settings?.social_tiktok || '',
    social_tiktok_username: settings?.social_tiktok_username || '',

    about_intro: settings?.about_intro || '',
    about_brochure: settings?.about_brochure || '',
    company_tarikh_penubuhan: settings?.company_tarikh_penubuhan || '',
    company_no_pendaftaran: settings?.company_no_pendaftaran || '',
    company_aktiviti: settings?.company_aktiviti || '',
    company_maklumat_bank: settings?.company_maklumat_bank || '',
    company_alamat_bank: settings?.company_alamat_bank || '',
    company_visi: settings?.company_visi || '',
    company_misi: settings?.company_misi || '',
    company_motto: settings?.company_motto || '',
    company_struktur_organisasi: settings?.company_struktur_organisasi || '',
    company_jawatankuasa_kecil: settings?.company_jawatankuasa_kecil || '',
    company_anggota_lembaga: settings?.company_anggota_lembaga || '',
    company_jawatankuasa_audit: settings?.company_jawatankuasa_audit || '',
    company_perwakilan: settings?.company_perwakilan || '',
  });

  const submit = (e) => { // trigger
    e.preventDefault();
    transform((data) => ({
      ...data,
      contact_direktori_list: JSON.stringify(data.contact_direktori_list)
    }));
    post(route('admin.settings.update')); // save
  };

  return (
    <AdminLayout user={auth.user} headerTitle="Tetapan Sistem">
      <Head title="Tetapan - Admin" />

      <div className="pb-12">
        <form onSubmit={submit} className="space-y-6">
          {/* Tentang Syarikat Section */}
          <div className="bg-white rounded shadow-xs border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-white">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Tentang Syarikat</h3>
            </div>
            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pengenalan</label>
                  <textarea
                    value={data.about_intro}
                    onChange={(e) => setData('about_intro', e.target.value)}
                    rows="6"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                  ></textarea>
                  {errors.about_intro && <div className="text-red-500 text-xs mt-1 font-bold">{errors.about_intro}</div>}
                </div>
                
                {/* Row: Brosur and Tarikh Penubuhan */}
                <div>
                  <UnifiedMediaInput 
                    label="Brosur Syarikat"
                    allowUrl={true}
                    value={
                      data.about_brochure instanceof File ? { type: 'upload', file: data.about_brochure } :
                      (typeof data.about_brochure === 'string' && data.about_brochure !== '') ? 
                        (data.about_brochure.startsWith('http') ? { type: 'url', url: data.about_brochure } : { type: 'media', path: data.about_brochure })
                      : null
                    }
                    onChange={(val) => {
                      if (!val) {
                        setData('about_brochure', '');
                      } else if (val.type === 'upload') {
                        setData('about_brochure', val.file);
                      } else if (val.type === 'media') {
                        setData('about_brochure', val.path);
                      } else if (val.type === 'url') {
                        setData('about_brochure', val.url);
                      }
                    }}
                  />
                  {errors.about_brochure && <div className="text-red-500 text-xs mt-1 font-bold">{errors.about_brochure}</div>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tarikh Penubuhan</label>
                  <input
                    type="date"
                    value={data.company_tarikh_penubuhan}
                    onChange={(e) => setData('company_tarikh_penubuhan', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                  />
                  {errors.company_tarikh_penubuhan && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_tarikh_penubuhan}</div>}
                </div>

                {/* Row: No Pendaftaran and Aktiviti */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">No. Pendaftaran</label>
                  <input
                    type="text"
                    value={data.company_no_pendaftaran}
                    onChange={(e) => setData('company_no_pendaftaran', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                  />
                  {errors.company_no_pendaftaran && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_no_pendaftaran}</div>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Aktiviti</label>
                  <input
                    type="text"
                    value={data.company_aktiviti}
                    onChange={(e) => setData('company_aktiviti', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                  />
                  {errors.company_aktiviti && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_aktiviti}</div>}
                </div>

                {/* Row: Maklumat Bank and Alamat Bank */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Maklumat Bank</label>
                    <input
                      type="text"
                      value={data.company_maklumat_bank}
                      onChange={(e) => setData('company_maklumat_bank', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                    />
                    {errors.company_maklumat_bank && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_maklumat_bank}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Bank</label>
                    <textarea
                      value={data.company_alamat_bank}
                      onChange={(e) => setData('company_alamat_bank', e.target.value)}
                      rows="3"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                    ></textarea>
                    {errors.company_alamat_bank && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_alamat_bank}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maklumat Hubungan Section */}
          <div className="bg-white rounded shadow-xs border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-white">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Maklumat Hubungan</h3>
            </div>
            <div className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* No. Telefon */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">No. Telefon</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={data.contact_phone}
                    onChange={(e) => setData('contact_phone', e.target.value)} // state
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                  />
                </div>
                {errors.contact_phone && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_phone}</div>}
              </div>

              {/* No. WhatsApp */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">No. WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    {/* WhatsApp Icon */}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.84.497 3.593 1.442 5.127L2.102 22l4.981-1.306A9.972 9.972 0 0012.031 22c5.535 0 10.03-4.495 10.03-10.03S17.566 2 12.031 2zm5.418 14.542c-.23.649-1.332 1.258-1.84 1.341-.47.077-1.077.135-3.327-.798-2.67-1.107-4.407-3.824-4.543-4.004-.136-.18-1.085-1.446-1.085-2.76 0-1.314.685-1.956.929-2.227.244-.27.53-.338.706-.338.176 0 .352.001.503.008.159.008.375-.061.587.45.22.536.705 1.724.77 1.854.065.13.109.28.02.46-.089.176-.135.289-.27.438-.135.15-.285.327-.406.46-.134.15-.282.316-.123.592.16.275.713 1.18 1.534 1.912 1.058.944 1.936 1.236 2.215 1.37.279.135.441.11.604-.075.163-.186.705-.823.895-1.106.189-.283.378-.236.634-.135.257.101 1.62.766 1.899.905.279.14.466.21.534.326.068.115.068.67-.162 1.319z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={data.contact_whatsapp}
                    onChange={(e) => setData('contact_whatsapp', e.target.value)} // state
                    placeholder="Contoh: 60123456789 (Tanpa + atau -)"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                  />
                </div>
                {errors.contact_whatsapp && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_whatsapp}</div>}
              </div>

              {/* No. Faks */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">No. Faks</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={data.contact_fax}
                    onChange={(e) => setData('contact_fax', e.target.value)} // state
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                  />
                </div>
                {errors.contact_fax && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_fax}</div>}
              </div>

              {/* Emel Rasmi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Emel Rasmi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={data.contact_email}
                    onChange={(e) => setData('contact_email', e.target.value)} // state
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                  />
                </div>
                {errors.contact_email && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_email}</div>}
              </div>

              {/* Direktori Kakitangan */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-end mb-4">
                  <label className="block text-sm font-bold text-slate-700">Direktori Kakitangan</label>
                  <button
                    type="button"
                    onClick={() => setData('contact_direktori_list', [...data.contact_direktori_list, { nama: '', unit: '', sambungan: '', whatsapp: '' }])}
                    className="text-xs font-bold bg-[#0a192f] text-white px-4 py-2 rounded-sm hover:bg-slate-800 transition-colors"
                  >
                    + Tambah Rekod
                  </button>
                </div>
                
                {data.contact_direktori_list.length === 0 ? (
                  <div className="text-sm text-slate-500 italic p-6 text-center border border-dashed border-slate-200 rounded-sm bg-slate-50">Tiada rekod direktori. Sila tambah rekod baru.</div>
                ) : (
                  <div className="border border-slate-200 rounded-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-700">Kakitangan</th>
                          <th className="px-4 py-3 font-bold text-slate-700">Unit</th>
                          <th className="px-4 py-3 font-bold text-slate-700">No. Sambungan</th>
                          <th className="px-4 py-3 font-bold text-slate-700">WhatsApp</th>
                          <th className="px-4 py-3 w-12 text-center">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {data.contact_direktori_list.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-2">
                              <input type="text" value={item.nama} onChange={e => { const list = [...data.contact_direktori_list]; list[idx].nama = e.target.value; setData('contact_direktori_list', list); }} className="w-full border-slate-200 rounded-sm text-sm p-2 focus:ring-[#0a192f] focus:border-[#0a192f]" />
                            </td>
                            <td className="p-2">
                              <input type="text" value={item.unit} onChange={e => { const list = [...data.contact_direktori_list]; list[idx].unit = e.target.value; setData('contact_direktori_list', list); }} className="w-full border-slate-200 rounded-sm text-sm p-2 focus:ring-[#0a192f] focus:border-[#0a192f]" />
                            </td>
                            <td className="p-2">
                              <input type="text" value={item.sambungan} onChange={e => { const list = [...data.contact_direktori_list]; list[idx].sambungan = e.target.value; setData('contact_direktori_list', list); }} className="w-full border-slate-200 rounded-sm text-sm p-2 focus:ring-[#0a192f] focus:border-[#0a192f]" />
                            </td>
                            <td className="p-2">
                              <input type="text" value={item.whatsapp} onChange={e => { const list = [...data.contact_direktori_list]; list[idx].whatsapp = e.target.value; setData('contact_direktori_list', list); }} className="w-full border-slate-200 rounded-sm text-sm p-2 focus:ring-[#0a192f] focus:border-[#0a192f]" />
                            </td>
                            <td className="p-2 text-center">
                              <button type="button" onClick={() => { const list = [...data.contact_direktori_list]; list.splice(idx, 1); setData('contact_direktori_list', list); }} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-sm transition-colors mx-auto block">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {errors.contact_direktori_list && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_direktori_list}</div>}
              </div>
              
              <div className="md:col-span-2 border-b border-slate-100 my-4"></div>

              {/* Alamat Pejabat & Operasi Side by Side */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Pejabat</label>
                  <textarea
                    value={data.contact_address}
                    onChange={(e) => setData('contact_address', e.target.value)} // state
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                  ></textarea>
                  {errors.contact_address && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_address}</div>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Google Maps Embed URL (Pejabat)</label>
                  <input
                    type="text"
                    value={data.contact_map_url}
                    onChange={(e) => setData('contact_map_url', e.target.value)} // state
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3 font-mono text-xs"
                  />
                  {errors.contact_map_url && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_map_url}</div>}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Operasi</label>
                  <textarea
                    value={data.contact_address_operasi}
                    onChange={(e) => setData('contact_address_operasi', e.target.value)} // state
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                  ></textarea>
                  {errors.contact_address_operasi && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_address_operasi}</div>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Google Maps Embed URL (Operasi)</label>
                  <input
                    type="text"
                    value={data.contact_map_url_operasi}
                    onChange={(e) => setData('contact_map_url_operasi', e.target.value)} // state
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3 font-mono text-xs"
                  />
                  {errors.contact_map_url_operasi && <div className="text-red-500 text-xs mt-1 font-bold">{errors.contact_map_url_operasi}</div>}
                </div>
              </div>
              


            </div>
          </div>
          </div>

          {/* Maklumat Syarikat Section */}
          <div className="bg-white rounded shadow-xs border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-white">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Maklumat Syarikat</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visi, Misi, Motto */}
                <div className="md:col-span-2 space-y-6 mb-4">
                  <h4 className="text-sm font-black uppercase tracking-wider text-[#0a192f] border-b border-slate-100 pb-2">Visi, Misi & Motto</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Visi</label>
                      <textarea
                        value={data.company_visi}
                        onChange={(e) => setData('company_visi', e.target.value)}
                        rows="4"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                      ></textarea>
                      {errors.company_visi && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_visi}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Misi</label>
                      <textarea
                        value={data.company_misi}
                        onChange={(e) => setData('company_misi', e.target.value)}
                        rows="4"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                      ></textarea>
                      {errors.company_misi && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_misi}</div>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Motto</label>
                      <textarea
                        value={data.company_motto}
                        onChange={(e) => setData('company_motto', e.target.value)}
                        rows="3"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-4"
                      ></textarea>
                      {errors.company_motto && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_motto}</div>}
                    </div>
                  </div>
                </div>
                <div>
                  <UnifiedMediaInput 
                    label="Struktur Organisasi Pengurusan Koperasi NSTP 2023"
                    allowUrl={true}
                    value={
                      data.company_struktur_organisasi instanceof File ? { type: 'upload', file: data.company_struktur_organisasi } :
                      (typeof data.company_struktur_organisasi === 'string' && data.company_struktur_organisasi !== '') ? 
                        (data.company_struktur_organisasi.startsWith('http') ? { type: 'url', url: data.company_struktur_organisasi } : { type: 'media', path: data.company_struktur_organisasi })
                      : null
                    }
                    onChange={(val) => {
                      if (!val) setData('company_struktur_organisasi', '');
                      else if (val.type === 'upload') setData('company_struktur_organisasi', val.file);
                      else if (val.type === 'media') setData('company_struktur_organisasi', val.path);
                      else if (val.type === 'url') setData('company_struktur_organisasi', val.url);
                    }}
                  />
                  {errors.company_struktur_organisasi && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_struktur_organisasi}</div>}
                </div>

                {/* Row 2: Jawatankuasa Kecil AND Anggota Lembaga */}
                <div>
                  <UnifiedMediaInput 
                    label="Jawatankuasa Kecil 2025"
                    allowUrl={true}
                    value={
                      data.company_jawatankuasa_kecil instanceof File ? { type: 'upload', file: data.company_jawatankuasa_kecil } :
                      (typeof data.company_jawatankuasa_kecil === 'string' && data.company_jawatankuasa_kecil !== '') ? 
                        (data.company_jawatankuasa_kecil.startsWith('http') ? { type: 'url', url: data.company_jawatankuasa_kecil } : { type: 'media', path: data.company_jawatankuasa_kecil })
                      : null
                    }
                    onChange={(val) => {
                      if (!val) setData('company_jawatankuasa_kecil', '');
                      else if (val.type === 'upload') setData('company_jawatankuasa_kecil', val.file);
                      else if (val.type === 'media') setData('company_jawatankuasa_kecil', val.path);
                      else if (val.type === 'url') setData('company_jawatankuasa_kecil', val.url);
                    }}
                  />
                  {errors.company_jawatankuasa_kecil && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_jawatankuasa_kecil}</div>}
                </div>
                <div>
                  <UnifiedMediaInput 
                    label="Anggota Lembaga Koperasi NSTP"
                    allowUrl={true}
                    value={
                      data.company_anggota_lembaga instanceof File ? { type: 'upload', file: data.company_anggota_lembaga } :
                      (typeof data.company_anggota_lembaga === 'string' && data.company_anggota_lembaga !== '') ? 
                        (data.company_anggota_lembaga.startsWith('http') ? { type: 'url', url: data.company_anggota_lembaga } : { type: 'media', path: data.company_anggota_lembaga })
                      : null
                    }
                    onChange={(val) => {
                      if (!val) setData('company_anggota_lembaga', '');
                      else if (val.type === 'upload') setData('company_anggota_lembaga', val.file);
                      else if (val.type === 'media') setData('company_anggota_lembaga', val.path);
                      else if (val.type === 'url') setData('company_anggota_lembaga', val.url);
                    }}
                  />
                  {errors.company_anggota_lembaga && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_anggota_lembaga}</div>}
                </div>
                <div>
                  <UnifiedMediaInput 
                    label="Ahli Jawatankuasa Audit Dalaman"
                    allowUrl={true}
                    value={
                      data.company_jawatankuasa_audit instanceof File ? { type: 'upload', file: data.company_jawatankuasa_audit } :
                      (typeof data.company_jawatankuasa_audit === 'string' && data.company_jawatankuasa_audit !== '') ? 
                        (data.company_jawatankuasa_audit.startsWith('http') ? { type: 'url', url: data.company_jawatankuasa_audit } : { type: 'media', path: data.company_jawatankuasa_audit })
                      : null
                    }
                    onChange={(val) => {
                      if (!val) setData('company_jawatankuasa_audit', '');
                      else if (val.type === 'upload') setData('company_jawatankuasa_audit', val.file);
                      else if (val.type === 'media') setData('company_jawatankuasa_audit', val.path);
                      else if (val.type === 'url') setData('company_jawatankuasa_audit', val.url);
                    }}
                  />
                  {errors.company_jawatankuasa_audit && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_jawatankuasa_audit}</div>}
                </div>

                {/* Row 3: Perwakilan Koperasi NSTP */}
                <div>
                  <UnifiedMediaInput 
                    label="Perwakilan Koperasi NSTP"
                    allowUrl={true}
                    value={
                      data.company_perwakilan instanceof File ? { type: 'upload', file: data.company_perwakilan } :
                      (typeof data.company_perwakilan === 'string' && data.company_perwakilan !== '') ? 
                        (data.company_perwakilan.startsWith('http') ? { type: 'url', url: data.company_perwakilan } : { type: 'media', path: data.company_perwakilan })
                      : null
                    }
                    onChange={(val) => {
                      if (!val) setData('company_perwakilan', '');
                      else if (val.type === 'upload') setData('company_perwakilan', val.file);
                      else if (val.type === 'media') setData('company_perwakilan', val.path);
                      else if (val.type === 'url') setData('company_perwakilan', val.url);
                    }}
                  />
                  {errors.company_perwakilan && <div className="text-red-500 text-xs mt-1 font-bold">{errors.company_perwakilan}</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Media Sosial Section */}
          <div className="bg-white rounded shadow-xs border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-white">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Media Sosial</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Facebook */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Pautan Facebook</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="url"
                          value={data.social_facebook}
                          onChange={(e) => setData('social_facebook', e.target.value)} // state
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                        />
                      </div>
                      {errors.social_facebook && <div className="text-red-500 text-xs mt-1 font-bold">{errors.social_facebook}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Pengguna (Display Name)</label>
                      <input
                        type="text"
                        value={data.social_facebook_username}
                        onChange={(e) => setData('social_facebook_username', e.target.value)} // state
                        placeholder="Contoh: Koperasi Media Prima"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                      />
                    </div>
                  </div>

                {/* Instagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Pautan Instagram</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="url"
                          value={data.social_instagram}
                          onChange={(e) => setData('social_instagram', e.target.value)} // state
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                        />
                      </div>
                      {errors.social_instagram && <div className="text-red-500 text-xs mt-1 font-bold">{errors.social_instagram}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Pengguna (Display Name)</label>
                      <input
                        type="text"
                        value={data.social_instagram_username}
                        onChange={(e) => setData('social_instagram_username', e.target.value)} // state
                        placeholder="Contoh: @kopmedia"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                      />
                    </div>
                  </div>

                {/* TikTok */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Pautan TikTok</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.41 3.23-1.25 4.58-1.57 2.44-4.52 3.65-7.39 3.09-3.25-.61-5.74-3.56-5.83-6.86-.06-2.58 1.22-5.11 3.51-6.27 1.1-.57 2.37-.8 3.62-.77V13.3c-1.3-.06-2.61.41-3.5 1.34-.84.88-1.2 2.14-1.07 3.37.21 1.76 1.74 3.19 3.53 3.32 1.7.13 3.37-.83 4-2.39.38-.97.48-2.05.47-3.09V.02h-3.17z"/>
                          </svg>
                        </div>
                        <input
                          type="url"
                          value={data.social_tiktok}
                          onChange={(e) => setData('social_tiktok', e.target.value)} // state
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors pl-10 p-3"
                        />
                      </div>
                      {errors.social_tiktok && <div className="text-red-500 text-xs mt-1 font-bold">{errors.social_tiktok}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Pengguna (Display Name)</label>
                      <input
                        type="text"
                        value={data.social_tiktok_username}
                        onChange={(e) => setData('social_tiktok_username', e.target.value)} // state
                        placeholder="Contoh: @kopmedia"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-md focus:ring-[#0a192f] focus:border-[#0a192f] transition-colors p-3"
                      />
                    </div>
                  </div>
              </div>
            </div>
          </div>



          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className={`px-6 py-2 bg-[#0a192f] hover:bg-slate-800 text-white rounded-md text-xs font-bold transition duration-150 disabled:opacity-50 flex items-center gap-1.5 ${wasSuccessful && !isDirty ? "!bg-emerald-50 !border !border-emerald-500 !text-emerald-700 hover:!bg-emerald-100 shadow-none" : "text-white"}`}
            >
              {wasSuccessful && !isDirty && (
                  <svg className="w-4 h-4 text-emerald-600 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
              )}
              {wasSuccessful && !isDirty ? 'Telah dikemaskini' : processing ? 'Menyimpan...' : 'Kemaskini'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
