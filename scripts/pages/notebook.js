'use strict';
(function () {
  const PATH = '../assets/images/notebook/';
  const entries = (window.notebookEntries || []).map((e, order) => ({...e, order})).sort((a,b) => {
    if (!a.date && !b.date) return a.order-b.order;
    if (!a.date) return 1; if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  let current = 0, lastFocus = null;
  const $ = id => document.getElementById(id);
  document.addEventListener('DOMContentLoaded', init);
  function init() {
    if (!entries.length || !$('notebookBook')) return;
    entries.forEach((entry,index) => {
      const button = document.createElement('button');
      button.type='button'; button.className='notebook-index-card';
      const img=document.createElement('img'); img.src=PATH+encodeURIComponent(entry.image); img.alt=''; img.loading='lazy';
      const artist=document.createElement('span'); artist.textContent=entry.artist;
      const characters=document.createElement('small'); characters.textContent=entry.characters.join(', ');
      button.append(img,artist,characters);
      button.addEventListener('click',()=>{ render(index,true); setIndex(false); $('notebookBook').scrollIntoView({behavior:'smooth'}); });
      $('notebookIndexGrid').append(button);
    });
    $('notebookPrevious').addEventListener('click',()=>move(-1));
    $('notebookNext').addEventListener('click',()=>move(1));
    $('notebookIndexToggle').addEventListener('click',()=>setIndex($('notebookIndex').hidden));
    $('notebookArtButton').addEventListener('click',openLightbox);
    document.querySelector('.notebook-lightbox-close').addEventListener('click',closeLightbox);
    $('notebookLightbox').addEventListener('click',e=>{if(e.target===$('notebookLightbox')) closeLightbox();});
    $('notebookArtwork').addEventListener('load',sizePhotoMount);
    window.addEventListener('resize',sizePhotoMount);
    document.addEventListener('keydown',e=>{
      const open=$('notebookLightbox').classList.contains('is-open');
      if(e.key==='Escape'&&open) closeLightbox();
      if(!open&&e.key==='ArrowLeft') move(-1);
      if(!open&&e.key==='ArrowRight') move(1);
    });
    const wanted=new URLSearchParams(location.search).get('drawing');
    const found=entries.findIndex(e=>e.id===wanted); render(found<0?0:found,false);
  }
  function move(step){
    if(entries.length<2||document.querySelector('.page-turn-overlay'))return;
    const next=(current+step+entries.length)%entries.length;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){render(next,false);return;}
    if(matchMedia('(max-width: 760px)').matches){
      render(next,false);
      const pages=$('notebookPages');
      pages.classList.remove('mobile-swap-next','mobile-swap-previous');
      void pages.offsetWidth;
      pages.classList.add(step>0?'mobile-swap-next':'mobile-swap-previous');
      window.setTimeout(()=>pages.classList.remove('mobile-swap-next','mobile-swap-previous'),280);
      return;
    }
    const frontSelector=step>0?'.notebook-art-page':'.notebook-info-page';
    const backSelector=step>0?'.notebook-info-page':'.notebook-art-page';
    const turningPage=document.querySelector(frontSelector).cloneNode(true);
    turningPage.removeAttribute('aria-label');
    turningPage.className=`notebook-page-sheet page-turn-overlay ${step>0?'notebook-art-page page-turn-next':'notebook-info-page page-turn-previous'}`;
    turningPage.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
    const clonedButton=turningPage.querySelector('button'); if(clonedButton)clonedButton.tabIndex=-1;
    render(next,false);
    const back=document.querySelector(backSelector).cloneNode(true);
    back.className=`page-turn-back ${step>0?'notebook-info-page':'notebook-art-page'}`; back.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
    const backButton=back.querySelector('button'); if(backButton)backButton.tabIndex=-1;
    turningPage.append(back);
    $('notebookPages').append(turningPage);
    turningPage.addEventListener('animationend',()=>turningPage.remove(),{once:true});
  }
  function render(index,animate,step=1){
    current=index; const e=entries[index];
    $('entryNumber').textContent=String(index+1); $('notebookCount').textContent=`${index+1} / ${entries.length}`;
    $('entryArtist').textContent=e.artist; $('entryDate').textContent=formatDate(e.date);
    $('entryCharacters').textContent=e.characters.join(', ');
    $('entryDescription').textContent=e.description||''; renderSocials(e.socials);
    const src=PATH+encodeURIComponent(e.image), alt=`Drawing of ${e.characters.join(', ')} by ${e.artist}`;
    $('notebookArtwork').src=src; $('notebookArtwork').alt=alt; $('notebookLightboxImage').src=src; $('notebookLightboxImage').alt=alt;
    document.querySelectorAll('.notebook-index-card').forEach((card,i)=>card.classList.toggle('is-current',i===index));
    history.replaceState(null,'',`${location.pathname}?drawing=${encodeURIComponent(e.id)}`);
  }
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
  function openLightbox(){lastFocus=document.activeElement;$('notebookLightbox').classList.add('is-open');$('notebookLightbox').setAttribute('aria-hidden','false');document.body.classList.add('notebook-modal-open');document.querySelector('.notebook-lightbox-close').focus();}
  function closeLightbox(){$('notebookLightbox').classList.remove('is-open');$('notebookLightbox').setAttribute('aria-hidden','true');document.body.classList.remove('notebook-modal-open');if(lastFocus)lastFocus.focus();}
  function formatDate(date){if(!date)return'DATE TO EDIT';const parsed=new Date(`${date}T00:00:00`);return Number.isNaN(parsed.getTime())?date:new Intl.DateTimeFormat('en-GB',{year:'2-digit',month:'2-digit',day:'2-digit'}).format(parsed);}
})();
