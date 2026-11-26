(function(){
var sec=document.getElementById('services'),stage=sec.querySelector('.tss-stage'),svg=sec.querySelector('.tss-svg'),g=sec.querySelector('.tss-w'),ring=sec.querySelector('.tss-ring'),deg=sec.querySelector('.tss-deg'),rows=[].slice.call(sec.querySelectorAll('.rr'));
var reduce=matchMedia('(prefers-reduced-motion:reduce)');
var NS='http://www.w3.org/2000/svg',R=90,N=rows.length,ws=[];
function pt(a,r){a=a*Math.PI/180;return [r*Math.cos(a),r*Math.sin(a)]}
for(var i=0;i<N;i++){var span=360/N,a0=-90+span*i+2.5,a1=-90+span*(i+1)-2.5,p0=pt(a0,R),p1=pt(a1,R),mid=pt((a0+a1)/2,R*.52);
 var p=document.createElementNS(NS,'path');p.setAttribute('d','M0 0L'+p0[0]+' '+p0[1]+'A'+R+' '+R+' 0 0 1 '+p1[0]+' '+p1[1]+'Z');g.appendChild(p);ws.push({el:p,cx:mid[0],cy:mid[1],ang:(a0+a1)/2})}
function ease(t){return t<0?0:t>1?1:1-Math.pow(1-t,3)}
function clamp(t){return t<0?0:t>1?1:t}
function update(){
 if(reduce.matches){rows.forEach(function(r){r.classList.add('lit')});return}
 var rect=sec.getBoundingClientRect(),total=rect.height-innerHeight,p=clamp(-rect.top/total);
 ring.style.strokeDashoffset=1-clamp(p/.2);deg.textContent=Math.round(360*clamp(p/.2))+'\u00b0';
 var sr=svg.getBoundingClientRect(),s=sr.width/200,ox=sr.left+sr.width/2,oy=sr.top+sr.height/2;
 for(var i=0;i<N;i++){
  var t=(p-(.24+.17*i))/.17,e=ease(t),w=ws[i],ir=rows[i].querySelector('i').getBoundingClientRect(),
   tx=(ir.left+ir.width/2-ox)/s,ty=(ir.top+ir.height/2-oy)/s,
   k=1-e*.88,rot=e*(-w.ang),dx=e*(tx-w.cx),dy=e*(ty-w.cy);
  w.el.setAttribute('transform','translate('+(w.cx+dx)+' '+(w.cy+dy)+') rotate('+rot+') scale('+k+') translate('+(-w.cx)+' '+(-w.cy)+')');
  w.el.style.opacity=t>=1?0:1;
  rows[i].classList.toggle('lit',t>=.9);
 }
}
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);reduce.addEventListener&&reduce.addEventListener('change',update);update();
})();
