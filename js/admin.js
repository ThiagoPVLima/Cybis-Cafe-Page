import { createClient } from '@supabase/supabase-js'

const SB_URL = 'https://thapqeodawxffacnljij.supabase.co'
const SB_KEY = 'sb_publishable_TZQOtUq1RwjDGBpWDb92UA_KZwAOHUS'
const sb = createClient(SB_URL, SB_KEY)

const $ = id => document.getElementById(id)

let reviews         = []
let currentReviewId = null
let sections        = []
let dragIdx         = null

// =============================================================================
// HELPERS
// =============================================================================
function getCategory() {
  return document.querySelector('input[name="fCategory"]:checked')?.value || 'game'
}

function buildStars(score) {
  const val = parseFloat(score)
  if (isNaN(val)) return { html: '☆☆☆☆☆☆☆☆☆☆', text: '—' }
  const lit  = Math.round(Math.min(10, Math.max(0, val)))
  const dark = 10 - lit
  return {
    html: '<span class="lit">' + '★'.repeat(lit) + '</span>' + '☆'.repeat(dark),
    text: val.toFixed(1),
  }
}

// =============================================================================
// LIVE PREVIEW
// =============================================================================
function updateLivePreview() {
  const title  = $('fTitle').value
  const score  = $('fScore').value
  const banner = $('fBanner').value
  const cat    = getCategory()

  $('pTitle').textContent = title || 'Título da Review'

  const { html, text } = buildStars(score)
  $('pStars').innerHTML   = html
  $('pScore').textContent = score ? text : '—'

  const badge = $('pCategoryBadge')
  if (cat === 'anime') {
    badge.textContent = '🎎 Anime / Mangá'
    badge.className   = 'preview-card__badge preview-card__badge--anime'
  } else {
    badge.textContent = '🎮 Jogo'
    badge.className   = 'preview-card__badge preview-card__badge--game'
  }

  const wrap = $('pBannerWrap')
  if (banner) {
    wrap.innerHTML = `<img src="${banner}" alt="" onerror="this.style.display='none'" />`
  } else {
    wrap.innerHTML = `<div class="preview-card__banner-placeholder">sem banner</div>`
  }

  const html2 = sections.map(s => {
    if (s.type === 'paragraph') return s.text ? `<p>${s.text}</p>` : ''
    if (s.type === 'quote')     return s.text ? `<blockquote>"${s.text}"</blockquote>` : ''
    if (s.type === 'image')     return s.url  ? `<img src="${s.url}" alt="">` : ''
    if (s.type === 'video')     return `<div class="preview-card__video-ph">🎥 ${s.url || 'URL do vídeo'}</div>`
    return ''
  }).join('')

  $('pContent').innerHTML = html2 || '<p class="preview-card__empty-hint">conteúdo aparece aqui…</p>'
}

;['fTitle', 'fScore', 'fBanner'].forEach(id =>
  $(id).addEventListener('input', updateLivePreview)
)
document.querySelectorAll('input[name="fCategory"]').forEach(r =>
  r.addEventListener('change', updateLivePreview)
)

// =============================================================================
// SECTIONS — render
// =============================================================================
function renderSections() {
  const wrapper = $('sectionsWrapper')
  wrapper.innerHTML = ''

  sections.forEach((s, i) => {
    const block = document.createElement('div')
    block.className = 'sec-block'
    block.draggable = true

    const typeClass = { paragraph: 'para', quote: 'quote', image: 'image', video: 'video' }[s.type] || 'para'
    const typeLabel = { paragraph: 'Parágrafo', quote: 'Citação', image: 'Imagem', video: 'Vídeo' }[s.type] || s.type

    let body = ''

    if (s.type === 'paragraph') {
      body = `<textarea class="sec-block__textarea" placeholder="Escreva aqui…">${s.text || ''}</textarea>`

    } else if (s.type === 'quote') {
      body = `<textarea class="sec-block__textarea" style="min-height:60px" placeholder="Citação…">${s.text || ''}</textarea>`

    } else if (s.type === 'image') {
      // Upload area idêntico ao banner + campo URL alternativo
      body = `
        <div class="sec-block__img-wrap">
          <div class="sec-block__img-upload" data-upload-area>
            <input type="file" accept="image/*" data-file-input />
            <img class="sec-block__img-preview-thumb" data-preview alt="" />
            <div class="sec-block__img-text">
              <div class="sec-block__img-filename" data-filename>📁 Clique para selecionar</div>
              <div class="sec-block__img-hint">JPG, PNG, WebP</div>
            </div>
          </div>
          <span class="sec-block__img-status" data-status></span>
          <div class="sec-block__img-divider">ou cole uma URL</div>
          <input
            type="text"
            class="sec-block__img-url-input"
            placeholder="https://…"
            value="${s.url || ''}"
            data-url-input
          />
        </div>`

    } else if (s.type === 'video') {
      body = `
        <div class="sec-block__video-wrap">
          <div class="sec-block__video-input">
            <span class="sec-block__video-icon">▶</span>
            <input type="text" placeholder="URL do YouTube…" value="${s.url || ''}" />
          </div>
        </div>`
    }

    block.innerHTML = `
      <div class="sec-block__bar">
        <span class="sec-block__type sec-block__type--${typeClass}">${typeLabel}</span>
        <div class="sec-block__actions">
          <button class="sec-block__btn" data-move="-1" data-idx="${i}" title="Subir"  ${i === 0 ? 'disabled' : ''}>↑</button>
          <button class="sec-block__btn" data-move="1"  data-idx="${i}" title="Descer" ${i === sections.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="sec-block__btn sec-block__btn--del" data-del="${i}" title="Remover">✕</button>
        </div>
      </div>
      ${body}
    `

    // ── Listeners por tipo ──────────────────────────────────────────────────

    if (s.type === 'paragraph' || s.type === 'quote') {
      const ta = block.querySelector('textarea')
      ta.addEventListener('input', e => { s.text = e.target.value; updateLivePreview() })
      ta.addEventListener('input', () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px' })

    } else if (s.type === 'image') {
      // Upload de arquivo
      const area     = block.querySelector('[data-upload-area]')
      const fileIn   = block.querySelector('[data-file-input]')
      const preview  = block.querySelector('[data-preview]')
      const filename = block.querySelector('[data-filename]')
      const status   = block.querySelector('[data-status]')
      const urlInput = block.querySelector('[data-url-input]')

      area.addEventListener('click', () => fileIn.click())

      fileIn.addEventListener('change', async () => {
        const file = fileIn.files[0]
        if (!file) return

        filename.textContent = file.name
        status.textContent   = 'Enviando…'

        // Preview local imediato
        const reader = new FileReader()
        reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block' }
        reader.readAsDataURL(file)

        const ext  = file.name.split('.').pop()
        const path = `${Date.now()}.${ext}`

        const { error } = await sb.storage.from('section-images').upload(path, file, { upsert: true })

        if (error) { status.textContent = '❌ ' + error.message; return }

        const { data: urlData } = sb.storage.from('section-images').getPublicUrl(path)
        s.url = urlData.publicUrl
        urlInput.value       = s.url
        status.textContent   = '✅ Enviado'
        updateLivePreview()
      })

      // URL digitada manualmente
      urlInput.addEventListener('input', e => {
        s.url = e.target.value
        // Limpa preview do upload se o usuário digitar URL
        preview.style.display = 'none'
        filename.textContent  = '📁 Clique para selecionar'
        status.textContent    = ''
        updateLivePreview()
      })

    } else if (s.type === 'video') {
      const input = block.querySelector('input[type="text"]')
      input.addEventListener('input', e => { s.url = e.target.value; updateLivePreview() })
    }

    // ── Drag & drop ─────────────────────────────────────────────────────────
    block.addEventListener('dragstart', () => { dragIdx = i; block.classList.add('sec-block--dragging') })
    block.addEventListener('dragend',   () => block.classList.remove('sec-block--dragging'))
    block.addEventListener('dragover',  e => { e.preventDefault(); block.classList.add('sec-block--drag-over') })
    block.addEventListener('dragleave', () => block.classList.remove('sec-block--drag-over'))
    block.addEventListener('drop', e => {
      e.preventDefault()
      block.classList.remove('sec-block--drag-over')
      if (dragIdx !== null && dragIdx !== i) {
        const moved = sections.splice(dragIdx, 1)[0]
        sections.splice(i, 0, moved)
        renderSections()
      }
    })

    wrapper.appendChild(block)
  })

  // Botões mover / deletar
  wrapper.querySelectorAll('[data-move]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx  = +btn.dataset.idx
      const dest = idx + +btn.dataset.move
      if (dest < 0 || dest >= sections.length) return
      ;[sections[idx], sections[dest]] = [sections[dest], sections[idx]]
      renderSections()
    })
  })

  wrapper.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      sections.splice(+btn.dataset.del, 1)
      renderSections()
    })
  })

  updateLivePreview()
}

// =============================================================================
// ADD SECTIONS
// =============================================================================
$('addText').addEventListener('click',  () => { sections.push({ type: 'paragraph', text: '' }); renderSections() })
$('addQuote').addEventListener('click', () => { sections.push({ type: 'quote',     text: '' }); renderSections() })
$('addImage').addEventListener('click', () => { sections.push({ type: 'image',     url: ''  }); renderSections() })
$('addVideo').addEventListener('click', () => { sections.push({ type: 'video',     url: ''  }); renderSections() })

// =============================================================================
// UPLOAD (banner + cover)
// =============================================================================
function setupUpload({ areaId, fileInputId, previewId, labelId, statusId, hiddenId, bucket }) {
  const area    = $(areaId)
  const fileIn  = $(fileInputId)
  const preview = $(previewId)
  const label   = $(labelId)
  const status  = $(statusId)
  const hidden  = $(hiddenId)

  area.addEventListener('click', () => fileIn.click())

  fileIn.addEventListener('change', async () => {
    const file = fileIn.files[0]
    if (!file) return

    label.textContent  = file.name
    status.textContent = 'Enviando…'

    const reader = new FileReader()
    reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block' }
    reader.readAsDataURL(file)

    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { error } = await sb.storage.from(bucket).upload(path, file, { upsert: true })
    if (error) { status.textContent = '❌ ' + error.message; return }

    const { data: urlData } = sb.storage.from(bucket).getPublicUrl(path)
    hidden.value       = urlData.publicUrl
    status.textContent = '✅ Enviado'
    updateLivePreview()
  })
}

setupUpload({ areaId: 'bannerUploadArea', fileInputId: 'fBannerFile', previewId: 'bannerPreview', labelId: 'bannerUploadLabel', statusId: 'bannerStatus', hiddenId: 'fBanner', bucket: 'banners' })
setupUpload({ areaId: 'coverUploadArea',  fileInputId: 'fCoverFile',  previewId: 'coverPreview',  labelId: 'coverUploadLabel',  statusId: 'coverStatus',  hiddenId: 'fCover',  bucket: 'covers'  })

// =============================================================================
// SAVE
// =============================================================================
$('saveReviewBtn').addEventListener('click', async () => {
  const btn = $('saveReviewBtn')
  btn.disabled    = true
  btn.textContent = 'Salvando…'

  const msg = $('saveMsg')
  msg.style.display = 'none'

  const payload = {
    title:      $('fTitle').value.trim(),
    slug:       $('fSlug').value.trim(),
    summary:    $('fSummary').value.trim(),
    platforms:  $('fPlatforms').value.trim(),
    score:      parseFloat($('fScore').value) || 0,
    banner_url: $('fBanner').value,
    cover_url:  $('fCover').value,
    category:   getCategory(),
    sections:   sections,
  }

  let error
  if (currentReviewId) {
    ;({ error } = await sb.from('reviews').update(payload).eq('id', currentReviewId))
  } else {
    ;({ error } = await sb.from('reviews').insert([payload]))
  }

  if (error) {
    msg.className     = 'editor__msg editor__msg--error'
    msg.textContent   = '❌ Erro: ' + error.message
    msg.style.display = 'block'
  } else {
    msg.className     = 'editor__msg editor__msg--success'
    msg.textContent   = '✅ Salvo com sucesso!'
    msg.style.display = 'block'
    await loadReviews()
  }

  btn.disabled    = false
  btn.textContent = '☕ Salvar'
})

// =============================================================================
// DELETE
// =============================================================================
$('deleteReviewBtn').addEventListener('click', async () => {
  if (!currentReviewId) return
  if (!confirm('Excluir esta review definitivamente?')) return

  const { error } = await sb.from('reviews').delete().eq('id', currentReviewId)
  if (error) { alert('Erro: ' + error.message); return }

  currentReviewId = null
  $('editorContent').style.display     = 'none'
  $('editorPlaceholder').style.display = 'flex'
  await loadReviews()
})

// =============================================================================
// LOAD REVIEWS
// =============================================================================
async function loadReviews() {
  const { data, error } = await sb
    .from('reviews')
    .select('id, title, slug, summary, platforms, score, banner_url, cover_url, category, sections')
    .order('created_at', { ascending: false })

  if (error) { console.error('loadReviews:', error); return }

  reviews = data || []
  $('reviewCount').textContent = reviews.length

  const list = $('reviewList')
  if (!reviews.length) {
    list.innerHTML = '<p class="sidebar__loading">Nenhuma review ainda.</p>'
    return
  }

  list.innerHTML = reviews.map(r => `
    <div class="review-item ${r.id === currentReviewId ? 'review-item--active' : ''}" data-id="${r.id}">
      <img class="review-item__thumb" src="${r.cover_url || r.banner_url || ''}" alt="" onerror="this.style.visibility='hidden'" />
      <div class="review-item__info">
        <p class="review-item__title">${r.title || 'Sem título'}</p>
        <p class="review-item__meta review-item__meta--${r.category || 'game'}">
          ${r.category === 'anime' ? '🎎 Anime' : '🎮 Jogo'}${r.slug ? ' · ' + r.slug : ''}
        </p>
      </div>
    </div>
  `).join('')

  list.querySelectorAll('.review-item').forEach(el => {
    el.addEventListener('click', () => {
      const rev = reviews.find(r => r.id == el.dataset.id)
      if (rev) openReview(rev)
    })
  })
}

// =============================================================================
// OPEN REVIEW
// =============================================================================
function openReview(rev) {
  currentReviewId = rev.id

  $('editorPlaceholder').style.display  = 'none'
  $('editorContent').style.display      = 'block'
  $('deleteReviewBtn').style.display    = 'inline-flex'
  $('editorTitle').textContent          = rev.title || 'Sem título'
  $('saveMsg').style.display            = 'none'

  $('fTitle').value     = rev.title      || ''
  $('fSlug').value      = rev.slug       || ''
  $('fSummary').value   = rev.summary    || ''
  $('fPlatforms').value = rev.platforms  || ''
  $('fScore').value     = rev.score      ?? ''
  $('fBanner').value    = rev.banner_url || ''
  $('fCover').value     = rev.cover_url  || ''

  const bp = $('bannerPreview')
  if (rev.banner_url) { bp.src = rev.banner_url; bp.style.display = 'block'; $('bannerUploadLabel').textContent = 'Banner carregado' }
  else { bp.style.display = 'none'; $('bannerUploadLabel').textContent = '📁 Clique para selecionar' }

  const cp = $('coverPreview')
  if (rev.cover_url) { cp.src = rev.cover_url; cp.style.display = 'block'; $('coverUploadLabel').textContent = 'Capa carregada' }
  else { cp.style.display = 'none'; $('coverUploadLabel').textContent = '📁 Clique para selecionar' }

  const radio = document.querySelector(`input[name="fCategory"][value="${rev.category || 'game'}"]`)
  if (radio) radio.checked = true

  sections = Array.isArray(rev.sections) ? rev.sections : []
  renderSections()
  $('editorPanel').scrollTo({ top: 0, behavior: 'smooth' })
}

// =============================================================================
// NEW REVIEW
// =============================================================================
$('newReviewBtn').addEventListener('click', () => {
  currentReviewId = null

  $('editorPlaceholder').style.display  = 'none'
  $('editorContent').style.display      = 'block'
  $('deleteReviewBtn').style.display    = 'none'
  $('editorTitle').textContent          = 'Nova review'
  $('saveMsg').style.display            = 'none'

  $('fTitle').value = $('fSlug').value = $('fSummary').value =
    $('fPlatforms').value = $('fScore').value = $('fBanner').value = $('fCover').value = ''

  const bp = $('bannerPreview'); bp.style.display = 'none'; $('bannerUploadLabel').textContent = '📁 Clique para selecionar'
  const cp = $('coverPreview');  cp.style.display = 'none'; $('coverUploadLabel').textContent  = '📁 Clique para selecionar'

  document.querySelector('input[name="fCategory"][value="game"]').checked = true
  sections = []
  renderSections()
})

// =============================================================================
// LOGIN / LOGOUT
// =============================================================================
$('loginBtn').addEventListener('click', async () => {
  const email    = $('loginEmail').value.trim()
  const password = $('loginPassword').value
  const msg      = $('loginMsg')

  if (!email || !password) {
    msg.className = 'login__msg login__msg--error'
    msg.textContent = 'Preencha e-mail e senha.'
    return
  }

  msg.className = 'login__msg'
  msg.textContent = 'Entrando…'

  const { error } = await sb.auth.signInWithPassword({ email, password })
  if (error) {
    msg.className   = 'login__msg login__msg--error'
    msg.textContent = 'Credenciais inválidas.'
  }
})

$('loginPassword').addEventListener('keydown', e => { if (e.key === 'Enter') $('loginBtn').click() })
$('logoutBtn').addEventListener('click', async () => { await sb.auth.signOut() })

// =============================================================================
// AUTH STATE
// =============================================================================
sb.auth.onAuthStateChange((event, session) => {
  if (session) {
    $('loginScreen').style.display = 'none'
    $('adminScreen').style.display = 'flex'
    $('userEmail').textContent     = session.user.email
    $('loginMsg').textContent      = ''
    loadReviews()
  } else {
    $('adminScreen').style.display = 'none'
    $('loginScreen').style.display = 'flex'
  }
})
