import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  console.log('Seeding Seven Sides…');

  // Admin
  const admin = await db.user.upsert({
    where:  { email: process.env.ADMIN_EMAIL ?? 'admin@sevensides.pk' },
    create: { name:'Seven Sides Admin', email:process.env.ADMIN_EMAIL??'admin@sevensides.pk', password:await bcrypt.hash(process.env.ADMIN_PASSWORD??'SevenAdmin2026!',12), role:'ADMIN' },
    update: {},
  });
  console.log('Admin:', admin.email);

  // Settings
  await db.siteSettings.upsert({ where:{id:'settings'}, create:{id:'settings'}, update:{} });

  // Branches
  const branches = [
    { id:'dha-p5',    name:'DHA Phase 5',       address:'15-A Street 2, Sector A, Phase 5, D.H.A, Lahore', phone:'+92 319 6481040', hours:'12:00 PM – 12:00 AM', note:null,                  mapsUrl:'https://maps.google.com/?q=Seven+Sides+DHA+Phase+5+Lahore', isActive:true, position:0 },
    { id:'cantt',     name:'Girja Chowk Cantt', address:'Bagh Ali Road, Girja Chowk, Cantt, Lahore',        phone:'+92 322 7694926', hours:'12:00 PM – 01:00 AM', note:'Takeaway & Delivery only', mapsUrl:'https://maps.google.com/?q=Seven+Sides+Girja+Chowk+Lahore', isActive:true, position:1 },
    { id:'lake-city', name:'Lake City',          address:'Lake City, Lahore',                                 phone:null,              hours:'12:00 PM – 01:00 AM', note:null,                  mapsUrl:'https://maps.google.com/?q=Seven+Sides+Lake+City+Lahore',  isActive:true, position:2 },
    { id:'model-town',name:'Model Town',          address:'Model Town, Lahore',                               phone:null,              hours:'12:00 PM – 01:00 AM', note:'Newest location',     mapsUrl:'https://maps.google.com/?q=Seven+Sides+Model+Town+Lahore', isActive:true, position:3 },
  ];
  for (const b of branches) { await db.branch.upsert({ where:{ id:b.id }, create:b, update:b }); }
  console.log('Branches seeded');

  // Categories
  const cats = [
    { name:'Bird Menu',   slug:'bird-menu',   position:0, isActive:true },
    { name:'Sliders',     slug:'sliders',     position:1, isActive:true },
    { name:'Tenders',     slug:'tenders',     position:2, isActive:true },
    { name:'Wraps',       slug:'wraps',       position:3, isActive:true },
    { name:'Fries',       slug:'fries',       position:4, isActive:true },
    { name:'Shakes',      slug:'shakes',      position:5, isActive:true },
    { name:'SS Treats',   slug:'ss-treats',   position:6, isActive:true },
    { name:'Extras',      slug:'extras',      position:7, isActive:true },
    { name:'Drinks',      slug:'drinks',      position:8, isActive:true },
  ];
  const catMap: Record<string, string> = {};
  for (const c of cats) {
    const cat = await db.category.upsert({ where:{ slug:c.slug }, create:c, update:c });
    catMap[c.slug] = cat.id;
  }
  console.log('Categories seeded');

  // Products
  const products = [
    // Bird Menu
    { name:'The Sando', slug:'the-sando', description:'House Bread, Hot Chicken Tenders, Cheese Fondue & Comeback Sauce', price:975, categorySlug:'bird-menu', hasHeatLevel:true, isFeatured:true, tags:['signature','bestseller'] },
    // Sliders
    { name:'Hot Chicken Slider', slug:'hot-chicken-slider', description:'House Bun, Hot Chicken, Coleslaw, Pickles, Cheese & Comeback Sauce', price:875, categorySlug:'sliders', hasHeatLevel:true, isFeatured:true, tags:['bestseller'] },
    { name:'Honey Sriracha Slider', slug:'honey-sriracha-slider', description:'House Bun, Crispy Chicken Fillet, Lettuce, Pickles, Cheese & Honey Sriracha Sauce', price:875, categorySlug:'sliders', hasHeatLevel:false, isFeatured:false, tags:['new'] },
    { name:'Hot Honey Ranch Slider', slug:'hot-honey-ranch-slider', description:'House Bun, Crispy Chicken Fillet, Lettuce, Cheese & Honey Ranch Mayo', price:875, categorySlug:'sliders', hasHeatLevel:false, isFeatured:false, tags:['new'] },
    { name:'Caesar Chicken Slider', slug:'caesar-chicken-slider', description:'House Bun, Crispy Chicken Fillet, Lettuce, Cheese & Secret Sauce', price:875, categorySlug:'sliders', hasHeatLevel:false, isFeatured:false, tags:['new'] },
    // Tenders
    { name:'Red Tenders (5 Pcs)', slug:'red-tenders', description:'5 Pcs of Tenders Served With Fries & Comeback Sauce. Choose your heat level.', price:1245, categorySlug:'tenders', hasHeatLevel:true, isFeatured:true, tags:['signature','bestseller'] },
    { name:'Crunchy Tenders (5 Pcs)', slug:'crunchy-tenders', description:'5 Pcs of Crunchy Tenders Served With Fries & Comeback Sauce', price:1245, categorySlug:'tenders', hasHeatLevel:false, isFeatured:true, tags:['bestseller'] },
    // Wraps
    { name:'Crispy Chicken Wrap', slug:'crispy-chicken-wrap', description:'Crispy Chicken Tenders, Jalapeño, Lettuce & Secret Sauce', price:875, categorySlug:'wraps', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Americana Chicken Wrap', slug:'americana-chicken-wrap', description:'Grilled Chicken, Sauté Veggies & Secret Sauce', price:825, categorySlug:'wraps', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Sriracha Chicken Wrap', slug:'sriracha-chicken-wrap', description:'Grilled Chicken, Lettuce, Sauté Veggies, Cheese & Secret Sauce', price:825, categorySlug:'wraps', hasHeatLevel:false, isFeatured:false, tags:[] },
    // Fries
    { name:'Loaded Waffle Fries', slug:'loaded-waffle-fries', description:'Criss Cross Potato Fries, Hot Chicken, Pickles, Parsley & Sauce', price:895, categorySlug:'fries', hasHeatLevel:false, isFeatured:true, tags:['bestseller'] },
    // Shakes
    { name:'Choco Berry Shake', slug:'choco-berry-shake', description:'Hand spun chocolate berry shake', price:695, categorySlug:'shakes', hasHeatLevel:false, isFeatured:false, tags:['new'] },
    { name:'Chocolate Shake', slug:'chocolate-shake', description:'Hand spun chocolate shake', price:695, categorySlug:'shakes', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Strawberry Shake', slug:'strawberry-shake', description:'Hand spun strawberry shake', price:695, categorySlug:'shakes', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Cookies & Cream Shake', slug:'cookies-cream-shake', description:'Hand spun cookies & cream shake', price:695, categorySlug:'shakes', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Vanilla Shake', slug:'vanilla-shake', description:'Hand spun vanilla shake', price:695, categorySlug:'shakes', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Salted Caramel Shake', slug:'salted-caramel-shake', description:'Hand spun salted caramel shake', price:695, categorySlug:'shakes', hasHeatLevel:false, isFeatured:false, tags:[] },
    // SS Treats
    { name:'Toastie', slug:'toastie', description:'Choose your flavour: Nutella, Strawberry or Dark Choc', price:675, categorySlug:'ss-treats', hasHeatLevel:false, isFeatured:false, tags:['new'] },
    { name:'Churros', slug:'churros', description:'5 Churros Sticks Dusted With Cinnamon Sugar & 1 Dip (Nutella / Caramel / Dark Choc)', price:550, categorySlug:'ss-treats', hasHeatLevel:false, isFeatured:false, tags:[] },
    // Extras
    { name:'Crinkle Fries', slug:'crinkle-fries', description:'Classic crinkle-cut fries', price:350, categorySlug:'extras', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Waffle Fries', slug:'waffle-fries', description:'Golden waffle fries', price:350, categorySlug:'extras', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Mac & Cheese', slug:'mac-cheese', description:'Creamy mac & cheese', price:500, categorySlug:'extras', hasHeatLevel:false, isFeatured:false, tags:[] },
    // Drinks
    { name:'Pepsi', slug:'pepsi', description:'330ml can', price:120, categorySlug:'drinks', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Diet Pepsi', slug:'diet-pepsi', description:'330ml can', price:120, categorySlug:'drinks', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'7UP', slug:'7up', description:'330ml can', price:120, categorySlug:'drinks', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Mirinda', slug:'mirinda', description:'330ml can', price:120, categorySlug:'drinks', hasHeatLevel:false, isFeatured:false, tags:[] },
    { name:'Water', slug:'water', description:'500ml bottle', price:100, categorySlug:'drinks', hasHeatLevel:false, isFeatured:false, tags:[] },
  ];

  for (const p of products) {
    const { categorySlug, ...data } = p;
    await db.product.upsert({
      where:  { slug: data.slug },
      create: { ...data, categoryId:catMap[categorySlug], stock:100, images:[], compareAtPrice:null },
      update: { ...data, categoryId:catMap[categorySlug] },
    });
  }
  console.log('Products seeded:', products.length);

  // Coupon
  await db.coupon.upsert({ where:{ code:'SEVENSIDES10' }, create:{ code:'SEVENSIDES10', type:'PERCENTAGE', value:10, minOrderAmount:1500, isActive:true }, update:{} });
  console.log('Coupon SEVENSIDES10 created');

  console.log('Seed complete!');
}

main().then(() => db.$disconnect()).catch(e => { console.error(e); db.$disconnect(); process.exit(1); });
