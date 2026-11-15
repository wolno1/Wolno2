'use strict';
(function () {
  const PATH = '../assets/images/notebook/';
  const DISPLAY_PATH = `${PATH}optimized/`;
  const THUMBNAIL_PATH = `${PATH}thumbnails/`;
  const VARIANT_VERSION = '3';
  const entries = (window.notebookEntries || []).map((e, order) => ({...e, order})).sort((a,b) => {
    if (!a.date && !b.date) return a.order-b.order;
    if (!a.date) return 1; if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  let current = 0, lastFocus = null, artworkRequest = 0;
  let turnRequest = 0, turning = false, finishTurn = null;
  const artworkCache = new Map();
  const readyArtwork = new Set();
  const $ = id => document.getElementById(id);
  document.addEventListener('DOMContentLoaded', init);
  function init() {
    if (!entries.length || !$('notebookBook')) return;
    entries.forEach((entry,index) => {
      const button = document.createElement('button');
      button.type='button'; button.className='notebook-index-card';
      const img=document.createElement('img'); img.src=variantSource(entry,'thumbnail'); img.alt=''; img.loading='lazy';
      img.onerror=()=>{img.onerror=null;img.src=artworkSource(entry.image);};
      const artist=document.createElement('span'); artist.textContent=entry.artist;
      const characters=document.createElement('small'); characters.textContent=entry.characters.join(', ');
      button.append(img,artist,characters);
      button.addEventListener('click',()=>{
        cancelTurn(); render(index); setIndex(false);
        $('notebookBook').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      });
      $('notebookIndexGrid').append(button);
    });
    $('notebookPrevious').addEventListener('click',()=>move(-1));
    $('notebookNext').addEventListener('click',()=>move(1));
    $('notebookIndexToggle').addEventListener('click',()=>setIndex($('notebookIndex').hidden));
    $('notebookShareButton').addEventListener('click',copyShareLink);
    $('notebookArtButton').addEventListener('click',openLightbox);
    document.querySelector('.notebook-lightbox-close').addEventListener('click',closeLightbox);
    $('notebookLightbox').addEventListener('click',e=>{if(e.target===$('notebookLightbox')) closeLightbox();});
    $('notebookArtwork').addEventListener('load',sizePhotoMount);
    window.addEventListener('resize',()=>{cancelTurn();sizePhotoMount();});
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',cancelTurn);
    document.addEventListener('keydown',e=>{
      const open=$('notebookLightbox').classList.contains('is-open');
      if(e.key==='Escape'&&open) closeLightbox();
      if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(!open&&e.key==='ArrowLeft'){e.preventDefault();move(-1);}
      if(!open&&e.key==='ArrowRight'){e.preventDefault();move(1);}
    });
    const wanted=new URLSearchParams(location.search).get('drawing');
    const found=entries.findIndex(e=>e.id===wanted); render(found<0?0:found);
  }
  function cancelTurn(){
    ++turnRequest;
    if(finishTurn)finishTurn();
    turning=false;
    $('notebookBook').removeAttribute('aria-busy');
  }
  function paperCopy(node){
    const copy=node.cloneNode(true);
    copy.removeAttribute('id');
    copy.querySelectorAll('[id]').forEach(child=>child.removeAttribute('id'));
    copy.querySelectorAll('[aria-labelledby],[aria-controls]').forEach(child=>{
      child.removeAttribute('aria-labelledby');child.removeAttribute('aria-controls');
    });
    copy.setAttribute('aria-hidden','true');
    copy.inert=true;
    return copy;
  }
  async function move(step){
    if(entries.length<2||turning)return;
    const next=(current+step+entries.length)%entries.length;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){render(next);return;}
    turning=true;
    const request=++turnRequest, book=$('notebookBook'), pages=$('notebookPages');
    book.setAttribute('aria-busy','true');
    // Keep the current spread intact until the next photograph is decoded.
    try{await loadArtwork(variantSource(entries[next],'display'));}
    catch(error){if(request===turnRequest){cancelTurn();render(next);}return;}
    if(request!==turnRequest)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){cancelTurn();render(next);return;}
    const mobile=matchMedia('(max-width: 760px)').matches;
    const frontSelector=step>0?'.notebook-art-page':'.notebook-info-page';
    const backSelector=step>0?'.notebook-info-page':'.notebook-art-page';
    const sheet=document.createElement('div');
    sheet.className=`page-turn-overlay ${step>0?'page-turn-next':'page-turn-previous'}`;
    sheet.setAttribute('aria-hidden','true');sheet.inert=true;
    const mobileReturn=mobile&&step<0;
    let front=mobileReturn?null:paperCopy(mobile?pages:pages.querySelector(frontSelector));
    const resting=mobile?(mobileReturn?paperCopy(pages):null):paperCopy(pages.querySelector(backSelector));
    if(resting)resting.classList.add('page-turn-resting',mobile?'page-turn-resting-mobile':step>0?'page-turn-resting-left':'page-turn-resting-right');
    render(next);
    // Both faces now contain their actual artwork, never a loading placeholder.
    sizePhotoMount();
    // On a top-bound notebook, the previous sheet falls back onto the old page.
    if(mobileReturn)front=paperCopy(pages);
    front.classList.add('page-turn-face','page-turn-front');
    if(mobile)front.classList.add('page-turn-mobile-spread');
    sheet.append(front);
    if(!mobile){
      const back=paperCopy(pages.querySelector(backSelector));
      back.classList.add('page-turn-face','page-turn-back');
      sheet.append(back);
    }
    if(resting)pages.append(resting);
    pages.append(sheet);
    book.classList.add('is-turning',step>0?'is-turning-next':'is-turning-previous');
    let timer, finished=false;
    const finish=()=>{
      if(finished)return;
      finished=true;
      window.clearTimeout(timer);sheet.remove();if(resting)resting.remove();
      book.classList.remove('is-turning','is-turning-next','is-turning-previous');
      book.removeAttribute('aria-busy');turning=false;finishTurn=null;
      sizePhotoMount();
    };
    finishTurn=finish;
    sheet.addEventListener('animationend',event=>{if(event.target===sheet)finish();});
    sheet.addEventListener('animationcancel',event=>{if(event.target===sheet)finish();});
    // Also release navigation if the browser interrupts an animation.
    timer=window.setTimeout(finish,1100);
  }
  function render(index){
    current=index; const e=entries[index];
    $('entryNumber').textContent=String(index+1); $('notebookCount').textContent=`${index+1} / ${entries.length}`;
    $('entryArtist').textContent=e.artist; $('entryDate').textContent=formatDate(e.date);
    $('entryCharacters').textContent=e.characters.join(', ');
    $('entryDescription').textContent=e.description||''; renderSocials(e.socials);
    const src=variantSource(e,'display'), alt=`Drawing of ${e.characters.join(', ')} by ${e.artist}`;
    const originalSrc=artworkSource(e.image), downloadButton=$('notebookDownloadButton');
    downloadButton.href=originalSrc;
    downloadButton.setAttribute('aria-label',`Open the full-size drawing by ${e.artist}`);
    loadCurrentArtwork(src,alt,index);
    document.querySelectorAll('.notebook-index-card').forEach((card,i)=>card.classList.toggle('is-current',i===index));
    history.replaceState(null,'',`${location.pathname}?drawing=${encodeURIComponent(e.id)}`);
  }
  function loadCurrentArtwork(src,alt,index){
    const request=++artworkRequest;
    const showArtwork=()=>{
      if(request!==artworkRequest||index!==current)return;
      const artwork=$('notebookArtwork'), lightboxImage=$('notebookLightboxImage');
      artwork.src=src; artwork.alt=alt; lightboxImage.src=src; lightboxImage.alt=alt;
      $('notebookArtButton').classList.remove('is-loading','has-load-error');
      $('notebookArtButton').removeAttribute('aria-busy');
      window.requestAnimationFrame(sizePhotoMount);
      preloadNeighbors(index);
    };
    if(readyArtwork.has(src)){showArtwork();return;}
    $('notebookArtButton').classList.add('is-loading');
    $('notebookArtButton').setAttribute('aria-busy','true');
    loadArtwork(src).then(showArtwork).catch(()=>{
      if(request!==artworkRequest||index!==current)return;
      $('notebookArtButton').classList.remove('is-loading');
      $('notebookArtButton').classList.add('has-load-error');
      $('notebookArtButton').removeAttribute('aria-busy');
    });
  }
  function loadArtwork(src){
    if(artworkCache.has(src))return artworkCache.get(src);
    const promise=new Promise((resolve,reject)=>{
      const image=new Image();
      image.decoding='async';
      const ready=()=>{readyArtwork.add(src);resolve();};
      image.onload=()=>{
        if(typeof image.decode==='function')image.decode().catch(()=>{}).finally(ready);
        else ready();
      };
      image.onerror=reject;
      image.src=src;
    });
    artworkCache.set(src,promise);
    promise.catch(()=>artworkCache.delete(src));
    return promise;
  }
  function preloadNeighbors(index){
    if(entries.length<2)return;
    [-1,1].forEach(offset=>{
      const neighbor=entries[(index+offset+entries.length)%entries.length];
      loadArtwork(variantSource(neighbor,'display')).catch(()=>{});
    });
  }
  function variantSource(entry,variant){
    const directory=variant==='thumbnail'?THUMBNAIL_PATH:DISPLAY_PATH;
    return `${directory}${encodeURIComponent(entry.id)}.jpg?v=${VARIANT_VERSION}`;
  }
  function artworkSource(image){return encodeURI(PATH+image);}
  function sizePhotoMount(){
    const image=$('notebookArtwork'), mount=$('notebookPhotoMount'), button=$('notebookArtButton');
    if(!image.naturalWidth||!button.clientWidth)return;
    // Leave only a small safety area for the photo corners. The button's own
    // box already accounts for the available page space.
    const maxWidth=Math.max(1,button.clientWidth-20), maxHeight=Math.max(1,button.clientHeight-20);
    const scale=Math.min(maxWidth/image.naturalWidth,maxHeight/image.naturalHeight);
    mount.style.width=`${Math.round(image.naturalWidth*scale)}px`;
    mount.style.height=`${Math.round(image.naturalHeight*scale)}px`;
  }
  function renderSocials(items){const box=$('entrySocials'); box.replaceChildren(); if(!items.length){box.textContent='SOCIAL LINKS TO EDIT';return;} items.forEach(s=>{const a=document.createElement('a');a.href=s.url;a.textContent=s.label;a.target='_blank';a.rel='noopener noreferrer';box.append(a);});}
  function setIndex(open){$('notebookIndex').hidden=!open;$('notebookIndexToggle').setAttribute('aria-expanded',String(open));}
  async function copyShareLink(){
    const entry=entries[current];
    const url=new URL(`notebook-share/${encodeURIComponent(entry.id)}.html`,location.href).href;
    const button=$('notebookShareButton');
    try{
      if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(url);
      else{
        const input=document.createElement('textarea');input.value=url;input.setAttribute('readonly','');input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();document.execCommand('copy');input.remove();
      }
      button.textContent='Link copied!';
    }catch(error){button.textContent='Could not copy';}
    window.setTimeout(()=>{button.textContent='Copy share link';},1800);
  }
  function openLightbox(){if($('notebookArtButton').classList.contains('is-loading'))return;lastFocus=document.activeElement;$('notebookLightbox').classList.add('is-open');$('notebookLightbox').setAttribute('aria-hidden','false');document.body.classList.add('notebook-modal-open');document.querySelector('.notebook-lightbox-close').focus();}
  function closeLightbox(){$('notebookLightbox').classList.remove('is-open');$('notebookLightbox').setAttribute('aria-hidden','true');document.body.classList.remove('notebook-modal-open');if(lastFocus)lastFocus.focus();}
  function formatDate(date){if(!date)return'DATE TO EDIT';const parsed=new Date(`${date}T00:00:00`);return Number.isNaN(parsed.getTime())?date:new Intl.DateTimeFormat('en-GB',{year:'2-digit',month:'2-digit',day:'2-digit'}).format(parsed);}
})();
