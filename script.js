const products = [
  {id:1,brand:"Nike",name:"Air Motion Runner",type:"Running",price:3499,tag:"RUNNING PICK",rating:"4.6",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",description:"Lightweight feel for everyday runs and walks.",sizes:["UK 6","UK 7","UK 8","UK 9","UK 10"],offers:[{retailer:"Amazon (sample)",price:3499,shipping:0},{retailer:"Myntra (sample)",price:3299,shipping:99},{retailer:"Retailer C (sample)",price:3599,shipping:0}]},
  {id:2,brand:"Adidas",name:"Runflex Everyday",type:"Running",price:2799,tag:"EVERYDAY RUN",rating:"4.5",image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80",description:"A versatile demo pick for walks and light runs.",sizes:["UK 6","UK 7","UK 8","UK 9"],offers:[{retailer:"Amazon (sample)",price:2799,shipping:0},{retailer:"Myntra (sample)",price:2899,shipping:0},{retailer:"Retailer C (sample)",price:2699,shipping:99}]},
  {id:3,brand:"Puma",name:"Street Pace",type:"Casual",price:1999,tag:"BUDGET PICK",rating:"4.3",image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",description:"Casual styling for everyday outfits.",sizes:["UK 6","UK 7","UK 8","UK 9","UK 10"],offers:[{retailer:"Amazon (sample)",price:1999,shipping:0},{retailer:"Myntra (sample)",price:1899,shipping:49},{retailer:"Retailer C (sample)",price:2099,shipping:0}]},
  {id:4,brand:"New Balance",name:"Core Comfort 574",type:"Casual",price:5499,tag:"COMFORT STYLE",rating:"4.7",image:"https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80",description:"A lifestyle-inspired silhouette for daily wear.",sizes:["UK 7","UK 8","UK 9","UK 10"],offers:[{retailer:"Amazon (sample)",price:5499,shipping:0},{retailer:"Myntra (sample)",price:5299,shipping:99},{retailer:"Retailer C (sample)",price:5599,shipping:0}]},
  {id:5,brand:"ASICS",name:"Road Pace Lite",type:"Running",price:4599,tag:"RUNNING PICK",rating:"4.6",image:"https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=700&q=80",description:"A sporty style to consider for running and walking.",sizes:["UK 6","UK 7","UK 8","UK 9"],offers:[{retailer:"Amazon (sample)",price:4599,shipping:0},{retailer:"Myntra (sample)",price:4399,shipping:99},{retailer:"Retailer C (sample)",price:4499,shipping:0}]},
  {id:6,brand:"Reebok",name:"Flex Train",type:"Training",price:2399,tag:"GYM & TRAINING",rating:"4.2",image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80",description:"Training-inspired design for gym sessions.",sizes:["UK 6","UK 7","UK 8","UK 9","UK 10"],offers:[{retailer:"Amazon (sample)",price:2399,shipping:0},{retailer:"Myntra (sample)",price:2299,shipping:49},{retailer:"Retailer C (sample)",price:2499,shipping:0}]},
  {id:7,brand:"Skechers",name:"Go Walk Ease",type:"Casual",price:3999,tag:"WALKING COMFORT",rating:"4.5",image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80",description:"A relaxed casual look for daily outings.",sizes:["UK 6","UK 7","UK 8","UK 9","UK 10"],offers:[{retailer:"Amazon (sample)",price:3999,shipping:0},{retailer:"Myntra (sample)",price:3799,shipping:99},{retailer:"Retailer C (sample)",price:3899,shipping:0}]},
  {id:8,brand:"Adidas",name:"Court Classic",type:"Casual",price:3299,tag:"CLEAN CLASSIC",rating:"4.4",image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80",description:"A clean, court-inspired casual sneaker.",sizes:["UK 6","UK 7","UK 8","UK 9"],offers:[{retailer:"Amazon (sample)",price:3299,shipping:0},{retailer:"Myntra (sample)",price:3199,shipping:49},{retailer:"Retailer C (sample)",price:3399,shipping:0}]}
];

const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
let activeCategory = "All";
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function renderProducts(){
  const query = searchInput.value.trim().toLowerCase();
  let list = products.filter(p => (activeCategory==="All" || p.type===activeCategory) && `${p.brand} ${p.name} ${p.type}`.toLowerCase().includes(query));
  if(sortSelect.value==="price-asc") list.sort((a,b)=>a.price-b.price);
  if(sortSelect.value==="price-desc") list.sort((a,b)=>b.price-a.price);
  if(sortSelect.value==="name") list.sort((a,b)=>a.brand.localeCompare(b.brand));
  if(!list.length){grid.innerHTML='<div class="empty-state">No demo shoes match that search. Try another brand or filter.</div>';return;}
  grid.innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${p.image}" alt="${p.brand} ${p.name} shoe" loading="lazy">
        <span class="product-badge">${p.tag}</span>
        <button class="save-button" type="button" aria-label="Show product details for ${p.name}" data-product="${p.id}">♡</button>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-meta"><span>${p.type}</span><span>★ ${p.rating} demo rating</span></div>
        <div class="product-bottom"><span class="product-price">${money(p.price)}</span><a class="compare-link" href="#compare" data-compare="${p.id}">Compare prices ↗</a></div>
      </div>
    </article>`).join("");
}
function renderOffers(product){
  const offers = product.offers.map(o=>({...o,total:o.price+o.shipping})).sort((a,b)=>a.total-b.total);
  document.getElementById("compareShoeName").textContent = product.name;
  document.getElementById("offerList").innerHTML = offers.map((o,i)=>`
    <div class="offer-row"><div><div class="retailer-name">${o.retailer}${i===0?'<span class="offer-tag">LOWEST SAMPLE TOTAL</span>':''}</div><div class="retailer-sub">Demo offer · Shipping ${o.shipping===0?'free':money(o.shipping)}</div></div><div class="offer-price">${money(o.price)}<div class="offer-total">Total ${money(o.total)}</div></div></div>`).join("");
}
document.getElementById("categoryFilters").addEventListener("click",e=>{
  const button=e.target.closest("[data-category]");if(!button)return;
  activeCategory=button.dataset.category;
  document.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("active",b===button));
  renderProducts();
});
searchInput.addEventListener("input",renderProducts);
sortSelect.addEventListener("change",renderProducts);
grid.addEventListener("click",e=>{
  const compare=e.target.closest("[data-compare]");
  const detail=e.target.closest("[data-product]");
  if(compare){const p=products.find(p=>p.id===Number(compare.dataset.compare));if(p)renderOffers(p);}
  if(detail){const p=products.find(p=>p.id===Number(detail.dataset.product));if(p){renderOffers(p);document.getElementById("compare").scrollIntoView({behavior:"smooth"});}}
});
document.getElementById("finderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const budget=Number(document.getElementById("budgetSelect").value);
  const purpose=document.getElementById("purposeSelect").value;
  const size=document.getElementById("sizeSelect").value;
  const matches=products.map(p=>{
    const sizeMatch=p.sizes.includes(size);
    const budgetMatch=p.price<=budget;
    const purposeMatch=purpose==="Any" || p.type===purpose;
    const score=(sizeMatch?3:0)+(budgetMatch?3:0)+(purposeMatch?4:0);
    const reason=[purposeMatch?"matches your selected activity":`a different style (${p.type.toLowerCase()})`,budgetMatch?"within your selected budget":"above your selected budget",sizeMatch?`demo size ${size} listed`:`${size} not listed in sample sizes`].join(" · ");
    return {...p,sizeMatch,budgetMatch,purposeMatch,score,reason};
  }).filter(p=>p.sizeMatch && p.budgetMatch).sort((a,b)=>b.score-a.score || a.price-b.price).slice(0,3);
  const result=document.getElementById("recommendationResults");
  result.hidden=false;
  result.innerHTML=`<h3>Your demo matches</h3><p>Ranked by selected activity, budget and sample size availability. Please verify real product specifications and fit before buying.</p>${matches.length?`<div class="recommendation-list">${matches.map((p,i)=>`<div class="recommendation-item"><strong>${i+1}. ${p.brand} ${p.name}</strong><small>${money(p.price)} · ${p.type}<br>${p.reason}</small></div>`).join("")}</div>`:'<p>No demo products match all selected filters. Try a higher budget or another size.</p>'}`;
  result.scrollIntoView({behavior:"smooth",block:"nearest"});
});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();
renderOffers(products[1]);
