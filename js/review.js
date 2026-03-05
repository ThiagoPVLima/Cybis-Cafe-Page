import atelierImg     from '../img/atelier-iris-3.png'
import bullyImg       from '../img/Bully_cover.png'
import crashImg       from '../img/crash-bandicoot.png'
import dkImg          from '../img/donkey-kong-country.png'
import falloutImg     from '../img/fallout-3.png'
import gtaImg         from '../img/Grand_Theft_Auto_San_Andreas_capa.png'
import marioImg       from '../img/mario-world.png'
import runeImg        from '../img/rune-factory-special.png'

document.documentElement.classList.add('js-ready')

const REVIEWS = {
  'atelier-iris-3': {
    title: 'Atelier Iris 3',
    banner: atelierImg,
    summary: 'Uma jornada encantadora pelo mundo de Iris',
    body: [
      { type: 'text', content: 'Atelier Iris 3: Grand Phantasm é um RPG de turno desenvolvido pela Gust e lançado originalmente em 2006. O jogo é o terceiro capítulo da série Atelier Iris e traz uma proposta mais ousada em termos de ritmo e combate em relação aos seus predecessores.' },
      { type: 'quote', content: 'Uma das experiências mais subestimadas do PlayStation 2. Quem passou direto perdeu um tesouro.' },
      { type: 'text', content: 'O sistema de combate foi reformulado para incluir mecânicas de "Edge", que permitem acumular pontos durante as batalhas e utilizá-los para ataques especiais ou fusões de itens em tempo real. É um sistema que recompensa quem presta atenção e pensa antes de agir.' },
      { type: 'text', content: 'A história segue Edge Vanhite e Iris Fortner, dois exploradores que atravessam portais chamados "Edge Gates" em busca de missões e aventuras. A narrativa é leve, por vezes cômica, mas não descarta momentos de peso emocional nos arcos secundários dos personagens.' },
      { type: 'quote', content: 'O sistema de crafting ainda aguenta o tranco. É satisfatório sem ser tedioso.' },
      { type: 'text', content: 'Visualmente, o jogo mantém o estilo anime característico da série com sprites detalhados e cenários coloridos. A trilha sonora é memorável — algumas faixas ficam na cabeça por dias. Em termos de duração, você vai gastar entre 30 a 40 horas para uma run tranquila.' },
      { type: 'text', content: 'No geral, Atelier Iris 3 é um jogo que recompensa paciência e curiosidade. Não é perfeito — o início é lento e a curva de dificuldade pode frustrar em alguns chefes tardios — mas é exatamente o tipo de jogo que você vai recomendar para amigos que gostam de RPG com personalidade.' },
    ],
  },
  'bully': {
    title: 'Bully',
    banner: bullyImg,
    summary: 'Caos escolar com coração',
    body: [
      { type: 'text', content: 'Bully, desenvolvido pela Rockstar Vancouver em 2006, é um dos jogos mais injustiçados da geração PS2. Enquanto o nome causou polêmica antes mesmo do lançamento, o que entregou foi uma das experiências mais humanas e bem escritas do estúdio até então.' },
      { type: 'quote', content: 'Rockstar fez um jogo sobre escola e saiu melhor do que 90% dos jogos sobre adultos.' },
      { type: 'text', content: 'Você controla Jimmy Hopkins, um adolescente problemático jogado numa escola interna chamada Bullworth Academy. A proposta é simples: sobreviver ao ambiente hostil, ganhar respeito dos diferentes grupos sociais e descobrir o que está podendo por trás da administração da escola.' },
      { type: 'text', content: 'O gameplay é uma versão compacta e focada do estilo Rockstar: mundo aberto, missões em sequência por capítulos, e um sistema de reputação entre os cliques da escola. É menos ambicioso que GTA em escala, mas muito mais coeso em design. Cada mecânica existe por uma razão.' },
      { type: 'quote', content: 'A estrutura em capítulos faz Bully fluir melhor do que qualquer GTA da época.' },
      { type: 'text', content: 'A Scholarship Edition, versão expandida lançada em 2008, adicionou novas missões e conteúdo. É a versão recomendada para quem quer mergulhar de cabeça. Bully é um daqueles jogos que envelhece bem justamente porque seu coração sempre foi a história.' },
    ],
  },
  'crash-bandicoot': {
    title: 'Crash Bandicoot',
    banner: crashImg,
    summary: 'O marsupial que definiu uma geração',
    body: [
      { type: 'text', content: 'Crash Bandicoot, lançado em 1996 pela Naughty Dog, chegou numa época em que todos queriam um mascote para competir com Mario e Sonic. Sony apostou no marsupial alaranjado — e apostou certo. O resultado foi um platformer 3D que desafiou os limites técnicos do PS1.' },
      { type: 'quote', content: 'Crash não te deu o mapa do mundo. Ele te deu uma fase e disse: vai lá.' },
      { type: 'text', content: 'O design das fases é o ponto mais forte: cada mundo tem uma identidade visual e mecânica distinta. Você corre para a câmera fugindo de pedras, avança em perspectiva lateral, ou navega por pântanos e templos. A variedade é constante sem que nada pareça forçado.' },
      { type: 'text', content: 'A dificuldade é honesta — às vezes brutalmente honesta. Alguns níveis exigem precisão cirúrgica e paciência de santo. Mas quando você supera um desses momentos, a satisfação é proporcional.' },
      { type: 'quote', content: 'N. Sane Trilogy provou que o jogo original ainda tem osso. Muita gente não passou do segundo mundo.' },
      { type: 'text', content: 'A N. Sane Trilogy de 2017 trouxe o jogo de volta com visuais modernos e controles revisados. É a melhor forma de jogar hoje. Mas quem jogou na época sabe: no PS1, com aquele CD carregando, tinha uma magia que não se replica.' },
    ],
  },
  'donkey-kong-country': {
    title: 'Donkey Kong Country',
    banner: dkImg,
    summary: 'O SNES mostrou do que era capaz',
    body: [
      { type: 'text', content: 'Donkey Kong Country, lançado em 1994 pela Rare para Super Nintendo, foi um evento. Os gráficos pré-renderizados em 3D num cartucho de SNES deixaram a indústria de queixo caído. Mas além do visual impressionante para a época, o jogo entregou um platformer de altíssima qualidade.' },
      { type: 'quote', content: 'Quando esse jogo saiu, as pessoas achavam que eram gráficos de console novo. Era SNES.' },
      { type: 'text', content: 'O design de fases é exemplar: cada mundo introduz novas mecânicas e as desenvolve com inteligência. Minas com carrinho de trilho, fases subaquáticas com ritmo próprio, cavernas geladas que testam seu controle.' },
      { type: 'text', content: 'A trilha sonora de David Wise é lendária. "Aquatic Ambiance", "Funky\'s Fugue", "Gangplank Galleon" — são composições que definiram o que música de videogame poderia ser emocionalmente.' },
      { type: 'quote', content: 'Aquatic Ambiance é uma das melhores músicas já compostas para um jogo. Ponto.' },
      { type: 'text', content: 'DKC envelheceu muito bem. É exigente, mas justo. Longo o suficiente para valer a jornada, sem ser padded. Os sequências no SNES melhoraram a fórmula, mas o original tem um charme que nenhum deles conseguiu replicar completamente.' },
    ],
  },
  'fallout-3': {
    title: 'Fallout 3',
    banner: falloutImg,
    summary: 'O fim do mundo nunca foi tão bom de explorar',
    body: [
      { type: 'text', content: 'Fallout 3, lançado pela Bethesda em 2008, foi o momento em que a série saiu do nicho de RPG isométrico clássico e se tornou um fenômeno mainstream. Com perspectiva em primeira pessoa e um mundo aberto vasto, o jogo apresentou o Capital Wasteland para uma geração inteira.' },
      { type: 'quote', content: 'Sair do Vault 101 pela primeira vez é um dos momentos mais marcantes da geração.' },
      { type: 'text', content: 'O VATS — sistema de combate por turnos opcional — foi um achado: permite pausar a ação, selecionar partes do corpo do inimigo e calcular probabilidades de acerto. É satisfatório no nível visceral e estratégico ao mesmo tempo.' },
      { type: 'text', content: 'A narrativa principal é funcional sem ser brilhante, mas o verdadeiro trunfo está nas histórias secundárias espalhadas pelo mapa. Cada bunker abandonado, cada nota encontrada no chão de um apartamento destruído conta uma história.' },
      { type: 'quote', content: 'A DLC The Pitt é melhor do que a história principal. Não é uma crítica. É um elogio às duas.' },
      { type: 'text', content: 'Olhando para trás, Fallout 3 tem suas falhas — a IA de combate envelhece mal, a estabilidade técnica era sempre questionável. Mas o mundo? O mundo ainda é extraordinário. Um monumento ao que level design ambiental pode fazer por uma narrativa.' },
    ],
  },
  'gta-san-andreas': {
    title: 'GTA: San Andreas',
    banner: gtaImg,
    summary: 'O maior playground do PS2',
    body: [
      { type: 'text', content: 'Grand Theft Auto: San Andreas, lançado pela Rockstar em 2004, não foi apenas o maior jogo do PS2 — foi uma declaração de intenções sobre o que mundo aberto poderia significar. Três cidades, um estado inteiro, dezenas de missões principais e um número absurdo de atividades secundárias.' },
      { type: 'quote', content: 'San Andreas não era um jogo. Era um lugar. Você morava lá por semanas.' },
      { type: 'text', content: 'A história de CJ — Carl Johnson — voltando a Los Santos após a morte da mãe é, surpreendentemente, uma das narrativas mais humanas que a Rockstar já escreveu. Tem traição, lealdade, ambição e humor ácido.' },
      { type: 'text', content: 'O sistema de RPG integrado foi revolucionário: CJ ganha peso se você comer demais, fica mais forte se malhar, melhora suas habilidades de tiro, pilotagem, natação e ciclismo com o uso.' },
      { type: 'quote', content: 'Nenhum jogo antes fez você se preocupar com o peso do personagem. San Andreas fez.' },
      { type: 'text', content: 'Vinte anos depois, San Andreas ainda é referência. Não por nostalgia — mas porque a densidade do mundo e a liberdade que oferecia nunca foram completamente superadas em termos de espírito.' },
    ],
  },
  'mario-world': {
    title: 'Super Mario World',
    banner: marioImg,
    summary: 'O jogo que acompanhou o nascimento do SNES',
    body: [
      { type: 'text', content: 'Super Mario World foi lançado em 1990 como título de lançamento do Super Nintendo e estabeleceu imediatamente o padrão de qualidade que o console deveria perseguir. É, provavelmente, o platformer mais bem-executado de todos os tempos.' },
      { type: 'quote', content: 'Miyamoto não faz jogos. Ele projeta sistemas de aprendizado disfarçados de entretenimento.' },
      { type: 'text', content: 'Yoshi foi introduzido aqui — o dinossauro verde que engole inimigos e pode ser usado como plataforma temporária. É uma adição que parece simples, mas adiciona camadas de profundidade ao design de fases.' },
      { type: 'text', content: 'O mapa do mundo é não-linear de uma forma que Mario 3 apenas insinuou. Há saídas secretas em diversas fases que desbloqueiam caminhos alternativos, mundos escondidos e um nível de recompensa à exploração que poucos jogos da época alcançaram.' },
      { type: 'quote', content: 'As saídas secretas do Special World são o equivalente de uma pós-graduação em Mario.' },
      { type: 'text', content: 'Super Mario World tem 96 saídas. A maioria dos jogadores casuais encontra 40, talvez 50. É um jogo que continua ensinando décadas depois.' },
    ],
  },
  'rune-factory': {
    title: 'Rune Factory Special',
    banner: runeImg,
    summary: 'Farming, batalha e coração num só pacote',
    body: [
      { type: 'text', content: 'Rune Factory: A Fantasy Harvest Moon, lançado em 2006 para Nintendo DS, nasceu de uma pergunta simples: e se Harvest Moon tivesse masmorras? O resultado foi uma série que combinou simulação de fazenda com RPG de ação de forma tão natural que parece óbvio em retrospecto.' },
      { type: 'quote', content: 'Rune Factory pegou Harvest Moon e perguntou: mas e se você também pudesse matar monstros?' },
      { type: 'text', content: 'Você planta, colhe, cria relações com os habitantes da vila, mas também explora masmorras, luta contra chefes e domina monstros para trabalharem em sua fazenda. A integração entre as duas metades é o diferencial.' },
      { type: 'text', content: 'O sistema de relacionamento é profundo para a época: cada personagem tem rotina, diálogos variados por dia e estação, e preferências pessoais. Tudo contribui para construir conexões que mudam o rumo da narrativa.' },
      { type: 'quote', content: 'A série Rune Factory entendeu que cozy game e desafio não são opostos.' },
      { type: 'text', content: 'Rune Factory Special é o remaster do primeiro jogo com melhorias visuais e de qualidade de vida. É a melhor porta de entrada para uma série que continua viva e em excelente forma.' },
    ],
  },
}

const params  = new URLSearchParams(window.location.search)
const gameKey = params.get('game')
const review  = REVIEWS[gameKey]

function renderReview() {
  if (!review) {
    document.querySelector('.review-page__content').innerHTML =
      '<p class="review-page__not-found">Review não encontrado.</p>'
    return
  }

  document.title = `${review.title} — Cybis Café`

  const bannerImg = document.querySelector('.review-page__banner img')
  bannerImg.src = review.banner
  bannerImg.alt = review.title

  document.querySelector('.review-page__title').textContent    = review.title
  document.querySelector('.review-page__summary').textContent  = review.summary

  const body = document.querySelector('.review-page__body')
  body.innerHTML = ''

  review.body.forEach((block, i) => {
    if (block.type === 'text') {
      const p = document.createElement('p')
      p.className = 'review-page__paragraph'
      p.setAttribute('data-reveal', i % 3 === 0 ? '' : `delay-${i % 3}`)
      p.textContent = block.content
      body.appendChild(p)
    } else if (block.type === 'quote') {
      const bq = document.createElement('blockquote')
      bq.className = 'review-page__quote'
      bq.setAttribute('data-reveal', 'scale')
      bq.textContent = block.content
      body.appendChild(bq)
    }
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
}

document.addEventListener('DOMContentLoaded', () => {
  renderReview()
  document.body.classList.add('page-entering')
})
