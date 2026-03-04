/**
 * index.js — Cybis Café
 * Lógica interativa: sons dos personagens, miados da xícara e carrossel.
 */

// ─── Xícara com miados ────────────────────────────────────────────────────────

const heroCup  = document.getElementById('hero_cup')
const miau1    = document.getElementById('miau1')
const miau2    = document.getElementById('miau2')

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
  heroCup.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      playMiau()
    }
  })
}

// ─── Personagens da seção Clientes ───────────────────────────────────────────

const clientImages = document.querySelectorAll('.card__image--clickable')

clientImages.forEach((img, index) => {
  const audio = document.getElementById(`audio${index + 1}`)
  if (!audio) return

  function playClientAudio() {
    audio.currentTime = 0
    audio.play()
  }

  img.addEventListener('click', playClientAudio)
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      playClientAudio()
    }
  })
})

// ─── Carrossel Glide.js ───────────────────────────────────────────────────────
// Slides em formato retrato (aspect-ratio 3/4 via CSS),
// então perView menor para dar destaque a cada capa.

const glideEl = document.querySelector('.glide')

if (glideEl && typeof Glide !== 'undefined') {
  new Glide('.glide', {
    type:              'carousel',
    perView:           4,
    focusAt:           'center',
    gap:               16,
    autoplay:          4500,
    hoverpause:        true,
    animationDuration: 500,
    breakpoints: {
      1200: { perView: 4, gap: 12 },
      900:  { perView: 3, gap: 10 },
      600:  { perView: 2, gap: 8  },
      400:  { perView: 1, gap: 6  },
    },
  }).mount()
} else if (glideEl) {
  console.warn('Glide.js não carregado. Verifique o script no HTML.')
}
