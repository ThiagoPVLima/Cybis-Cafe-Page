# Relatório de Revisão — Cybis Café

## Linguagens e Ferramentas

| Recurso | Detalhe |
|---|---|
| HTML | HTML5 semântico |
| CSS/SCSS | SCSS com arquitetura **ITCSS** (7 camadas) |
| JavaScript | ES Modules (import/export) |
| Bundler | Parcel 2 |
| Carrossel | Glide.js v3 |
| Linting | Stylelint + Prettier |

---

## Problemas corrigidos

### HTML (`index.html`)

1. **Hierarquia de headings incorreta** — todos os títulos de seção e card usavam `<h1>`. Corrigido para `<h2>` (seções) e `<h3>` (cards).
2. **Carrossel não funcionava** — A `<div class="glide">` fechava antes do `</section>`, deixando o markup inválido. Corrigido. Glide agora inicializa corretamente no JS, com breakpoints responsivos.
3. **Ordem dos scripts** — O script inline do Glide estava antes do CDN, causando `Glide is not defined`. Scripts movidos para o final do `<body>`, CDN carregado antes do módulo JS.
4. **`node_modules` referenciados no HTML** — Os `<link>` do Glide apontavam para `node_modules/`, o que não funciona em produção. Substituído pelo CDN do jsDelivr.
5. **`lang="pt-br"`** — corrigido para `lang="pt-BR"` (capitalização correta da BCP 47).
6. **Meta `description` ausente** — Adicionada.
7. **Imagens sem `alt` descritivos** — Slides do carrossel e imagens dos cards não tinham texto alternativo. Todos corrigidos.
8. **Links `target="_blank"` sem `rel`** — Adicionado `rel="noopener noreferrer"` em todos.
9. **Typo "Pataformas"** — Corrigido para "Plataformas".
10. **Typo "Prapare-se"** — Corrigido para "Prepare-se".
11. **"Create By"** — Corrigido para "Criado por".
12. **"All Right Reseverd"** — Corrigido para "Todos os direitos reservados".
13. **Copyright sem entidade HTML** — Substituído texto literal por `&copy;`.
14. **Elementos `<p>` dentro de `<a>` no footer** — Inválido em HTML5. Substituído por `<ul>/<li>/<a>`.
15. **`<div class="about">` duplicada** — O `<section class="about">` continha outra `<div class="about">` criando ambiguidade de classe. Renomeado para `about__inner`.
16. **`<div class="cta">` sem ser `<section>`** — Promovido para `<section>` com `aria-labelledby`.
17. **Acessibilidade** — Adicionados `aria-label`, `aria-labelledby`, `role="button"` + `tabindex="0"` nas imagens interativas, `aria-hidden` em elementos decorativos.
18. **Imagens de placeholder** — Cards de services usavam `https://placehold.co/114`. Substituídas por imagem local (`cookie.png`).

### JavaScript (`js/index.js`)

1. **`contadorCliques` vs lógica** — A lógica estava invertida: miau1 tocava nos primeiros 3 cliques mas *sem* reiniciar; miau2 tocava no 4º e zerava. Comportamento preservado mas simplificado e corrigido.
2. **Sem reinício do áudio** — Se o usuário clicava rapidamente, o áudio não reiniciava. Adicionado `audio.currentTime = 0` antes de `.play()`.
3. **Glide inicializado inline no HTML** — Movido para `index.js` com guard `typeof Glide !== 'undefined'`.
4. **Carrossel sem breakpoints** — Adicionados `breakpoints` responsivos (1024/768/480px).
5. **Sem suporte a teclado** — As imagens interativas não respondiam a `Enter`/`Space`. Adicionado `keydown` listener.

### SCSS

1. **Valores numéricos sem unidade** — `top: 720`, `top: 656`, `height: 1440`, `top: 720` em `_about.scss`. Adicionado `px`.
2. **Typo `trasform`** — Em `_cta.scss`: `transition: trasform 0.8s ease`. Corrigido para `transform`.
3. **`rgba()` legado** — Substituído por `rgb(0 0 0 / 30%)` (sintaxe moderna Level 4).
4. **`height: 720px` fixo sem `min-height`** — Seções quebravam com conteúdo dinâmico. Trocado por `min-height: 720px`.
5. **`margin: 0 90px` seguido de `margin: 0 auto`** — Em `_headline.scss` havia declaração duplicada redundante. Removida.
6. **Separadores `- Services -`** — Traços tipograficamente fracos. Substituídos por `—` (em dash).
7. **Animação `text-slider`** — `translateX(-100%)` movia o texto para fora da tela sem loop suave. Corrigido para `-50%` (duplicar o conteúdo garante loop infinito contínuo).
8. **`border: 1px solid green`** — Debug esquecido em `.glide`. Removido.
9. **`font-size: 32px` / `font-size: 22px` hardcoded** — Substituídos por tokens `--font-step-*`.
10. **Line-endings CRLF** — Vários arquivos tinham `\r\n`. Normalizados para `\n`.
11. **`grid-area: header/main/footer`** — Declarados nos elementos, mas `body` não usa `display: grid`. Removidos.
12. **`.bg-cookie::before` sem `height`** — O padrão de cookie não aparecia porque `height` não estava definida. Corrigido com `inset: 0`.
13. **Títulos do footer como `h1/h2/h3/h4`** — Ruins semanticamente; no CSS eram estilizados por tag ao invés de classe. Refatorado para classes `footer__brand`, `footer__credits`, `footer__copyright`.
14. **Cards de clientes com múltiplos `<p>` dentro do card** — Conteúdo de citação envolto em `<blockquote>`.
