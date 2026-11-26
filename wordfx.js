(function(){
var ws=[].slice.call(document.querySelectorAll('.wfx'));if(!ws.length)return;
var rm=matchMedia('(prefers-reduced-motion:reduce)');
if(rm.matches||!('IntersectionObserver' in window))return;
ws.forEach(function(w){var r=w.getBoundingClientRect();if(r.top>innerHeight*.9||r.bottom<0)w.classList.add('pre')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){var w=e.target;if(e.isIntersecting&&e.intersectionRatio>=.6){io.unobserve(w);w.classList.remove('pre');w.classList.remove('go');void w.offsetWidth;w.classList.add('go')}})},{threshold:[.6,1]});
ws.forEach(function(w){io.observe(w);w.addEventListener('mouseenter',function(){if(w.classList.contains('pre'))return;w.classList.remove('go','hop');void w.offsetWidth;w.classList.add('hop')});w.addEventListener('animationend',function(e){if(e.animationName==='wfxhop')w.classList.remove('hop')})});
})();
