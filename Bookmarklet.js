javascript:(function(){ 
  const css = `* { transition: none !important; animation: none !important; scroll-behavior: auto !important; will-change: auto !important; } video, audio { pointer-events: none; }`;
  let style = document.getElementById('lag-killer');
  if(style){ style.remove(); console.log('%cLag Reduction OFF','color:#f80'); return; }
  
  style = document.createElement('style');
  style.id = 'lag-killer';
  style.innerHTML = css;
  document.head.appendChild(style);
  
  document.querySelectorAll('video, audio, canvas').forEach(el => {
    if(el.tagName === 'VIDEO' || el.tagName === 'AUDIO') el.pause();
    el.style.imageRendering = 'crisp-edges';
  });
  
  console.log('%c🚀 Maximum Lag Reduction ON','color:#0f0;font-size:15px;font-weight:bold');
})();
