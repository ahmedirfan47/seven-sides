import { Suspense } from 'react';
import CheckoutInner from './CheckoutInner';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{backgroundColor:'#0A0A0A',minHeight:'100vh',paddingTop:'5rem'}} className="flex items-center justify-center"><div className="text-dark-100 text-sm">Loading checkout…</div></div>}>
      <CheckoutInner />
    </Suspense>
  );
}