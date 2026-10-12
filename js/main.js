(function(){
  var d=document, root=d.documentElement;
  // Mobile menu
  var btn=d.querySelector('.menu-btn');
  if(btn){
    btn.addEventListener('click',function(){
      var open=d.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    d.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){d.body.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');});});
  }
  // Header border on scroll
  var head=d.querySelector('.site-head');
  var onScroll=function(){ if(head) head.classList.toggle('scrolled',window.scrollY>10); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  // Monogram draw: measure path lengths
  d.querySelectorAll('.hero-mark path').forEach(function(p){
    try{ p.style.setProperty('--len', Math.ceil(p.getTotalLength())+1); }catch(e){}
  });
  requestAnimationFrame(function(){ root.classList.add('drawn'); });
  // Scroll reveal
  var items=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{rootMargin:'0px 0px -8% 0px',threshold:.08});
    items.forEach(function(el){io.observe(el);});
  } else { items.forEach(function(el){el.classList.add('in');}); }
  // Lightbox
  var lb=d.querySelector('.lightbox');
  if(lb){
    var lbImg=lb.querySelector('img'), lbCap=lb.querySelector('p'), closeBtn=lb.querySelector('.close'), last=null;
    var close=function(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); if(last) last.focus(); };
    d.querySelectorAll('.gallery button').forEach(function(b){
      b.addEventListener('click',function(){
        var img=b.querySelector('img'); last=b;
        lbImg.src=img.currentSrc||img.src; lbImg.alt=img.alt;
        lbCap.textContent=b.parentNode.querySelector('figcaption')?b.parentNode.querySelector('figcaption').textContent:'';
        lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); closeBtn.focus();
      });
    });
    closeBtn.addEventListener('click',close);
    lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
    d.addEventListener('keydown',function(e){ if(e.key==='Escape' && lb.classList.contains('open')) close(); });
  }
  var y=d.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
