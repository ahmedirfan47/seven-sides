import { z } from 'zod';

export const loginSchema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone:    z.string().optional(),
});

export const checkoutSchema = z.object({
  customerName:  z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email required'),
  customerPhone: z.string().min(10, 'Valid phone required'),
  deliveryType:  z.enum(['delivery','pickup','dine-in']),
  address:       z.string().optional(),
  area:          z.string().optional(),
  city:          z.string().optional(),
  branchId:      z.string().optional(),
  paymentMethod: z.enum(['COD','BANK_TRANSFER','CARD']),
  notes:         z.string().optional(),
  couponCode:    z.string().optional(),
});

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Valid email required'),
  phone:   z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const productSchema = z.object({
  name:           z.string().min(1, 'Name is required'),
  slug:           z.string().min(1, 'Slug is required'),
  description:    z.string().min(1, 'Description is required'),
  price:          z.number().int().positive(),
  compareAtPrice: z.number().int().optional().nullable(),
  images:         z.array(z.string()),
  categoryId:     z.string().min(1, 'Category is required'),
  hasHeatLevel:   z.boolean().default(false),
  isFeatured:     z.boolean().default(false),
  isAvailable:    z.boolean().default(true),
  stock:          z.number().int().min(0),
  sku:            z.string().optional().nullable(),
  tags:           z.array(z.string()),
});

export const categorySchema = z.object({
  name:        z.string().min(1, 'Name is required'),
  slug:        z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image:       z.string().optional(),
  position:    z.number().int().min(0).default(0),
  isActive:    z.boolean().default(true),
});

export const couponSchema = z.object({
  code:           z.string().min(1),
  type:           z.enum(['PERCENTAGE','FIXED']),
  value:          z.number().int().positive(),
  minOrderAmount: z.number().int().min(0).default(0),
  maxUses:        z.number().int().positive().optional().nullable(),
  isActive:       z.boolean().default(true),
  expiresAt:      z.string().optional().nullable(),
});
export const bannerSchema = z.object({
  type:     z.enum(['HERO', 'PROMO', 'GALLERY']),
  title:    z.string().optional(),
  subtitle: z.string().optional(),
  image:    z.string().min(1, 'Image is required'),
  link:     z.string().optional(),
  position: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});