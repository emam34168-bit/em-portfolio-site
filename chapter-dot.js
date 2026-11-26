(function(){
if(!document.getElementById('work'))return;
var IDS=['work','services','process','software','hire'],NAMES=['Work','What I do','How we work','Software','Contact'],N=IDS.length;
var reduce=matchMedia('(prefers-reduced-motion:reduce)');
var nav=document.createElement('div');nav.className='crail';nav.setAttribute('role','navigation');nav.setAttribute('aria-label','Chapters');
nav.innerHTML='<div class="crail-track"><span class="crail-line" aria-hidden="true"></span><span class="crail-marker" aria-hidden="true"><i class="crail-ring"></i></span><ol class="crail-stops">'+
 IDS.map(function(id,i){return '<li style="top:'+(i/(N-1)*100)+'%"><a class="crail-stop" href="#'+id+'" aria-label="Go to '+NAMES[i]+'"><span></span></a></li>'}).join('')+'</ol></div>';
var chip=document.createElement('span');chip.className='crail-chip';chip.setAttribute('aria-hidden','true');
var dot=document.createElement('i');dot.className='crail-dot';dot.setAttribute('aria-hidden','true');
document.body.appendChild(nav);document.body.appendChild(chip);document.body.appendChild(dot);
document.documentElement.classList.add('crail-on');
var line=nav.querySelector('.crail-line'),marker=nav.querySelector('.crail-marker'),stopEls=[].slice.call(nav.querySelectorAll('.crail-stop'));
var wm=document.querySelector('.wm-stop'),header=document.getElementById('nav');
var secs=IDS.map(function(id){return document.getElementById(id)});
var anchors=secs.map(function(s){return s&&s.querySelector('.stop-anchor')});
var stops=[],ink=new Map(),ctx=null;
try{ctx=document.createElement('canvas').getContext('2d')}catch(e){}
function measure(el){
 if(ink.has(el))return ink.get(el);var r=null;
 try{var cs=getComputedStyle(el),b=el.getBoundingClientRect();if(ctx&&b.height){ctx.font=cs.fontStyle+' '+cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;
  var m=ctx.measureText('.'),t=-m.actualBoundingBoxLeft,s=m.actualBoundingBoxRight,fa=m.fontBoundingBoxAscent!=null?m.fontBoundingBoxAscent:.8*b.height,h=m.actualBoundingBoxAscent+m.actualBoundingBoxDescent;
  r={dx:(t+s)/2,dy:fa-(m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2,r:Math.max(.5,Math.min(s-t,h)/2)}}}catch(e){}
 if(r)ink.set(el,r);return r}
function pointOf(el){if(!el)return null;var k=measure(el);if(!k)return null;var b=el.getBoundingClientRect();return {x:b.left+k.dx,y:b.top+k.dy,r:k.r}}
function remeasure(){var b=line.getBoundingClientRect(),x=b.left+b.width/2;stops=[];for(var i=0;i<N;i++)stops.push({x:x,y:b.top+b.height*i/(N-1)});ink.clear()}
/* spring, same constants as the reference */
var OM=Math.sqrt(36000/320),DAMP=5.8;
function spring(e,dt){dt=Math.min(.1,Math.max(0,dt));if(!dt)return e;var n=Math.ceil(dt/(1/240)-1e-9),h=dt/n,o=e.o,v=e.v;
 for(var i=0;i<n;i++){var a=(v-OM*OM*o*h)/(1+DAMP*h);o=o+a*h;v=a}return {o:o,v:v}}
function settled(e,t){return Math.abs(e.o)<=(t||.05)&&Math.abs(e.v)<=1}
function clamp01(x){return isFinite(x)?Math.min(1,Math.max(0,x)):0}
function progress(tops,t){var last=tops.length-1;for(var n=0;n<last;n++){if(tops[n+1]>t){return n+clamp01((t-tops[n])/Math.max(1,tops[n+1]-tops[n]))}}return last}
function railAt(p){var a=Math.floor(p),A=stops[Math.min(N-1,Math.max(0,a))],B=stops[Math.min(N-1,a+1)],f=p-a;if(p<=0)return stops[0];if(p>=N-1)return stops[N-1];return {x:A.x+(B.x-A.x)*f,y:A.y+(B.y-A.y)*f}}
var mem={wordmark:true,inside:false};
var T={x:{o:0,v:0},y:{o:0,v:0},r:{o:0,v:0}},B=null,O='',init=false,last=0,raf=0,lastY=NaN,hover=null,landed=null;
function frame(t){
 raf=0;var dt=last?(t-last)/1e3:0;last=t;var sy=scrollY,scrolled=sy!==lastY;lastY=sy;
 var vw=document.documentElement.clientWidth,vh=innerHeight,hb=header?header.getBoundingClientRect().bottom:56;
 var tops=secs.map(function(s){return s?s.getBoundingClientRect().top:Infinity});
 var docH=document.documentElement.scrollHeight,L=N-1,endShift=Math.max(0,(tops[L]+sy)-(docH-vh)-hb);tops[L]=tops[L]-endShift;
 var cur=null;tops.forEach(function(v,i){if(v<=vh*.5)cur=i});
 var p=progress(tops,hb),rp=railAt(p);
 var wmNow=tops[0]>=(mem.wordmark?.94:.985)*vh;mem.wordmark=wmNow;
 var anchor=cur===null?null:pointOf(anchors[cur]);
 var inside=false;if(anchor){var band=mem.inside?[.14,.66]:[.18,.62];inside=anchor.y>=band[0]*vh&&anchor.y<=band[1]*vh}mem.inside=inside;
 var home=wmNow?'wordmark':(reduce.matches?'rail':(inside?'anchor':'rail'));
 var target=home==='wordmark'?pointOf(wm):home==='anchor'?anchor:{x:rp.x,y:rp.y,r:5};
 if(!target){dot.removeAttribute('data-on');return}
 var key=home+':'+cur;
 if(init&&!reduce.matches&&B){
  if(key!==O){T={x:{o:T.x.o+(B.x-target.x),v:T.x.v},y:{o:T.y.o+(B.y-target.y),v:T.y.v},r:{o:T.r.o+(B.r-target.r),v:T.r.v}}}
  else{T={x:spring(T.x,dt),y:spring(T.y,dt),r:spring(T.r,dt)}}
 }else{init=true;T={x:{o:0,v:0},y:{o:0,v:0},r:{o:0,v:0}}}
 B=target;O=key;
 var n=Math.max(.2,target.r+T.r.o),x=Math.min(Math.max(target.x+T.x.o,n+1),Math.max(n+1,vw-n-1)),y=Math.min(Math.max(target.y+T.y.o,n+1),Math.max(n+1,vh-n-1));
 dot.style.transform='translate3d('+(x-12).toFixed(2)+'px,'+(y-12).toFixed(2)+'px,0) scale('+(n/12).toFixed(4)+')';dot.setAttribute('data-on','');
 marker.style.transform='translate3d(0,'+(rp.y-stops[0].y).toFixed(2)+'px,0)';
 if(home==='anchor')marker.setAttribute('data-ring','');else marker.removeAttribute('data-ring');
 stopEls.forEach(function(a,i){if(i===cur){if(a.getAttribute('aria-current')!=='true')a.setAttribute('aria-current','true')}else a.removeAttribute('aria-current')});
 if(hover!==null){chip.style.transform='translate3d(0,'+stops[hover].y.toFixed(2)+'px,0)';chip.textContent=('0'+(hover+1))+' '+NAMES[hover];chip.setAttribute('data-on','')}else chip.removeAttribute('data-on');
 if(scrolled||!(settled(T.x)&&settled(T.y)&&settled(T.r,.02)))raf=requestAnimationFrame(frame);else last=0}
function go(){if(!raf)raf=requestAnimationFrame(frame)}
function re(){remeasure();go()}
addEventListener('scroll',go,{passive:true});addEventListener('resize',re);
nav.addEventListener('pointerover',function(e){if(e.pointerType==='touch')return;var a=e.target.closest&&e.target.closest('.crail-stop');if(a){hover=stopEls.indexOf(a);go()}});
nav.addEventListener('pointerout',function(e){if(e.pointerType==='touch')return;if(e.target.closest&&e.target.closest('.crail-stop')){hover=null;go()}});
nav.addEventListener('focusin',function(e){var a=e.target.closest('.crail-stop');if(a&&a.matches(':focus-visible')){hover=stopEls.indexOf(a);go()}});
nav.addEventListener('focusout',function(){hover=null;go()});
reduce.addEventListener&&reduce.addEventListener('change',function(){init=false;go()});
remeasure();go();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(re);
addEventListener('load',re);
})();
