import Glide from '@glidejs/glide'
import { createClient } from '@supabase/supabase-js'

const SB_URL = 'https://thapqeodawxffacnljij.supabase.co'
const SB_KEY = 'sb_publishable_TZQOtUq1RwjDGBpWDb92UA_KZwAOHUS'
const sb = createClient(SB_URL, SB_KEY)

// =============================================================================
// PAGE TRANSITION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-entering')
})

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href')
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    link.target === '_blank'
  )
    return
  link.addEventListener('click', e => {
    e.preventDefault()
    document.body.classList.add('page-leaving')
    setTimeout(() => {
      window.location.href = href
    }, 300)
  })
})

// =============================================================================
// HERO CUP
// =============================================================================
const heroCup = document.getElementById('hero_cup')
const miau1 = document.getElementById('miau1')
const miau2 = document.getElementById('miau2')

if (heroCup) {
  function playMiau() {
    const audio = Math.random() < 0.5 ? miau1 : miau2
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }
  heroCup.addEventListener('click', playMiau)
  heroCup.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') playMiau()
  })
}

// =============================================================================
// CLIENTES
// =============================================================================
document.querySelectorAll('.card__image--clickable').forEach((img, idx) => {
  const audio = document.getElementById(`audio${idx + 1}`)
  if (!audio) return
  function play() {
    audio.currentTime = 0
    audio.play()
  }
  img.addEventListener('click', play)
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') play()
  })
})

// =============================================================================
// SCROLL REVEAL
// =============================================================================
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 },
)
document
  .querySelectorAll('[data-reveal]')
  .forEach(el => revealObserver.observe(el))

// =============================================================================
// REVIEWS
// =============================================================================
async function loadReviewCarousels() {
  const { data: reviews, error } = await sb
    .from('reviews')
    .select('id, title, slug, banner_url, cover_url, category, score')
    .order('created_at', { ascending: false })

  if (error || !reviews) {
    console.error('Erro ao carregar reviews:', error)
    return
  }

  const games = reviews.filter(r => r.category !== 'anime')
  const animes = reviews.filter(r => r.category === 'anime')

  buildCarousel({
    slidesId: 'slidesGames',
    bulletsId: 'bulletsGames',
    glideId: 'glideGames',
    wrapperId: 'wrapperGames',
    labelId: 'labelGames',
    items: games,
  })
  buildCarousel({
    slidesId: 'slidesAnimes',
    bulletsId: 'bulletsAnimes',
    glideId: 'glideAnimes',
    wrapperId: 'wrapperAnimes',
    labelId: 'labelAnimes',
    items: animes,
  })
}

function buildCarousel({
  slidesId,
  bulletsId,
  glideId,
  wrapperId,
  labelId,
  items,
}) {
  const slidesList = document.getElementById(slidesId)
  const bulletsList = document.getElementById(bulletsId)
  const glideEl = document.getElementById(glideId)
  const wrapper = document.getElementById(wrapperId)
  const label = document.getElementById(labelId)

  if (!slidesList || !glideEl) return

  if (!items.length) {
    if (wrapper) wrapper.style.display = 'none'
    if (label) label.style.display = 'none'
    return
  }

  slidesList.innerHTML = items
    .map(
      (r, i) => `
    <li class="glide__slide"
        role="group"
        aria-roledescription="slide"
        aria-label="Slide ${i + 1} de ${items.length}">
      <img
        src="${r.cover_url || r.banner_url || ''}"
        data-review-id="${r.id}"
        alt="${r.title || 'Review'}"
        style="cursor:pointer; width:100%; display:block;"
      />
    </li>
  `,
    )
    .join('')

  bulletsList.innerHTML = items
    .map(
      (_, i) => `
    <button class="glide__bullet" data-glide-dir="=${i}" aria-label="Ir para slide ${
      i + 1
    }"></button>
  `,
    )
    .join('')

  new Glide(`#${glideId}`, {
    type: 'carousel',
    perView: 4,
    focusAt: 'center',
    gap: 16,
    breakpoints: {
      1200: { perView: 3 },
      768: { perView: 2.2 },
      600: { perView: 2.2 },
      480: { perView: 1.2 },
    },
  }).mount()

  slidesList.querySelectorAll('img[data-review-id]').forEach(img => {
    img.addEventListener('click', () => {
      document.body.classList.add('page-leaving')
      setTimeout(() => {
        window.location.href = `review.html?id=${img.dataset.reviewId}`
      }, 300)
    })
  })
}

loadReviewCarousels()