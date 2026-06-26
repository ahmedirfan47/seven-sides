'use client';
import { useEffect, useState } from 'react';
import { Loader2, Save, CheckCircle2, AlertCircle } from 'lucide-react';

const DEFAULTS = { siteName:'Seven Sides', tagline:'Home of Red Tenders', primaryPhone:'+92 319 6481040', primaryEmail:'sevensides.pk@gmail.com', whatsappNumber:'923196481040', deliveryFee:200, freeDeliveryMin:2500, instagramUrl:'https://www.instagram.com/sevensides.pk', facebookUrl:'https://www.facebook.com/SevenSides.pk', aboutText:'' };

export default function SettingsClient() {
  const [form,    setForm]    = useState<any>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetch('/api/admin/settings').then(r=>r.json()).then(d => { setForm({ ...DEFAULTS, ...d, deliveryFee:Number(d.deliveryFee??200), freeDeliveryMin:Number(d.freeDeliveryMin??2500) }); setLoading(false); }).catch(()=>setLoading(false));
  }, []);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm((f: any) => ({ ...f, [key]: e.target.type==='number'?Number(e.target.value):e.target.value }));

  const save = async () => {
    setSaving(true); setSaved(false); setError('');
    const res  = await fetch('/api/admin/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    const data = await res.json();
    if (!res.ok) setError(data.error||'Save failed');
    else { setSaved(true); setTimeout(()=>setSaved(false),4000); }
    setSaving(false);
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold-400" /></div>;

  const field = (label: string, key: string, placeholder?: string, type='text') => (
    <div>
      <label className="label-dark">{label}</label>
      <input type={type} value={form[key]} onChange={set(key)} className="input-dark" placeholder={placeholder} />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-5">
      <div className="card-dark rounded-2xl p-6">
        <h2 className="mb-4 font-display text-lg text-white">BRAND</h2>
        <div className="space-y-4">
          {field('Site Name',   'siteName',   'Seven Sides')}
          {field('Tagline',     'tagline',    'Home of Red Tenders')}
        </div>
      </div>
      <div className="card-dark rounded-2xl p-6">
        <h2 className="mb-4 font-display text-lg text-white">CONTACT</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('Phone',     'primaryPhone',  '+92 319 6481040')}
          {field('Email',     'primaryEmail',  'sevensides.pk@gmail.com')}
          <div className="sm:col-span-2">
            <label className="label-dark">WhatsApp Number (digits only)</label>
            <div className="flex overflow-hidden rounded-2xl border border-dark-300 bg-dark-400 focus-within:border-gold-500">
              <span className="px-3 py-3 text-dark-200 text-xs whitespace-nowrap select-none border-r border-dark-300 bg-dark-500">wa.me/c/</span>
              <input value={form.whatsappNumber} onChange={set('whatsappNumber')} className="flex-1 px-3 py-3 text-base bg-transparent text-white focus:outline-none" placeholder="923196481040" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-dark rounded-2xl p-6">
        <h2 className="mb-4 font-display text-lg text-white">DELIVERY</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('Delivery Fee (Rs)',        'deliveryFee',  '200', 'number')}
          {field('Free Delivery Above (Rs)', 'freeDeliveryMin','2500','number')}
        </div>
      </div>
      <div className="card-dark rounded-2xl p-6">
        <h2 className="mb-4 font-display text-lg text-white">SOCIAL</h2>
        <div className="space-y-4">
          {field('Instagram URL', 'instagramUrl', 'https://www.instagram.com/sevensides.pk')}
          {field('Facebook URL',  'facebookUrl',  'https://www.facebook.com/SevenSides.pk')}
        </div>
      </div>
      {error && <div className="flex items-start gap-3 rounded-2xl border border-heat/30 bg-heat/10 px-4 py-3"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-heat" /><p className="text-sm text-heat">{error}</p></div>}
      <button onClick={save} disabled={saving} className="btn-gold w-full py-4 text-base">
        {saving  ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
        : saved   ? <><CheckCircle2 className="h-4 w-4" /> Saved!</>
        : <><Save className="h-4 w-4" /> Save Settings</>}
      </button>
    </div>
  );
}