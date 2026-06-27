import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

const IMGS = {
  sando:         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
  slider:        'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800',
  sliderH:       'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800',
  sliderR:       'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800',
  sliderC:       'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800',
  tenders:       'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800',
  crunchy:       'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800',
  wrap1:         'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=800',
  wrap2:         'https://images.unsplash.com/photo-1561050501-38fecab65c0b?q=80&w=800',
  wrap3:         'https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800',
  loadedFries:   'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800',
  shakeChoco:    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
  shakeStraw:    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=800',
  shakeCream:    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800',
  shakeVan:      'https://images.unsplash.com/photo-1619474987890-910c3f9eab17?q=80&w=800',
  shakeCar:      'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=800',
  toastie:       'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800',
  churros:       'https://images.unsplash.com/photo-1589093569870-82e6d2b1d1b3?q=80&w=800',
  fries:         'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=800',
  waffle:        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800',
  mac:           'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800',
  drink:         'https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=800',
  water:         'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800',
};

async function main() {
  console.log('Seeding Seven Sides…');

  const adminEmail    = process.env.ADMIN_EMAIL    ?? 'admin@sevensides.pk';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'SevenAdmin2026!';
  const adminName     = process.env.ADMIN_NAME     ?? 'Seven Sides Admin';

  await db.user.upsert({
    where: { email: adminEmail },
    create: { name:adminName, email:adminEmail, password:await bcrypt.hash(adminPassword,12), role:'ADMIN' },
    update: {},
  });

  await db.siteSettings.upsert({ where:{ id:'settings' }, create:{ id:'settings' }, update:{} });

  const bs = [
    { id:'dha-p5',    name:'DHA Phase 5',      address:'15-A Street 2, Sector A, Phase 5, D.H.A, Lahore', phone:'+92 319 6481040', hours:'12:00 PM – 12:00 AM', note:null,                    mapsUrl:'https://maps.google.com/?q=Seven+Sides+DHA+Phase+5+Lahore',    isActive:true, position:0 },
    { id:'cantt',     name:'Girja Chowk Cantt', address:'Bagh Ali Road, Girja Chowk, Cantt, Lahore',        phone:'+92 322 7694926', hours:'12:00 PM – 01:00 AM', note:'Takeaway & Delivery only',mapsUrl:'https://maps.google.com/?q=Seven+Sides+Girja+Chowk+Cantt+Lahore',isActive:true, position:1 },
    { id:'lake-city', name:'Lake City',          address:'Lake City, Lahore',                                 phone:'+92 370 7743936', hours:'12:00 PM – 01:00 AM', note:null,                    mapsUrl:'https://maps.google.com/?q=Seven+Sides+Lake+City+Lahore',      isActive:true, position:2 },
    { id:'mdl-town',  name:'Model Town',          address:'Model Town, Lahore',                               phone:null,              hours:'12:00 PM – 01:00 AM', note:'Newest location',       mapsUrl:'https://maps.google.com/?q=Seven+Sides+Model+Town+Lahore',     isActive:true, position:3 },
  ];
  for (const b of bs) await db.branch.upsert({ where:{ id:b.id }, create:b, update:b });

  const cats = [
    {name:'Bird Menu',slug:'bird-menu',position:0}, {name:'Sliders',slug:'sliders',position:1},
    {name:'Tenders',slug:'tenders',position:2},     {name:'Wraps',slug:'wraps',position:3},
    {name:'Fries',slug:'fries',position:4},          {name:'Shakes',slug:'shakes',position:5},
    {name:'SS Treats',slug:'ss-treats',position:6}, {name:'Extras',slug:'extras',position:7},
    {name:'Drinks',slug:'drinks',position:8},
  ];
  const catMap: Record<string,string> = {};
  for (const c of cats) {
    const r = await db.category.upsert({ where:{slug:c.slug}, create:{...c,isActive:true}, update:c });
    catMap[c.slug] = r.id;
  }

  const products = [
    {name:'The Sando',slug:'the-sando',desc:'House Bread, Hot Chicken Tenders, Cheese Fondue & Comeback Sauce.',price:975,cat:'bird-menu',heat:true,feat:true,tags:['signature','bestseller'],img:IMGS.sando},
    {name:'Hot Chicken Slider',slug:'hot-chicken-slider',desc:'House Bun, Hot Chicken, Coleslaw, Pickles, Cheese & Comeback Sauce.',price:875,cat:'sliders',heat:true,feat:true,tags:['bestseller'],img:IMGS.slider},
    {name:'Honey Sriracha Slider',slug:'honey-sriracha-slider',desc:'House Bun, Crispy Chicken, Lettuce, Pickles, Cheese & Honey Sriracha.',price:875,cat:'sliders',heat:false,feat:false,tags:['new'],img:IMGS.sliderH},
    {name:'Hot Honey Ranch Slider',slug:'hot-honey-ranch-slider',desc:'House Bun, Crispy Chicken, Lettuce, Cheese & Honey Ranch Mayo.',price:875,cat:'sliders',heat:false,feat:false,tags:['new'],img:IMGS.sliderR},
    {name:'Caesar Chicken Slider',slug:'caesar-chicken-slider',desc:'House Bun, Crispy Chicken, Lettuce, Cheese & Secret Sauce.',price:875,cat:'sliders',heat:false,feat:false,tags:['new'],img:IMGS.sliderC},
    {name:'Red Tenders (5 Pcs)',slug:'red-tenders',desc:'5 Pcs of Tenders Served With Fries & Comeback Sauce. Choose your heat level.',price:1245,cat:'tenders',heat:true,feat:true,tags:['signature','bestseller'],img:IMGS.tenders},
    {name:'Crunchy Tenders (5 Pcs)',slug:'crunchy-tenders',desc:'5 Pcs of Crunchy Tenders Served With Fries & Comeback Sauce.',price:1245,cat:'tenders',heat:false,feat:true,tags:['bestseller'],img:IMGS.crunchy},
    {name:'Crispy Chicken Wrap',slug:'crispy-chicken-wrap',desc:'Crispy Chicken Tenders, Jalapeño, Lettuce & Secret Sauce.',price:875,cat:'wraps',heat:false,feat:false,tags:[],img:IMGS.wrap1},
    {name:'Americana Chicken Wrap',slug:'americana-chicken-wrap',desc:'Grilled Chicken, Sauté Veggies & Secret Sauce.',price:825,cat:'wraps',heat:false,feat:false,tags:[],img:IMGS.wrap2},
    {name:'Sriracha Chicken Wrap',slug:'sriracha-chicken-wrap',desc:'Grilled Chicken, Lettuce, Sauté Veggies, Cheese & Secret Sauce.',price:825,cat:'wraps',heat:false,feat:false,tags:[],img:IMGS.wrap3},
    {name:'Loaded Waffle Fries',slug:'loaded-waffle-fries',desc:'Criss Cross Potato Fries, Hot Chicken, Pickles, Parsley & Sauce.',price:895,cat:'fries',heat:false,feat:true,tags:['bestseller'],img:IMGS.loadedFries},
    {name:'Choco Berry Shake',slug:'choco-berry-shake',desc:'Hand spun chocolate berry shake.',price:695,cat:'shakes',heat:false,feat:false,tags:['new'],img:IMGS.shakeChoco},
    {name:'Chocolate Shake',slug:'chocolate-shake',desc:'Hand spun chocolate shake.',price:695,cat:'shakes',heat:false,feat:false,tags:[],img:IMGS.shakeChoco},
    {name:'Strawberry Shake',slug:'strawberry-shake',desc:'Hand spun strawberry shake.',price:695,cat:'shakes',heat:false,feat:false,tags:[],img:IMGS.shakeStraw},
    {name:'Cookies & Cream Shake',slug:'cookies-cream-shake',desc:'Hand spun cookies & cream shake.',price:695,cat:'shakes',heat:false,feat:false,tags:[],img:IMGS.shakeCream},
    {name:'Vanilla Shake',slug:'vanilla-shake',desc:'Hand spun vanilla shake.',price:695,cat:'shakes',heat:false,feat:false,tags:[],img:IMGS.shakeVan},
    {name:'Salted Caramel Shake',slug:'salted-caramel-shake',desc:'Hand spun salted caramel shake.',price:695,cat:'shakes',heat:false,feat:false,tags:[],img:IMGS.shakeCar},
    {name:'Toastie',slug:'toastie',desc:'Choose your flavour: Nutella, Strawberry or Dark Choc.',price:675,cat:'ss-treats',heat:false,feat:false,tags:['new'],img:IMGS.toastie},
    {name:'Churros',slug:'churros',desc:'5 Churros Sticks with Cinnamon Sugar & 1 Dip (Nutella / Caramel / Dark Choc).',price:550,cat:'ss-treats',heat:false,feat:false,tags:[],img:IMGS.churros},
    {name:'Crinkle Fries',slug:'crinkle-fries',desc:'Classic crinkle-cut fries.',price:350,cat:'extras',heat:false,feat:false,tags:[],img:IMGS.fries},
    {name:'Waffle Fries',slug:'waffle-fries',desc:'Golden waffle fries.',price:350,cat:'extras',heat:false,feat:false,tags:[],img:IMGS.waffle},
    {name:'Mac & Cheese',slug:'mac-cheese',desc:'Creamy mac & cheese.',price:500,cat:'extras',heat:false,feat:false,tags:[],img:IMGS.mac},
    {name:'Pepsi',slug:'pepsi',desc:'330ml can.',price:120,cat:'drinks',heat:false,feat:false,tags:[],img:IMGS.drink},
    {name:'Diet Pepsi',slug:'diet-pepsi',desc:'330ml can.',price:120,cat:'drinks',heat:false,feat:false,tags:[],img:IMGS.drink},
    {name:'7UP',slug:'7up',desc:'330ml can.',price:120,cat:'drinks',heat:false,feat:false,tags:[],img:IMGS.drink},
    {name:'Mirinda',slug:'mirinda',desc:'330ml can.',price:120,cat:'drinks',heat:false,feat:false,tags:[],img:IMGS.drink},
    {name:'Water',slug:'water',desc:'500ml bottle.',price:100,cat:'drinks',heat:false,feat:false,tags:[],img:IMGS.water},
  ];

  for (const p of products) {
    await db.product.upsert({
      where: { slug: p.slug },
      create: { name:p.name,slug:p.slug,description:p.desc,price:p.price,categoryId:catMap[p.cat],hasHeatLevel:p.heat,isFeatured:p.feat,isAvailable:true,stock:100,tags:p.tags,images:[p.img],compareAtPrice:null },
      update: { name:p.name,description:p.desc,price:p.price,categoryId:catMap[p.cat],hasHeatLevel:p.heat,isFeatured:p.feat,tags:p.tags,images:[p.img] },
    });
  }
  await db.coupon.upsert({ where:{ code:'SEVENSIDES10' }, create:{ code:'SEVENSIDES10',type:'PERCENTAGE',value:10,minOrderAmount:1500,isActive:true }, update:{} });
  console.log('Seed complete.');
}

main().then(() => db.$disconnect()).catch(e => { console.error(e); db.$disconnect(); process.exit(1); });