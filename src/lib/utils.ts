import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return 'Rs. ' + price.toLocaleString('en-PK');
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function generateOrderNumber(): string {
  return '7S-' + Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substring(2, 5).toUpperCase();
}

export const ORDER_STATUSES = [
  'PENDING','CONFIRMED','PREPARING','OUT_FOR_DELIVERY','DELIVERED','CANCELLED',
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number];

export const STATUS_LABELS: Record<string, string> = {
  PENDING:          'Pending',
  CONFIRMED:        'Confirmed',
  PREPARING:        'Preparing',
  OUT_FOR_DELIVERY: 'On the way',
  DELIVERED:        'Delivered',
  CANCELLED:        'Cancelled',
};

export const STATUS_COLORS: Record<string, string> = {
  PENDING:          'border-amber-700 bg-amber-900/30 text-amber-400',
  CONFIRMED:        'border-teal-700  bg-teal-900/30  text-teal-400',
  PREPARING:        'border-gold-700  bg-gold-900/30  text-gold-400',
  OUT_FOR_DELIVERY: 'border-blue-700  bg-blue-900/30  text-blue-400',
  DELIVERED:        'border-green-700 bg-green-900/30 text-green-400',
  CANCELLED:        'border-red-700   bg-red-900/30   text-red-400',
};