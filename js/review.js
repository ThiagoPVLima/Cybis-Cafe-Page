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
// HELPERS
// =============================================================================
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name)
}

function buildStars(score) {
  const val = parseFloat(score)
  if (isNaN(val)) return ''
  const lit = Math.round(Math.min(10, Math.max(0, val)))
  const dark = 10 - lit
  return '★'.repeat(lit) + '☆'.repeat(dark)
}

function renderSections(sections) {
  if (!Array.isArray(sections) || !sections.length) return ''

  return sections
    .map((s, i) => {
      switch (s.type) {
        case 'paragraph':
          return `<p class="review-page__paragraph" data-reveal>${
            s.text || ''
          }</p>`

        case 'quote':
          return `<blockquote class="review-page__quote" data-reveal="scale">${
            s.text || ''
          }</blockquote>`

        case 'image':
          return s.url
            ? `<figure class="review-page__figure" data-reveal><img class="review-page__image" src="${s.url}" alt="" loading="lazy" /></figure>`
            : ''

        case 'video': {
          if (!s.url) return ''
          const ytMatch = s.url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/,
          )
          if (ytMatch) {
            return `
            <div class="review-page__video" data-reveal>
              <iframe
                src="https://www.youtube.com/embed/${ytMatch[1]}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                title="Vídeo"
              ></iframe>
            </div>`
          }
          return `<div class="review-page__video" data-reveal><video controls src="${s.url}"></video></div>`
        }

        default:
          return ''
      }
    })
    .join('\n')
}

// =============================================================================
// MAIN
// =============================================================================
async function loadReview() {
  const id = getParam('id')
  if (!id) {
    showError('Nenhuma review especificada.')
    return
  }

  const { data: review, error } = await sb
    .from('reviews')
    .select(
      'id, title, slug, summary, platforms, score, banner_url, cover_url, category, sections',
    )
    .eq('id', id)
    .single()

  if (error || !review) {
    showError('Review não encontrada.')
    return
  }

  // Banner
  const bannerImg = document.getElementById('review-banner-img')
  if (bannerImg) {
    if (review.banner_url) {
      bannerImg.src = review.banner_url
      bannerImg.alt = review.title || ''
    } else {
      bannerImg.style.display = 'none'
    }
  }

  // Título
  const titleEl = document.querySelector('.review-page__title')
  if (titleEl) titleEl.textContent = review.title || ''

  // Summary — só o texto, sem misturar meta
  const summaryEl = document.querySelector('.review-page__summary')
  if (summaryEl) summaryEl.textContent = review.summary || ''

  // Meta — plataformas e nota em div separada
  const headerEl = document.querySelector('.review-page__header')
  if (headerEl && (review.platforms || review.score != null)) {
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
          ? `<span class="review-page__score">⭐ ${parseFloat(
              review.score,
            ).toFixed(1)}/10</span>`
          : ''
      }
    `
    headerEl.appendChild(meta)
  }

  // Corpo
  const bodyEl = document.querySelector('.review-page__body')
  if (bodyEl) bodyEl.innerHTML = renderSections(review.sections)

  // Tab title
  if (review.title) document.title = `${review.title} — Cybis Café`

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

function showError(msg) {
  const bodyEl = document.querySelector('.review-page__body')
  if (bodyEl)
    bodyEl.innerHTML = `<p class="review-page__error">${msg} <a href="index.html#reviews">← Voltar</a></p>`
}

loadReview()
