(function(){
  "use strict";

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal-on-scroll');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Side nav scroll spy ---------- */
  var sideNavLinks = Array.prototype.slice.call(document.querySelectorAll('.side-nav a'));
  var navSections = sideNavLinks
    .map(function(a){ return document.getElementById(a.getAttribute('data-target')); })
    .filter(Boolean);

  if('IntersectionObserver' in window && navSections.length){
    var navIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var link = document.querySelector('.side-nav a[data-target="' + entry.target.id + '"]');
        if(!link || !entry.isIntersecting) return;
        sideNavLinks.forEach(function(a){ a.parentElement.classList.remove('active'); });
        link.parentElement.classList.add('active');
      });
    }, { threshold: 0.5 });
    navSections.forEach(function(sec){ navIo.observe(sec); });
  }

  /* ---------- Flip cards ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.flip-card'));
  var revealedSet = new Set();
  var progressText = document.getElementById('progress-text');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.progress-dots span'));

  function updateProgress(){
    progressText.textContent = revealedSet.size + ' / ' + cards.length + ' 공개';
    dots.forEach(function(dot){
      var idx = dot.getAttribute('data-idx');
      if(revealedSet.has(idx)){ dot.classList.add('on'); }
      else{ dot.classList.remove('on'); }
    });
    if(revealedSet.size === cards.length){
      setTimeout(function(){
        showToast('카드 3장 다 오픈! 이제 진짜 저를 아셨네요 😄');
      }, 500);
    }
  }

  function toggleCard(card){
    var flipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    if(flipped){
      revealedSet.add(card.getAttribute('data-idx'));
      updateProgress();
    }
  }

  cards.forEach(function(card){
    card.addEventListener('click', function(){ toggleCard(card); });
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggleCard(card);
      }
    });
  });

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
      toastEl.classList.remove('show');
    }, 2400);
  }

  var greetings = [
    '만나서 반가워요 :)',
    '오늘도 꾸준히, 화이팅이에요!',
    'SSAFY 5반, 잘 부탁드려요 👋',
    '함께하면 더 잘 될 것 같아요.'
  ];

  document.getElementById('hello-btn').addEventListener('click', function(){
    var msg = greetings[Math.floor(Math.random() * greetings.length)];
    showToast(msg);
  });

  updateProgress();
})();
