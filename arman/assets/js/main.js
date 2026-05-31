// Fix DOM matches function
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

// Get Scroll position
function getScrollPos() {
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

  var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
  var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

  return { x: x, y: y };
}

var _scrollTimer = [];

// Smooth scroll
function smoothScrollTo(y, time) {
  time = time == undefined ? 500 : time;

  var scrollPos = getScrollPos();
  var count = 60;
  var length = (y - scrollPos.y);

  function easeInOut(k) {
    return .5 * (Math.sin((k - .5) * Math.PI) + 1);
  }

  for (var i = _scrollTimer.length - 1; i >= 0; i--) {
    clearTimeout(_scrollTimer[i]);
  }

  for (var i = 0; i <= count; i++) {
    (function() {
      var cur = i;
      _scrollTimer[cur] = setTimeout(function() {
        window.scrollTo(
          scrollPos.x,
          scrollPos.y + length * easeInOut(cur/count)
        );
      }, (time / count) * cur);
    })();
  }
}

var galleryLightbox = null;
var galleryLightboxImage = null;
var galleryLightboxCaption = null;
var galleryLightboxPrev = null;
var galleryLightboxNext = null;
var galleryLightboxClose = null;
var galleryLightboxImages = [];
var galleryLightboxIndex = 0;
var galleryLightboxLastFocus = null;

function ensureGalleryLightbox() {
  if (galleryLightbox || !document.body) {
    return;
  }

  var style = document.createElement('style');
  style.id = 'gallery-lightbox-styles';
  style.appendChild(document.createTextNode([
    '.folder-gallery img { cursor: zoom-in; }',
    '.gallery-lightbox {',
    '  position: fixed;',
    '  inset: 0;',
    '  display: none;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 24px;',
    '  background: rgba(10, 10, 10, 0.94);',
    '  z-index: 9999;',
    '  box-sizing: border-box;',
    '}',
    '.gallery-lightbox.is-open { display: flex; }',
    '.gallery-lightbox__image {',
    '  max-width: 100%;',
    '  max-height: 100%;',
    '  object-fit: contain;',
    '  border-radius: 10px;',
    '  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);',
    '}',
    '.gallery-lightbox__button {',
    '  position: absolute;',
    '  border: 0;',
    '  background: rgba(255, 255, 255, 0.14);',
    '  color: #fff;',
    '  width: 48px;',
    '  height: 48px;',
    '  border-radius: 999px;',
    '  font-size: 26px;',
    '  line-height: 48px;',
    '  text-align: center;',
    '  cursor: pointer;',
    '  transition: background 0.15s ease, transform 0.15s ease, opacity 0.15s ease;',
    '}',
    '.gallery-lightbox__button:hover { background: rgba(255, 255, 255, 0.24); transform: scale(1.04); }',
    '.gallery-lightbox__button:focus { outline: 2px solid rgba(255, 255, 255, 0.85); outline-offset: 2px; }',
    '.gallery-lightbox__button[disabled] { opacity: 0.35; cursor: default; transform: none; }',
    '.gallery-lightbox__button--close { top: 20px; right: 20px; font-size: 20px; }',
    '.gallery-lightbox__button--prev { left: 20px; top: 50%; transform: translateY(-50%); }',
    '.gallery-lightbox__button--next { right: 20px; top: 50%; transform: translateY(-50%); }',
    '.gallery-lightbox__button--prev:hover, .gallery-lightbox__button--next:hover { transform: translateY(-50%) scale(1.04); }',
    '.gallery-lightbox__button--close:hover { transform: scale(1.04); }',
    '.gallery-lightbox__caption {',
    '  position: absolute;',
    '  left: 24px;',
    '  right: 24px;',
    '  bottom: 20px;',
    '  color: rgba(255, 255, 255, 0.88);',
    '  font-size: 14px;',
    '  text-align: center;',
    '  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);',
    '}',
    'body.gallery-lightbox-open { overflow: hidden; }'
  ].join('\n')));
  document.head.appendChild(style);

  galleryLightbox = document.createElement('div');
  galleryLightbox.className = 'gallery-lightbox';
  galleryLightbox.setAttribute('role', 'dialog');
  galleryLightbox.setAttribute('aria-modal', 'true');
  galleryLightbox.setAttribute('aria-label', 'Image viewer');

  galleryLightboxPrev = document.createElement('button');
  galleryLightboxPrev.type = 'button';
  galleryLightboxPrev.className = 'gallery-lightbox__button gallery-lightbox__button--prev';
  galleryLightboxPrev.setAttribute('aria-label', 'Previous image');
  galleryLightboxPrev.textContent = '<';

  galleryLightboxNext = document.createElement('button');
  galleryLightboxNext.type = 'button';
  galleryLightboxNext.className = 'gallery-lightbox__button gallery-lightbox__button--next';
  galleryLightboxNext.setAttribute('aria-label', 'Next image');
  galleryLightboxNext.textContent = '>';

  galleryLightboxClose = document.createElement('button');
  galleryLightboxClose.type = 'button';
  galleryLightboxClose.className = 'gallery-lightbox__button gallery-lightbox__button--close';
  galleryLightboxClose.setAttribute('aria-label', 'Close image viewer');
  galleryLightboxClose.textContent = 'X';

  galleryLightboxImage = document.createElement('img');
  galleryLightboxImage.className = 'gallery-lightbox__image';
  galleryLightboxImage.alt = '';

  galleryLightboxCaption = document.createElement('div');
  galleryLightboxCaption.className = 'gallery-lightbox__caption';

  galleryLightbox.appendChild(galleryLightboxPrev);
  galleryLightbox.appendChild(galleryLightboxNext);
  galleryLightbox.appendChild(galleryLightboxClose);
  galleryLightbox.appendChild(galleryLightboxImage);
  galleryLightbox.appendChild(galleryLightboxCaption);
  document.body.appendChild(galleryLightbox);

  galleryLightbox.addEventListener('click', function(event) {
    if (event.target === galleryLightbox) {
      closeGalleryLightbox();
    }
  });

  galleryLightboxPrev.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    moveGalleryLightbox(-1);
  });

  galleryLightboxNext.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    moveGalleryLightbox(1);
  });

  galleryLightboxClose.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    closeGalleryLightbox();
  });
}

function getGalleryImages(gallery) {
  return Array.prototype.slice.call(gallery.querySelectorAll('img'));
}

function updateGalleryLightbox() {
  var currentImage = galleryLightboxImages[galleryLightboxIndex];

  if (!currentImage) {
    return;
  }

  galleryLightboxImage.src = currentImage.getAttribute('src');
  galleryLightboxImage.alt = currentImage.getAttribute('alt') || '';
  galleryLightboxCaption.textContent = currentImage.getAttribute('alt') || '';
  galleryLightboxPrev.disabled = galleryLightboxImages.length < 2;
  galleryLightboxNext.disabled = galleryLightboxImages.length < 2;
}

function openGalleryLightbox(images, index, triggerElement) {
  ensureGalleryLightbox();

  if (!galleryLightbox) {
    return;
  }

  galleryLightboxImages = images || [];
  galleryLightboxIndex = index || 0;
  galleryLightboxLastFocus = triggerElement || document.activeElement;

  updateGalleryLightbox();
  galleryLightbox.classList.add('is-open');
  document.body.classList.add('gallery-lightbox-open');
  galleryLightboxClose.focus();
}

function closeGalleryLightbox() {
  if (!galleryLightbox) {
    return;
  }

  galleryLightbox.classList.remove('is-open');
  document.body.classList.remove('gallery-lightbox-open');
  galleryLightboxImage.removeAttribute('src');
  galleryLightboxImage.alt = '';
  galleryLightboxCaption.textContent = '';

  if (galleryLightboxLastFocus && typeof galleryLightboxLastFocus.focus === 'function') {
    galleryLightboxLastFocus.focus();
  }
}

function moveGalleryLightbox(direction) {
  if (!galleryLightboxImages.length) {
    return;
  }

  galleryLightboxIndex = (galleryLightboxIndex + direction + galleryLightboxImages.length) % galleryLightboxImages.length;
  updateGalleryLightbox();
}

function handleGalleryImageClick(event) {
  var target = event.target;

  if (!target || !target.matches('.folder-gallery img')) {
    return;
  }

  var gallery = target.closest('.folder-gallery');
  if (!gallery) {
    return;
  }

  var images = getGalleryImages(gallery);
  openGalleryLightbox(images, images.indexOf(target), target);
}

function handleGalleryKeydown(event) {
  if (!galleryLightbox || !galleryLightbox.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeGalleryLightbox();
    return;
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    moveGalleryLightbox(-1);
    return;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    moveGalleryLightbox(1);
  }
}

function initGalleryLightbox() {
  var galleries = document.querySelectorAll('.folder-gallery');

  if (!galleries.length) {
    return;
  }

  document.addEventListener('click', handleGalleryImageClick);
  document.addEventListener('keydown', handleGalleryKeydown);

  for (var i = 0; i < galleries.length; i++) {
    var galleryImages = galleries[i].querySelectorAll('img');
    for (var j = 0; j < galleryImages.length; j++) {
      galleryImages[j].setAttribute('tabindex', '0');
      galleryImages[j].setAttribute('role', 'button');
      galleryImages[j].setAttribute('aria-label', galleryImages[j].getAttribute('alt') || 'Open image');
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryLightbox);
} else {
  initGalleryLightbox();
}