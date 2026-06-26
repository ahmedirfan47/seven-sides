'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search, X, Loader2, ImagePlus, Link as LinkIcon, FolderPlus, Flame } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Category { id:string; name:string; slug:string }
interface Product {
  id:string; name:string; slug:string; price:number; hasHeatLevel:boolean;
  images:string[]; isAvailable:boolean; isFeatured:boolean; stock:number;
  category:{ name:string };
}

const EMPTY = { name:'', slug:'', description:'', price:'', compareAtPrice:'', categoryId:'', stock:'50', sku:'', tags:'', isFeatured:false, isAvailable:true, hasHeatLevel:false, images:[] as string[] };
const EMPTY_CAT = { name:'', slug:'', description:'', position:'0', isActive:true };

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

export default function ProductsClient() {
  const [products,    setProducts]    = useState<Product[]>([]);
  const [categories,  setCategories]  = useState<Category[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState('');
  const [modal,       setModal]       = useState(false);
  const [catModal,    setCatModal]    = useState(false);
  const [editing,     setEditing]     = useState<Product|null>(null);
  const [editingCat,  setEditingCat]  = useState<Category|null>(null);
  const [form,        setForm]        = useState<any>(EMPTY);
  const [catForm,     setCatForm]     = useState<any>(EMPTY_CAT);
  const [saving,      setSaving]      = useState(false);
  const [savingCat,   setSavingCat]   = useState(false);
  const [imgUploading,setImgUploading]= useState(false);
  const [error,       setError]       = useState('');
  const [catError,    setCatError]    = useState('');
  const [uploadError, setUploadError] = useState('');
  const [urlInput,    setUrlInput]    = useState('');
  const [showUrl,     setShowUrl]     = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetch(`/api/admin/products?q=${encodeURIComponent(search)}`).then(r=>r.json()),
      fetch('/api/admin/categories').then(r=>r.json()),
    ]);
    setProducts(Array.isArray(p)?p:[]); setCategories(Array.isArray(c)?c:[]); setLoading(false);
  }, [search]);

  useEffect(() => { const t=setTimeout(fetchAll,search?400:0); return ()=>clearTimeout(t); }, [fetchAll]);

  const fetchCats = async () => { const c=await fetch('/api/admin/categories').then(r=>r.json()); setCategories(Array.isArray(c)?c:[]); };

  const openCreate = () => { setEditing(null); setForm({...EMPTY,images:[]}); setError(''); setUploadError(''); setUrlInput(''); setShowUrl(false); setModal(true); };
  const openEdit   = (p:Product) => {
    setEditing(p);
    setForm({ name:p.name, slug:p.slug, description:(p as any).description??'', price:String(p.price), compareAtPrice:String((p as any).compareAtPrice??''), categoryId:(p as any).categoryId??'', stock:String(p.stock), sku:(p as any).sku??'', tags:(p as any).tags?.join(', ')??'', isFeatured:p.isFeatured, isAvailable:p.isAvailable, hasHeatLevel:p.hasHeatLevel, images:[...p.images] });
    setError(''); setUploadError(''); setUrlInput(''); setShowUrl(false); setModal(true);
  };

  const uploadImage = async (file: File) => {
    setImgUploading(true); setUploadError('');
    const fd=new FormData(); fd.append('file',file);
    const res=await fetch('/api/admin/upload',{method:'POST',body:fd}); const data=await res.json();
    if (!res.ok) { setUploadError(data.error||'Upload failed'); if(data.setupRequired) setShowUrl(true); }
    else { setForm((f:any)=>({...f,images:[...f.images,data.url]})); }
    setImgUploading(false);
  };

  const addUrl = () => { const url=urlInput.trim(); if(!url||!url.startsWith('http')){setUploadError('Enter a valid URL');return;} setForm((f:any)=>({...f,images:[...f.images,url]})); setUrlInput(''); setUploadError(''); };
  const removeImage = (i:number) => setForm((f:any)=>({...f,images:f.images.filter((_:any,idx:number)=>idx!==i)}));

  const saveProduct = async () => {
    setSaving(true); setError('');
    const body = { ...form, price:Number(form.price), compareAtPrice:form.compareAtPrice?Number(form.compareAtPrice):null, stock:Number(form.stock), tags:form.tags?form.tags.split(',').map((t:string)=>t.trim()).filter(Boolean):[] };
    const url  = editing?`/api/admin/products/${editing.id}`:'/api/admin/products';
    const res  = await fetch(url,{method:editing?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data = await res.json();
    if (!res.ok) { setError(data.error??'Failed to save'); setSaving(false); return; }
    setModal(false); fetchAll(); setSaving(false);
  };

  const deleteProduct = async (id:string) => {
    if (!confirm('Delete this product?')) return;
    const res=await fetch(`/api/admin/products/${id}`,{method:'DELETE'}); const data=await res.json();
    if (!res.ok) alert(data.error||'Could not delete'); else fetchAll();
  };

  const openCreateCat = () => { setEditingCat(null); setCatForm({...EMPTY_CAT}); setCatError(''); setCatModal(true); };
  const openEditCat   = (c:Category) => { setEditingCat(c); setCatForm({ name:c.name, slug:c.slug, description:(c as any).description??'', position:String((c as any).position??0), isActive:(c as any).isActive??true }); setCatError(''); setCatModal(true); };
  const saveCat = async () => {
    setSavingCat(true); setCatError('');
    const url=editingCat?`/api/admin/categories/${editingCat.id}`:'/api/admin/categories';
    const res=await fetch(url,{method:editingCat?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...catForm,position:Number(catForm.position)})});
    const data=await res.json();
    if (!res.ok) { setCatError(data.error??'Failed'); setSavingCat(false); return; }
    setCatModal(false); await fetchCats();
    if (!editingCat&&data.id) setForm((f:any)=>({...f,categoryId:data.id}));
    setSavingCat(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-200" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…" className="input-dark w-60 pl-11" />
        </div>
        <button onClick={openCreate} className="btn-gold ml-auto"><Plus className="h-4 w-4" /> Add Product</button>
      </div>

      <div className="card-dark rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-dark-400">
              <tr className="text-xs uppercase tracking-wide text-dark-100">
                <th className="px-4 py-3 text-left font-semibold">Product</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Price</th>
                <th className="px-4 py-3 text-left font-semibold">Heat</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? <tr><td colSpan={6} className="py-14 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-400" /></td></tr>
                : products.length === 0
                ? <tr><td colSpan={6} className="py-14 text-center text-dark-100">No products.</td></tr>
                : products.map(p => (
                  <tr key={p.id} className="border-b border-dark-300 hover:bg-dark-400 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-dark-400">
                          {p.images[0]&&<Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />}
                        </div>
                        <div>
                          <p className="font-medium text-white">{p.name}</p>
                          {p.isFeatured && <span className="text-xs text-gold-400">Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-dark-100">{p.category?.name}</td>
                    <td className="px-4 py-3 font-semibold text-gold-400">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3">{p.hasHeatLevel&&<Flame className="h-4 w-4 text-heat" strokeWidth={2} />}</td>
                    <td className="px-4 py-3">
                      <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold border', p.isAvailable?'border-teal-700 bg-teal-900/30 text-teal-400':'border-red-700 bg-red-900/30 text-red-400')}>
                        {p.isAvailable?'Available':'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={()=>openEdit(p)} className="rounded-lg p-2 text-dark-200 hover:bg-dark-300 hover:text-white transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button onClick={()=>deleteProduct(p.id)} className="rounded-lg p-2 text-dark-200 hover:bg-heat/10 hover:text-heat transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-dark-600/70 p-0 sm:p-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full sm:max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-dark-500 border border-dark-300 p-5 sm:p-6 admin-scroll">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl text-white">{editing?'EDIT PRODUCT':'ADD PRODUCT'}</h2>
              <button onClick={()=>setModal(false)} className="rounded-xl p-2 hover:bg-dark-400 text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-dark">Name</label>
                  <input value={form.name} onChange={e=>setForm((f:any)=>({...f,name:e.target.value,slug:slugify(e.target.value)}))} className="input-dark" placeholder="Product name" />
                </div>
                <div>
                  <label className="label-dark">Slug</label>
                  <input value={form.slug} onChange={e=>setForm((f:any)=>({...f,slug:e.target.value}))} className="input-dark" />
                </div>
              </div>
              <div>
                <label className="label-dark">Description</label>
                <textarea value={form.description} onChange={e=>setForm((f:any)=>({...f,description:e.target.value}))} rows={2} className="input-dark resize-none" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div><label className="label-dark">Price (Rs)</label><input type="number" value={form.price} onChange={e=>setForm((f:any)=>({...f,price:e.target.value}))} className="input-dark" /></div>
                <div><label className="label-dark">Compare Price</label><input type="number" value={form.compareAtPrice} onChange={e=>setForm((f:any)=>({...f,compareAtPrice:e.target.value}))} className="input-dark" placeholder="Optional" /></div>
                <div><label className="label-dark">Stock</label><input type="number" value={form.stock} onChange={e=>setForm((f:any)=>({...f,stock:e.target.value}))} className="input-dark" /></div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="label-dark !mb-0">Category</label>
                  <button type="button" onClick={openCreateCat} className="text-xs font-semibold text-gold-400 hover:underline flex items-center gap-1"><FolderPlus className="h-3.5 w-3.5" /> New</button>
                </div>
                <select value={form.categoryId} onChange={e=>setForm((f:any)=>({...f,categoryId:e.target.value}))} className="input-dark">
                  <option value="">Select category</option>
                  {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label-dark">SKU</label><input value={form.sku} onChange={e=>setForm((f:any)=>({...f,sku:e.target.value}))} className="input-dark" placeholder="Optional" /></div>
                <div><label className="label-dark">Tags (comma-separated)</label><input value={form.tags} onChange={e=>setForm((f:any)=>({...f,tags:e.target.value}))} className="input-dark" placeholder="new, bestseller, signature" /></div>
              </div>
              <div className="flex flex-wrap gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-white"><input type="checkbox" checked={form.isAvailable} onChange={e=>setForm((f:any)=>({...f,isAvailable:e.target.checked}))} className="h-4 w-4 accent-gold-500" /> Available</label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-white"><input type="checkbox" checked={form.isFeatured} onChange={e=>setForm((f:any)=>({...f,isFeatured:e.target.checked}))} className="h-4 w-4 accent-gold-500" /> Featured</label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-heat"><Flame className="h-4 w-4" strokeWidth={2} /><input type="checkbox" checked={form.hasHeatLevel} onChange={e=>setForm((f:any)=>({...f,hasHeatLevel:e.target.checked}))} className="h-4 w-4 accent-heat" /> Has Heat Levels</label>
              </div>
              <div>
                <label className="label-dark">Images</label>
                {form.images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {form.images.map((img:string,i:number) => (
                      <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl border border-dark-300">
                        <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                        <button onClick={()=>removeImage(i)} className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-dark-600/80 text-white"><X className="h-3 w-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-dark-300 hover:border-gold-500 transition-colors">
                    {imgUploading ? <Loader2 className="h-5 w-5 animate-spin text-gold-400" /> : <ImagePlus className="h-5 w-5 text-dark-200" />}
                    <span className="mt-1 text-[9px] font-medium text-dark-200">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e=>{if(e.target.files?.[0]) uploadImage(e.target.files[0]);}} />
                  </label>
                  <button type="button" onClick={()=>setShowUrl(v=>!v)} className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 border-dashed border-dark-300 hover:border-teal-500 transition-colors">
                    <LinkIcon className="h-5 w-5 text-dark-200" />
                    <span className="mt-1 text-[9px] font-medium text-dark-200">Paste URL</span>
                  </button>
                </div>
                {showUrl && (
                  <div className="mt-2 flex gap-2">
                    <input value={urlInput} onChange={e=>setUrlInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addUrl())} placeholder="https://…" className="input-dark flex-1 text-xs" />
                    <button onClick={addUrl} className="btn-teal px-4 text-xs py-2">Add</button>
                  </div>
                )}
                {uploadError && <div className="mt-2 rounded-xl border border-gold-700 bg-gold-900/20 p-3 text-xs text-gold-300">{uploadError}</div>}
              </div>
              {error && <p className="text-sm text-heat">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button onClick={saveProduct} disabled={saving} className="btn-gold flex-1">
                  {saving&&<Loader2 className="h-4 w-4 animate-spin" />} {editing?'Save Changes':'Create Product'}
                </button>
                <button onClick={()=>setModal(false)} className="btn-outline-gold px-6">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {catModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-dark-600/70 p-0 sm:p-4 backdrop-blur-sm">
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-dark-500 border border-dark-300 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg text-white">{editingCat?'EDIT CATEGORY':'NEW CATEGORY'}</h2>
              <button onClick={()=>setCatModal(false)} className="rounded-xl p-2 hover:bg-dark-400 text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="label-dark">Name</label><input value={catForm.name} onChange={e=>setCatForm((f:any)=>({...f,name:e.target.value,slug:slugify(e.target.value)}))} className="input-dark" placeholder="e.g. Bird Menu" autoFocus /></div>
              <div><label className="label-dark">Slug</label><input value={catForm.slug} onChange={e=>setCatForm((f:any)=>({...f,slug:e.target.value}))} className="input-dark" /></div>
              <div><label className="label-dark">Description</label><textarea value={catForm.description} onChange={e=>setCatForm((f:any)=>({...f,description:e.target.value}))} rows={2} className="input-dark resize-none" placeholder="Optional" /></div>
              <div><label className="label-dark">Sort Position</label><input type="number" value={catForm.position} onChange={e=>setCatForm((f:any)=>({...f,position:e.target.value}))} className="input-dark" /></div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white"><input type="checkbox" checked={catForm.isActive} onChange={e=>setCatForm((f:any)=>({...f,isActive:e.target.checked}))} className="h-4 w-4 accent-gold-500" /> Active</label>
              {catError && <p className="text-sm text-heat">{catError}</p>}
              <div className="flex gap-3">
                <button onClick={saveCat} disabled={savingCat} className="btn-gold flex-1">{savingCat&&<Loader2 className="h-4 w-4 animate-spin" />} {editingCat?'Save':'Create'}</button>
                <button onClick={()=>setCatModal(false)} className="btn-outline-gold px-4">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}