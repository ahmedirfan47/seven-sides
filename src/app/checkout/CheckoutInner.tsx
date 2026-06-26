'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { checkoutSchema } from '@/lib/validations';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { BRANCHES } from '@/lib/constants';
import { Tag, Loader2, MapPin, Package, Banknote, CreditCard, Flame } from 'lucide-react';
import { useSession } from '@/lib/session-context';
import { HEAT_LEVELS } from '@/lib/constants';

type CheckoutForm = z.infer<typeof checkoutSchema>;

const PAYMENT_OPTS = [
  { value:'COD',           label:'Cash on Delivery', icon:Banknote,   desc:'Pay when order arrives'  },
  { value:'BANK_TRANSFER', label:'Bank Transfer',    icon:CreditCard, desc:'Transfer before confirm' },
  { value:'CARD',          label:'Card (at branch)', icon:CreditCard, desc:'Swipe at pickup'          },
];

export default function CheckoutInner() {
  const router      = useRouter();
  const { session } = useSession();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal  = getSubtotal();

  const [deliveryFee,  setDeliveryFee]  = useState(200);
  const [freeDelMin,   setFreeDelMin]   = useState(2500);
  const [couponInput,  setCouponInput]  = useState('');
  const [couponStatus, setCouponStatus] = useState<{ valid:boolean; message:string; discount:number } | null>(null);
  const [serverError,  setServerError]  = useState('');
  const [mounted,      setMounted]      = useState(false);

  useEffect(() => setMounted(true), []);

  const { register, handleSubmit, watch, setValue, formState:{ errors, isSubmitting } } =
    useForm<CheckoutForm>({ resolver:zodResolver(checkoutSchema), defaultValues:{ deliveryType:'delivery', paymentMethod:'COD', city:'Lahore' } });

  const deliveryType  = watch('deliveryType');
  const paymentMethod = watch('paymentMethod');

  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d => {
      if (d?.deliveryFee !== undefined)  setDeliveryFee(d.deliveryFee);
      if (d?.freeDeliveryMin !== undefined) setFreeDelMin(d.freeDeliveryMin);
    }).catch(()=>{});
  }, []);

  useEffect(() => {
    if (session?.user) { setValue('customerName', session.user.name ?? ''); setValue('customerEmail', session.user.email ?? ''); }
  }, [session, setValue]);

  if (!mounted) return null;
  if (items.length === 0) return (
    <div style={{backgroundColor:'#0A0A0A',minHeight:'100vh',paddingTop:'5rem'}} className="flex items-center justify-center">
      <div className="text-center"><h1 className="font-display text-3xl text-white">CART IS EMPTY</h1><Link href="/menu" className="btn-gold mt-8 inline-flex">Browse Menu</Link></div>
    </div>
  );

  const discount  = couponStatus?.valid ? couponStatus.discount : 0;
  const effDelFee = deliveryType==='pickup'||deliveryType==='dine-in' ? 0 : subtotal>=freeDelMin ? 0 : deliveryFee;
  const total     = Math.max(0, subtotal - discount) + effDelFee;

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    try {
      const res  = await fetch('/api/coupons/validate',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code:couponInput, subtotal }) });
      const data = await res.json();
      if (res.ok) { setCouponStatus({ valid:true, message:data.message, discount:data.discount }); setValue('couponCode', couponInput.toUpperCase()); }
      else        { setCouponStatus({ valid:false, message:data.error, discount:0 }); setValue('couponCode', undefined); }
    } catch { setCouponStatus({ valid:false, message:'Could not validate coupon', discount:0 }); }
  };

  const onSubmit = async (data: CheckoutForm) => {
    setServerError('');
    try {
      const res    = await fetch('/api/orders',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ...data, items:items.map(i=>({ productId:i.productId, name:i.name, image:i.image, price:i.price, quantity:i.quantity, heatLevel:i.heatLevel })) }) });
      const result = await res.json();
      if (!res.ok) { setServerError(result.error ?? 'Something went wrong.'); return; }
      clearCart(); router.push('/order/' + result.orderNumber);
    } catch { setServerError('Something went wrong. Please try again.'); }
  };

  const heatLabel = (h: string) => HEAT_LEVELS.find(l => l.id === h)?.label ?? h;

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-6xl py-8 sm:py-12">
        <h1 className="mb-8 font-display text-3xl text-white sm:text-4xl">CHECKOUT</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start" noValidate>
          <div className="space-y-5">

            {/* Contact */}
            <div className="card-dark rounded-2xl p-5 sm:p-6">
              <h2 className="mb-4 font-display text-xl text-white">CONTACT DETAILS</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-dark">Full Name</label>
                  <input {...register('customerName')} className="input-dark" placeholder="Your name" autoComplete="name" />
                  {errors.customerName && <p className="mt-1 text-xs text-heat">{errors.customerName.message}</p>}
                </div>
                <div>
                  <label className="label-dark">Email</label>
                  <input {...register('customerEmail')} type="email" className="input-dark" placeholder="you@example.com" autoComplete="email" />
                  {errors.customerEmail && <p className="mt-1 text-xs text-heat">{errors.customerEmail.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label-dark">Phone</label>
                  <input {...register('customerPhone')} type="tel" className="input-dark" placeholder="03XX XXXXXXX" autoComplete="tel" />
                  {errors.customerPhone && <p className="mt-1 text-xs text-heat">{errors.customerPhone.message}</p>}
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="card-dark rounded-2xl p-5 sm:p-6">
              <h2 className="mb-4 font-display text-xl text-white">ORDER TYPE</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { value:'delivery', label:'Delivery',  icon:MapPin,   desc:'Home delivery' },
                  { value:'pickup',   label:'Pickup',    icon:Package,  desc:'Free, collect in-store' },
                  { value:'dine-in',  label:'Dine In',   icon:MapPin,   desc:'At the branch' },
                ].map(opt => (
                  <label key={opt.value} className={cn('flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all text-center min-h-[80px] justify-center',
                    deliveryType===opt.value ? 'border-gold-500 bg-gold-500/10' : 'border-dark-300 hover:border-dark-200')}>
                    <input type="radio" value={opt.value} {...register('deliveryType')} className="sr-only" />
                    <opt.icon className={cn('h-5 w-5', deliveryType===opt.value?'text-gold-400':'text-dark-200')} strokeWidth={1.5} />
                    <p className={cn('text-sm font-semibold', deliveryType===opt.value?'text-gold-400':'text-white')}>{opt.label}</p>
                    <p className="text-xs text-dark-200 leading-tight">{opt.desc}</p>
                  </label>
                ))}
              </div>

              {deliveryType==='delivery' ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="label-dark">Street Address</label>
                    <input {...register('address')} className="input-dark" placeholder="House #, Street, Block" autoComplete="street-address" />
                    {errors.address && <p className="mt-1 text-xs text-heat">{errors.address.message}</p>}
                  </div>
                  <div>
                    <label className="label-dark">Area</label>
                    <input {...register('area')} className="input-dark" placeholder="e.g. DHA Phase 5" />
                  </div>
                  <div>
                    <label className="label-dark">City</label>
                    <input {...register('city')} className="input-dark" defaultValue="Lahore" />
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <label className="label-dark">Branch</label>
                  <select {...register('branchId')} className="input-dark">
                    <option value="">Select branch</option>
                    {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name} — {b.hours}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="card-dark rounded-2xl p-5 sm:p-6">
              <h2 className="mb-4 font-display text-xl text-white">PAYMENT</h2>
              <div className="space-y-2.5">
                {PAYMENT_OPTS.map(opt => (
                  <label key={opt.value} className={cn('flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all min-h-[64px]',
                    paymentMethod===opt.value?'border-gold-500 bg-gold-500/10':'border-dark-300 hover:border-dark-200')}>
                    <input type="radio" value={opt.value} {...register('paymentMethod')} className="sr-only" />
                    <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors',
                      paymentMethod===opt.value?'bg-gold-500 text-dark-600':'bg-dark-400 text-dark-100')}>
                      <opt.icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{opt.label}</p>
                      <p className="text-xs text-dark-100">{opt.desc}</p>
                    </div>
                    {paymentMethod===opt.value && <div className="h-4 w-4 shrink-0 rounded-full bg-gold-500 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-dark-600" /></div>}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="card-dark rounded-2xl p-5 sm:p-6">
              <label className="label-dark">Order Notes <span className="font-normal text-dark-200">(optional)</span></label>
              <textarea {...register('notes')} rows={3} className="input-dark resize-none" placeholder="Special requests, less sauce, ring the bell…" />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24">
            <div className="card-dark rounded-2xl p-5 sm:p-6">
              <h2 className="mb-4 font-display text-xl text-white">ORDER SUMMARY</h2>

              <div className="max-h-52 space-y-3 overflow-y-auto pr-1 scrollbar-hide">
                {items.map(item => (
                  <div key={`${item.productId}-${item.heatLevel}`} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-dark-400">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-dark-100">Qty {item.quantity}</p>
                        {item.heatLevel !== 'none' && (
                          <span className="text-[10px] text-heat flex items-center gap-0.5">
                            <Flame className="h-2.5 w-2.5" strokeWidth={2} /> {heatLabel(item.heatLevel)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white shrink-0">{formatPrice(item.price*item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mt-4 border-t border-dark-300 pt-4">
                <label className="label-dark">Promo Code</label>
                <div className="flex gap-2">
                  <input value={couponInput} onChange={e => setCouponInput(e.target.value)}
                    onKeyDown={e => e.key==='Enter' && (e.preventDefault(), applyCoupon())}
                    placeholder="e.g. SEVENSIDES10" className="input-dark" />
                  <button type="button" onClick={applyCoupon} className="btn-outline-gold px-4 shrink-0">
                    <Tag className="h-4 w-4" />
                  </button>
                </div>
                {couponStatus && (
                  <p className={cn('mt-2 text-xs font-semibold', couponStatus.valid?'text-teal-400':'text-heat')}>
                    {couponStatus.message}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2 border-t border-dark-300 pt-4 text-sm">
                <div className="flex justify-between text-dark-100"><span>Subtotal</span><span className="text-white font-medium">{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-teal-400"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
                <div className="flex justify-between text-dark-100"><span>Delivery</span><span className="text-white font-medium">{effDelFee===0?'Free':formatPrice(effDelFee)}</span></div>
                <div className="flex justify-between border-t border-dark-300 pt-2 text-base font-bold text-white">
                  <span>Total</span><span className="text-gold-400">{formatPrice(total)}</span>
                </div>
              </div>

              {serverError && <div className="mt-3 rounded-xl border border-heat/30 bg-heat/10 px-3 py-2.5 text-sm text-heat">{serverError}</div>}

              <button type="submit" disabled={isSubmitting} className="btn-gold mt-4 w-full py-4 text-base">
                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing…</> : `Place Order · ${formatPrice(total)}`}
              </button>
              <p className="mt-2 text-center text-xs text-dark-200">By placing this order you agree to our terms.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}