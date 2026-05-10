---
layout: default
title: Gallery
permalink: /gallery/
---

# Welcome to My Gallery
I have curated some of my favorite research and field moments.

<div class="gallery-container">
  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/art/">
      <img src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800" alt="Research">
      <p class="caption">Research</p>
    </a>
  </div>

  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/photography/">
      <img src="https://images.unsplash.com/photo-1511497584788-876760111969?w=800" alt="Field Photography">
      <p class="caption">Field Photography</p>
    </a>
  </div>

  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/art/">
      <img src="https://images.unsplash.com/photo-1549887534-f2bf6a0df59e?w=800" alt="Nature">
      <p class="caption">Nature Studies</p>
    </a>
  </div>

  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/photography/">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Biodiversity">
      <p class="caption">Biodiversity</p>
    </a>
  </div>
</div>

<style>
.gallery-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
}

.gallery-item {
  text-align: center;
}

.gallery-item img {
  width: auto;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.gallery-item img:hover {
  transform: scale(1.05);
}

.caption {
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;
}
</style>
