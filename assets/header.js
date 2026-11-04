(function(){
  const nav=document.getElementById('hlavni-navigace');
  const menu=document.querySelector('.menu-toggle');
  if(nav && menu){
    function setMenu(open,returnFocus){
      nav.classList.toggle('open',open);
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Zavřít navigaci':'Otevřít navigaci');
      if(returnFocus) menu.focus();
    }
    menu.addEventListener('click',function(){setMenu(menu.getAttribute('aria-expanded')!=='true',false);});
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){setMenu(false,false);});});
    document.addEventListener('keydown',function(event){if(event.key==='Escape' && nav.classList.contains('open'))setMenu(false,true);});
    document.addEventListener('click',function(event){if(!event.target.closest('header') && nav.classList.contains('open'))setMenu(false,false);});
    document.documentElement.classList.add('menu-ready');
    window.addEventListener('resize',function(){if(window.innerWidth>650)setMenu(false,false);});
  }
  // Expand native disclosures for printing, then restore the reader's state.
  let printDetails=[];
  window.addEventListener('beforeprint',function(){
    if(printDetails.length) return;
    printDetails=Array.from(document.querySelectorAll('details')).map(function(detail){
      const state={detail:detail,open:detail.open};detail.open=true;return state;
    });
  });
  window.addEventListener('afterprint',function(){
    printDetails.forEach(function(state){state.detail.open=state.open;});
    printDetails=[];
  });
})();
