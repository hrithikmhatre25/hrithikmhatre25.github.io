// ===========================================
// Our Little Sunset World — Script
// Handles: auto-built image/video carousels
// (driven by JSON file lists) + falling
// flowers and cat/dog emojis
// ===========================================

// ---------- Carousel logic ----------

// Builds the slides for a carousel by fetching a JSON array of filenames
// from `data-list`, and pointing each slide at `data-folder/<filename>`.
// data-type is either "image" or "video".
async function buildCarouselSlides(root) {
  const track = root.querySelector('.carousel-track');
  const folder = root.dataset.folder;
  const listUrl = root.dataset.list;
  const type = root.dataset.type;

  let files = [];
  try {
    const res = await fetch(listUrl);
    if (res.ok) {
      files = await res.json();
    }
  } catch (err) {
    console.warn('Could not load ' + listUrl, err);
  }

  track.innerHTML = '';

  if (!Array.isArray(files) || files.length === 0) {
    track.innerHTML = '<div class="carousel-empty">Nothing here yet 🌷</div>';
    return [];
  }

  files.forEach((filename, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');

    const src = folder + '/' + filename;

    if (type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'metadata';
      const source = document.createElement('source');
      source.src = src;
      video.appendChild(source);
      slide.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      slide.appendChild(img);
    }

    track.appendChild(slide);
  });

  return Array.from(track.querySelectorAll('.carousel-slide'));
}

function setupCarousel(rootId, counterId) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const prevBtn = root.querySelector('.carousel-arrow-left');
  const nextBtn = root.querySelector('.carousel-arrow-right');
  const counter = document.getElementById(counterId);

  buildCarouselSlides(root).then((slides) => {
    if (!slides || slides.length === 0) {
      if (counter) counter.textContent = '';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let current = 0;

    function update() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === current);

        const video = slide.querySelector('video');
        if (video && i !== current) {
          video.pause();
        }
      });

      if (counter) {
        counter.textContent = (current + 1) + ' / ' + slides.length;
      }
    }

    function goNext() {
      current = (current + 1) % slides.length;
      update();
    }

    function goPrev() {
      current = (current - 1 + slides.length) % slides.length;
      update();
    }

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);

    update();
  });
}

setupCarousel('videoCarousel', 'videoCounter');
setupCarousel('galleryCarousel', 'galleryCounter');

// ---------- Falling flowers & cat/dog emojis ----------
(function setupFallingLayer() {
  const layer = document.getElementById('fallingLayer');
  if (!layer) return;

  const symbols = ['🌻', '🌼', '🐱', '🐶'];
  const COUNT = 10; // total falling items on screen

  for (let i = 0; i < COUNT; i++) {
    const item = document.createElement('span');
    item.className = 'falling-item';
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left = Math.random() * 100; // vw
    const duration = 10 + Math.random() * 12; // seconds
    const delay = Math.random() * -duration; // start mid-fall
    const size = 1.2 + Math.random() * 1.4; // rem

    item.style.left = left + 'vw';
    item.style.fontSize = size + 'rem';
    item.style.animationDuration = duration + 's';
    item.style.animationDelay = delay + 's';

    layer.appendChild(item);
  }
})();
