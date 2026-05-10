---
layout: default
title: Gallery
permalink: /gallery/
---

# Welcome to My Gallery
Three favorite folders, shown with one image from each.

<div class="gallery-container">
  <div class="gallery-item">
    <img src="{{ site.baseurl }}/assets/fun/9c5a489f-361e-4701-8116-e9e00af5e4ec.jpg" alt="Fun Time">
    <p class="caption">Fun Time</p>
  </div>

  <div class="gallery-item">
    <img src="{{ site.baseurl }}/assets/creature/86017d8c-ce73-40e4-b3b1-25fd275b9279.jpg" alt="Cool Creatures">
    <p class="caption">Cool Creatures</p>
  </div>

  <div class="gallery-item">
    <img src="{{ site.baseurl }}/assets/mountain/WhatsApp%20Image%202026-05-09%20at%2010.20.22%20AM.jpeg" alt="Mountain">
    <p class="caption">Mountain</p>
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
