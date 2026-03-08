import { createClient } from '@supabase/supabase-js'

document.documentElement.classList.add('js-ready')

// ── XÍCARA ──
const heroCup = document.getElementById('hero_cup')
const miau1 = document.getElementById('miau1')
const miau2 = document.getElementById('miau2')
let clickCount = 0

function playMiau() {
  if (clickCount < 3) {
    miau1.currentTime = 0
    miau1.play()
  } else {
    miau2.currentTime = 0
    miau2.play()
    clickCount = -1
  }
  clickCount++
}

if (heroCup) {
  heroCup.addEventListener('click', playMiau)
  heroCup.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      playMiau()
    }
  })
}

// ── CLIENTES ──
const clientImages = document.querySelectorAll('.card__image--clickable')
clientImages.forEach((img, index) => {
  const audio = document.getElementById(`audio${index + 1}`)
  if (!audio) return
  function playClientAudio() {
    audio.currentTime = 0
    audio.play()
  }
  img.addEventListener('click', playClientAudio)
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      playClientAudio()
    }
  })
})

// ── CARROSSEL ──
const SB_URL = 'https://thapqeodawxffacnljij.supabase.co'
const SB_KEY = 'sb_publishable_TZQOtUq1RwjDGBpWDb92UA_KZwAOHUS'
const supabase = createClient(SB_URL, SB_KEY)

async function loadCarrossel() {
  const { data, error } = await supabase
    .from('reviews')
    .select('slug, title, cover_url')
    .order('created_at', { ascending: false })

  if (error || !data || data.length === 0) {
    initGlide()
    return
  }

  const slidesList = document.querySelector('.glide__slides')
  const bulletsList = document.querySelector('.glide__bullets')
  if (!slidesList) {
    initGlide()
    return
  }

  slidesList.innerHTML = data
    .map(
      (r, i) => `
    <li
      class="glide__slide"
      role="group"
      aria-roledescription="slide"
      aria-label="Slide ${i + 1} de ${data.length}"
    >
      <img
        src="${r.cover_url || ''}"
        data-review="${r.slug}"
        alt="Capa do jogo ${r.title}"
      />
    </li>
  `,
    )
    .join('')

  if (bulletsList) {
    bulletsList.innerHTML = data
      .map(
        (_, i) => `
      <button
        class="glide__bullet"
        data-glide-dir="=${i}"
        aria-label="Ir para slide ${i + 1}"
      ></button>
    `,
      )
      .join('')
  }

  initGlide()
}

function initGlide() {
  const glideEl = document.querySelector('.glide')
  if (glideEl && typeof Glide !== 'undefined') {
    new Glide('.glide', {
      type: 'carousel',
      perView: 4,
      focusAt: 'center',
      gap: 16,
      autoplay: 4500,
      hoverpause: true,
      animationDuration: 500,
      breakpoints: {
        1200: { perView: 4, gap: 12 },
        900: { perView: 3, gap: 10 },
        600: { perView: 2, gap: 8 },
        400: { perView: 1, gap: 6 },
      },
    }).mount()
  }
}

document.querySelector('.glide__track')?.addEventListener('click', e => {
  const img = e.target.closest('img[data-review]')
  if (img) {
    const slug = img.getAttribute('data-review')
    document.body.classList.add('page-leaving')
    setTimeout(() => {
      window.location.href = `review.html?game=${slug}`
    }, 300)
  }
})

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('[data-reveal]')
if (revealEls.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  revealEls.forEach(el => observer.observe(el))
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-entering')
  loadCarrossel()
})
