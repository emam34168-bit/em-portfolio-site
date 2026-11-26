(function(){
var r=document.createElement('div');r.className='srail';r.setAttribute('aria-hidden','true');
r.innerHTML='<div class="srail-line"></div><div class="srail-dot"></div><div class="srail-chip"></div>';
document.body.appendChild(r);
var line=r.firstChild,dot=r.children[1],chip=r.children[2],timer,ticks=[];
var secs=[].slice.call(document.querySelectorAll('main section[id]'));
var names={work:'Work',services:'What I do',process:'Process',software:'Software'};
function geo(){var lt=76,lb=96;if(innerWidth<=760){lt=70;lb=90}return {t:lt,h:Math.max(40,innerHeight-lt-lb)}}
function max(){return Math.max(1,document.documentElement.scrollHeight-innerHeight)}
function build(){ticks.forEach(function(t){t.remove()});ticks=[];var g=geo(),m=max();
 secs.forEach(function(s){var y=s.getBoundingClientRect().top+scrollY;var f=Math.min(1,Math.max(0,y/m));var t=document.createElement('div');t.className='srail-tick';t.style.top=(g.t+f*g.h)+'px';r.appendChild(t);ticks.push(t)})}
function label(p){var y=scrollY+innerHeight*.35,cur='';secs.forEach(function(s){if(s.getBoundingClientRect().top+scrollY<=y)cur=names[s.id]||''});
 return secs.length?(cur||'Top'):Math.round(p*100)+'%'}
function upd(){r.style.display=(document.documentElement.scrollHeight-innerHeight<60)?'none':'';var g=geo(),p=Math.min(1,Math.max(0,scrollY/max())),y=g.t+p*g.h;
 dot.style.transform='translateY('+y+'px)';chip.style.transform='translateY('+y+'px)';chip.textContent=label(p);
 chip.classList.add('on');clearTimeout(timer);timer=setTimeout(function(){chip.classList.remove('on')},900)}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',function(){build();upd()});
addEventListener('load',function(){build();upd();chip.classList.remove('on')});
build();r.style.display=(document.documentElement.scrollHeight-innerHeight<60)?'none':'';
var p0=Math.min(1,Math.max(0,scrollY/max())),g0=geo();dot.style.transform='translateY('+(g0.t+p0*g0.h)+'px)';chip.style.transform=dot.style.transform;chip.textContent=label(p0);
setTimeout(function(){build();upd();chip.classList.remove('on')},1500);
if(window.ResizeObserver)new ResizeObserver(function(){build();upd();chip.classList.remove('on')}).observe(document.body);
})();
