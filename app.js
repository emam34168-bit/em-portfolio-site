const P=window.PROJECTS,$=s=>document.querySelector(s),pad=n=>String(n).padStart(2,'0');
const card=(p,i)=>`<a class="card" style="animation-delay:${Math.min(i,12)*.05}s" href="project.html?p=${p.n}"><div class="im"><img loading="lazy" src="img/t/${pad(p.n)}.webp" alt="${p.title}"></div><small class="mono"><span>${pad(p.n)}</span><span>${p.category}</span></small><strong>${p.title}</strong></a>`;
if($('#hero-thumbs')){$('#hero-thumbs').innerHTML=[1,3,11,29].map(n=>`<a href="project.html?p=${n}"><img src="img/t/${pad(n)}.webp" alt="${P[n-1].title}"></a>`).join('')}
if($('#grid')){const cats=['All',...new Set(P.map(p=>p.group))];
 const draw=c=>{const l=P.filter(p=>c==='All'||p.group===c);$('#grid').innerHTML=l.map(card).join('');$('#count').textContent=l.length+' / '+P.length;
  document.querySelectorAll('#filters button').forEach(b=>b.classList.toggle('on',b.dataset.c===c))};
 $('#filters').innerHTML=cats.map(c=>`<button data-c="${c}">${c}</button>`).join('');
 $('#filters').onclick=e=>{if(e.target.dataset.c)draw(e.target.dataset.c)};draw('All')}
if($('#proj')){const n=Math.min(P.length,Math.max(1,+new URLSearchParams(location.search).get('p')||1)),p=P[n-1],pv=P[n-2],nx=P[n];
 document.title=p.title+' - Mohamed Emam';
 const imgs=Array.from({length:p.count},(_,j)=>`<img loading="lazy" src="img/p/${pad(n)}/${pad(j)}.webp" alt="${p.title} ${j+1}">`).join('');
 $('#proj').innerHTML=`<div class="tag mono"><span>(${pad(n)}) &nbsp;Project ${pad(n)}</span><span>Case study</span></div><a class="back mono" href="projects.html">&larr; All projects</a>
 <h2 class="ptitle">${p.title}</h2><div class="info"><div><small class="mono">01 &nbsp;Overview</small><span>${p.desc}</span></div><div><small class="mono">02 &nbsp;Deliverables</small><span>${p.deliverables}</span></div><div><small class="mono">03 &nbsp;Category</small><span>${p.category}</span></div></div>
 <div class="gal">${imgs}</div><div class="pn">${pv?`<a href="project.html?p=${pv.n}"><small class="mono">&larr; Previous</small><strong>${pv.title}</strong></a>`:'<span></span>'}${nx?`<a href="project.html?p=${nx.n}"><small class="mono">Next &rarr;</small><strong>${nx.title}</strong></a>`:'<span></span>'}</div><div class="lb" id="lb"><img alt=""></div>`;
 const lb=$('#lb');document.querySelectorAll('.gal img').forEach(i=>i.onclick=()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')});lb.onclick=()=>lb.classList.remove('on');
 document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')})}
(()=>{const b=document.getElementById('menu'),n=document.getElementById('nav');if(!b)return;const set=o=>{n.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')};b.onclick=()=>set(!n.classList.contains('open'));document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});document.querySelectorAll('#navlinks a').forEach(a=>a.addEventListener('click',()=>set(false)))})();
