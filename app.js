const STORE = {
  name: 'Nítida',
  whatsapp: '56900000000',
  currency: 'CLP'
};

const products = [
  {id:1,name:'Desengrasante Cítrico',category:'cocina',price:4290,oldPrice:4990,badge:'OFERTA',description:'Acción potente para cocina, campana y superficies con grasa.',image:'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',featured:true},
  {id:2,name:'Lavalozas Ultra',category:'cocina',price:2990,description:'Espuma concentrada con aroma limón y alto rendimiento.',image:'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',featured:true},
  {id:3,name:'Limpiador de Cocina',category:'cocina',price:3590,description:'Limpieza diaria para mesones, azulejos y electrodomésticos.',image:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'},
  {id:4,name:'Antisarro Baño',category:'bano',price:4490,badge:'MÁS VENDIDO',description:'Ayuda a remover sarro y residuos de jabón con facilidad.',image:'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80',featured:true},
  {id:5,name:'Desinfectante Frescura',category:'bano',price:3890,description:'Limpia y refresca baños y superficies de alto contacto.',image:'https://images.unsplash.com/photo-1583947581924-860bda3c6d26?auto=format&fit=crop&w=800&q=80'},
  {id:6,name:'Detergente Concentrado',category:'lavanderia',price:6990,badge:'RENDIDOR',description:'Limpieza profunda para ropa blanca y de color.',image:'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',featured:true},
  {id:7,name:'Suavizante Brisa',category:'lavanderia',price:4990,description:'Suavidad y aroma fresco de larga duración.',image:'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'},
  {id:8,name:'Quitamanchas Activo',category:'lavanderia',price:5290,description:'Tratamiento práctico para manchas difíciles antes del lavado.',image:'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80'},
  {id:9,name:'Multiuso Primavera',category:'hogar',price:3490,description:'Para mesas, muebles lavables y superficies del hogar.',image:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80'},
  {id:10,name:'Limpia Pisos Floral',category:'hogar',price:4590,description:'Limpia y perfuma pisos lavables sin dejar sensación pegajosa.',image:'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80'},
  {id:11,name:'Pack Hogar Radiante',category:'packs',price:16990,oldPrice:19990,badge:'PACK -15%',description:'Desengrasante, multiuso, limpia pisos y desinfectante.',image:'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'},
  {id:12,name:'Pack Lavandería Fresca',category:'packs',price:14990,oldPrice:17490,badge:'PACK AHORRO',description:'Detergente, suavizante y quitamanchas para una rutina completa.',image:'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80'}
];

const categoryNames = {todos:'Todos los productos',cocina:'Cocina',bano:'Baño',lavanderia:'Lavandería',hogar:'Todo el hogar',packs:'Packs ahorro'};
const formatPrice = value => new Intl.NumberFormat('es-CL',{style:'currency',currency:STORE.currency,maximumFractionDigits:0}).format(value);
const getCart = () => JSON.parse(localStorage.getItem('nitidaCart') || '[]');
const saveCart = cart => {localStorage.setItem('nitidaCart',JSON.stringify(cart));renderCart();};

function productCard(product){
  return `<article class="product-card">
    <div class="product-image"><img src="${product.image}" alt="${product.name}">${product.badge?`<span class="product-badge">${product.badge}</span>`:''}</div>
    <div class="product-info"><span class="product-category">${categoryNames[product.category]}</span><h3>${product.name}</h3><p>${product.description}</p>
      <div class="product-bottom"><div class="price-wrap"><strong>${formatPrice(product.price)}</strong>${product.oldPrice?`<span class="old-price">${formatPrice(product.oldPrice)}</span>`:''}</div><button class="add-button" data-add-product="${product.id}" aria-label="Agregar ${product.name}">+</button></div>
    </div></article>`;
}

function initProducts(){
  const featured = document.querySelector('[data-featured-products]');
  if(featured) featured.innerHTML = products.filter(p=>p.featured).slice(0,4).map(productCard).join('');

  const catalog = document.querySelector('[data-catalog-products]');
  if(!catalog) return;
  let activeCategory = new URLSearchParams(location.search).get('categoria') || 'todos';
  if(!categoryNames[activeCategory]) activeCategory='todos';
  let search=''; let sort='featured';

  const render=()=>{
    let list=products.filter(p=>(activeCategory==='todos'||p.category===activeCategory)&&p.name.toLowerCase().includes(search.toLowerCase()));
    if(sort==='low') list.sort((a,b)=>a.price-b.price);
    if(sort==='high') list.sort((a,b)=>b.price-a.price);
    if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
    if(sort==='featured') list.sort((a,b)=>(b.featured===true)-(a.featured===true));
    catalog.innerHTML=list.map(productCard).join('');
    document.querySelector('[data-result-count]').textContent=list.length;
    document.querySelector('[data-active-filter]').textContent=categoryNames[activeCategory];
    document.querySelector('[data-no-results]').classList.toggle('show',!list.length);
    document.querySelectorAll('[data-category]').forEach(btn=>btn.classList.toggle('active',btn.dataset.category===activeCategory));
  };

  document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{activeCategory=btn.dataset.category;render();}));
  document.querySelector('[data-search]').addEventListener('input',e=>{search=e.target.value.trim();render();});
  document.querySelector('[data-sort]').addEventListener('change',e=>{sort=e.target.value;render();});
  document.querySelector('[data-reset-filters]').addEventListener('click',()=>{activeCategory='todos';search='';sort='featured';document.querySelector('[data-search]').value='';document.querySelector('[data-sort]').value='featured';render();});
  render();
}

function addProduct(id){
  const cart=getCart(); const item=cart.find(i=>i.id===id);
  if(item)item.qty+=1; else cart.push({id,qty:1});
  saveCart(cart); openCart();
}
function changeQty(id,delta){
  const cart=getCart().map(item=>item.id===id?{...item,qty:item.qty+delta}:item).filter(item=>item.qty>0);
  saveCart(cart);
}
function removeProduct(id){saveCart(getCart().filter(item=>item.id!==id));}
function renderCart(){
  const cart=getCart();
  const count=cart.reduce((sum,i)=>sum+i.qty,0);
  document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=count);
  const itemsEl=document.querySelector('[data-cart-items]'); if(!itemsEl)return;
  const empty=document.querySelector('[data-cart-empty]');
  empty.classList.toggle('show',cart.length===0);
  itemsEl.style.display=cart.length?'block':'none';
  itemsEl.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><small>${formatPrice(p.price)}</small><div class="qty-controls"><button data-qty="-1" data-id="${p.id}">−</button><span>${item.qty}</span><button data-qty="1" data-id="${p.id}">+</button></div></div><button class="remove-item" data-remove="${p.id}">×</button></div>`}).join('');
  const total=cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);
  document.querySelector('[data-cart-total]').textContent=formatPrice(total);
}
function openCart(){document.querySelector('[data-cart-drawer]')?.classList.add('open');document.querySelector('[data-cart-overlay]')?.classList.add('open');document.querySelector('[data-cart-drawer]')?.setAttribute('aria-hidden','false');document.querySelector('.floating-whatsapp')?.style.setProperty('display','none');}
function closeCart(){document.querySelector('[data-cart-drawer]')?.classList.remove('open');document.querySelector('[data-cart-overlay]')?.classList.remove('open');document.querySelector('[data-cart-drawer]')?.setAttribute('aria-hidden','true');document.querySelector('.floating-whatsapp')?.style.removeProperty('display');}
function checkout(){
  const cart=getCart(); if(!cart.length){alert('Agrega al menos un producto.');return;}
  const name=document.querySelector('[data-customer-name]').value.trim()||'Cliente';
  const delivery=document.querySelector('[data-delivery]').value;
  const lines=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `• ${p.name} x${item.qty} — ${formatPrice(p.price*item.qty)}`;});
  const total=cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);
  const message=`Hola ${STORE.name}, soy ${name}. Quiero realizar este pedido:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}\nEntrega: ${delivery}\n\n¿Me ayudan a coordinar?`;
  window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`,'_blank');
}

document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add-product]');if(add)addProduct(Number(add.dataset.addProduct));
  if(e.target.closest('[data-cart-open]'))openCart();
  if(e.target.closest('[data-cart-close]')||e.target.closest('[data-cart-overlay]'))closeCart();
  const qty=e.target.closest('[data-qty]');if(qty)changeQty(Number(qty.dataset.id),Number(qty.dataset.qty));
  const remove=e.target.closest('[data-remove]');if(remove)removeProduct(Number(remove.dataset.remove));
  if(e.target.closest('[data-checkout]'))checkout();
});

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();});
initProducts();renderCart();
