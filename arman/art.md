---
layout: default
title: Art
permalink: /gallery/art/
images:
  - path: https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1400
    caption: Scientific sketching and observation
  - path: https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400
    caption: Notes, ideas, and working drafts
  - path: https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400
    caption: Writing and synthesis
---

# Featured Artworks

<div class="art-gallery">
  {% for image in page.images %}
    <div class="art-item" onclick="openLightbox('{{ image.path }}', '{{ image.caption }}')">
      <img src="{{ image.path }}" alt="{{ image.caption }}">
    </div>
  {% endfor %}
</div>

<div id="lightbox" class="lightbox">
  <span class="close" onclick="closeLightbox()">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
  <p class="lightbox-caption" id="lightbox-caption"></p>
  <button class="prev" onclick="changeImage(-1)">&#10094;</button>
  <button class="next" onclick="changeImage(1)">&#10095;</button>
</div>

<style>
.art-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.art-item {
  text-align: center;
  cursor: pointer;
}

.art-item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.art-item img:hover {
  transform: scale(1.05);
}

.lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  flex-direction: column;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}

.lightbox-caption {
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: white;
  cursor: pointer;
}

.prev, .next {
  position: absolute;
  top: 50%;
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.prev { left: 10%; }
.next { right: 10%; }
</style>

<script>
let currentImageIndex = 0;
let images = [];
let captions = [];

document.addEventListener('DOMContentLoaded', () => {
  images = {{ page.images | map: 'path' | jsonify }};
  captions = {{ page.images | map: 'caption' | jsonify }};
});

function openLightbox(imgSrc, caption) {
  currentImageIndex = images.indexOf(imgSrc);
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  document.getElementById('lightbox-img').src = images[currentImageIndex];
  document.getElementById('lightbox-caption').textContent = captions[currentImageIndex];
}
</script>
