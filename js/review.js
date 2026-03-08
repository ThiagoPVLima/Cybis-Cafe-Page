import { createClient } from '@supabase/supabase-js'

import atelierImg from '../img/atelier-iris-3.png'
import bullyImg from '../img/Bully_cover.png'
import crashImg from '../img/crash-bandicoot.png'
import dkImg from '../img/donkey-kong-country.png'
import falloutImg from '../img/fallout-3.png'
import gtaImg from '../img/Grand_Theft_Auto_San_Andreas_capa.png'
import marioImg from '../img/mario-world.png'
import runeImg from '../img/rune-factory-special.png'

// Fallback local caso o Supabase não tenha a imagem
const LOCAL_COVERS = {
  'atelier-iris-3': atelierImg,
  'bully': bullyImg,
  'crash-bandicoot': crashImg,
  'donkey-kong-country': dkImg,
  'fallout-3': falloutImg,
  'gta-san-andreas': gtaImg,
  'mario-world': marioImg,
  'rune-factory': runeImg,
}

document.documentElement.classList.add('js-ready')

const SB_URL = localStorage.getItem('sb_url') || ''
const SB_KEY = localStorage.getItem('sb_key') || ''

const params = new URLSearchParams(window.location.search)
const gameKey = params.get('game')

async function fetchReview(slug) {
  if (!SB_URL || !SB_KEY) return null
  const supabase = createClient(SB_URL, SB_KEY)
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

function renderReview(review) {
  if (!review) {
    document.querySelector('.review-page__content').innerHTML =
      '<p class="review-page__not-found">Review não encontrado.</p>'
    return
  }

  document.title = `${review.title} — Cybis Café`

  // Banner
  const bannerImg = document.querySelector('.review-page__banner img')
  bannerImg.src = review.banner_url || LOCAL_COVERS[gameKey] || ''
  bannerImg.alt = review.title

  // Header
  document.querySelector('.review-page__title').textContent = review.title
  document.querySelector('.review-page__summary').textContent =
    review.summary || ''

  // Plataformas e nota
  const header = document.querySelector('.review-page__header')
  if (review.platforms || review.score != null) {
    const meta = document.createElement('div')
    meta.className = 'review-page__meta'
    meta.innerHTML = `
      ${
        review.platforms
          ? `<span class="review-page__platforms">🎮 ${review.platforms}</span>`
          : ''
      }
      ${
        review.score != null
          ? `<span class="review-page__score">⭐ ${review.score}/10</span>`
          : ''
      }
    `
    header.appendChild(meta)
  }

  // Body
  const body = document.querySelector('.review-page__body')
  body.innerHTML = ''

  const sections = Array.isArray(review.sections) ? review.sections : []

  sections.forEach((block, i) => {
    if (block.type === 'paragraph') {
      const p = document.createElement('p')
      p.className = 'review-page__paragraph'
      p.setAttribute('data-reveal', i % 3 === 0 ? '' : `delay-${i % 3}`)
      p.textContent = block.text
      body.appendChild(p)
    } else if (block.type === 'quote') {
      const bq = document.createElement('blockquote')
      bq.className = 'review-page__quote'
      bq.setAttribute('data-reveal', 'scale')
      bq.textContent = block.text
      body.appendChild(bq)
    } else if (block.type === 'image') {
      const figure = document.createElement('figure')
      figure.className = 'review-page__figure'
      figure.setAttribute('data-reveal', '')
      const img = document.createElement('img')
      img.src = block.url
      img.alt = ''
      img.className = 'review-page__image'
      figure.appendChild(img)
      body.appendChild(figure)
    }
  })

  // Scroll reveal
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
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
}

document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.add('page-entering')

  if (!gameKey) {
    renderReview(null)
    return
  }

  const review = await fetchReview(gameKey)
  renderReview(review)
})
