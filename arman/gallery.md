---
layout: default
title: Gallery
permalink: /gallery/
---

# Welcome to My Gallery


<div class="gallery-container">
  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/creature/">
      <img src="{{ site.baseurl }}/assets/creature/86017d8c-ce73-40e4-b3b1-25fd275b9279.jpg" alt="Cool Creatures">
    </a>
    <p class="caption">Cool Creatures</p>
  </div>

  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/mountain/">
      <img src="{{ site.baseurl }}/assets/mountain/WhatsApp%20Image%202026-05-09%20at%2010.20.22%20AM.jpeg" alt="Mountain">
    </a>
    <p class="caption">Mountain</p>
  </div>
  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/flower/">
      <img src="{{ site.baseurl }}/assets/flower/IMG-20250406-WA0012.jpg" alt="Flower">
    </a>
    <p class="caption">Flower</p>
  </div>

  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/me/">
      <img src="{{ site.baseurl }}/assets/me/IMG-20240703-WA0010.jpg" alt="Me">
    </a>
    <p class="caption">Me</p>
  </div>

  <div class="gallery-item">
    <a href="{{ site.baseurl }}/gallery/Scenary/">
      <img src="{{ site.baseurl }}/assets/Scenary/1000071962.jpg" alt="Scenary">
    </a>
    <p class="caption">Scenary</p>
  </div>
</div>

<style>
.gallery-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
  flex-wrap: wrap;
}

.gallery-item {
  text-align: center;
}

.gallery-item a {
  display: inline-block;
}

.gallery-item img {
  width: 280px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  object-fit: cover;
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
