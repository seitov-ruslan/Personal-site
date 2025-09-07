(function(){
  const header = document.getElementById('siteHeader');

  // предзагрузка молний
  const preloaded = {};
  document.querySelectorAll('.lightning').forEach(img=>{
    const s = img.dataset.src;
    if(s && !preloaded[s]){
      const p = new Image();
      p.src = s;
      preloaded[s] = p;
    }
  });

  function showLightnings(){
    header.classList.add('hovering');
    document.querySelectorAll('.lightning').forEach(oldImg=>{
      const src = oldImg.dataset.src;
      if(!src){ oldImg.style.opacity = '1'; return; }
      const newImg = document.createElement('img');
      newImg.className = oldImg.className;
      newImg.dataset.src = src;
      newImg.alt = '';
      newImg.setAttribute('aria-hidden','true');
      newImg.style.pointerEvents = 'none';
      newImg.style.imageRendering = 'pixelated';
      newImg.src = preloaded[src] ? preloaded[src].src : src;
      oldImg.parentNode.replaceChild(newImg, oldImg);
      requestAnimationFrame(()=> newImg.style.opacity = '1');
    });
  }

  function hideLightnings(){
    header.classList.remove('hovering');
    document.querySelectorAll('.lightning').forEach(img=>{
      img.style.opacity = '0';
    });
  }

  header.addEventListener('pointerenter', showLightnings);
  header.addEventListener('pointerleave', hideLightnings);
  header.addEventListener('focusin', showLightnings);
  header.addEventListener('focusout', hideLightnings);

  let touched = false;
  header.addEventListener('touchstart', ()=>{
    if(!touched){
      showLightnings();
      touched = true;
      setTimeout(()=> touched = false, 500);
    }
  }, {passive:true});
})();
