# ☕ Cybis Café

> Site oficial do streamer **Raphael Cybis** — reviews de jogos, lives e muito entretenimento com aroma de café.

**[→ Ver no ar](https://cybis-cafe-page.vercel.app/)**

---

## 🎮 Sobre o projeto

O Cybis Café é o hub digital do Raphael Cybis: um lugar onde reviews de jogos ganham vida com textos, imagens, citações e vídeos do YouTube — tudo gerenciado por um painel admin construído do zero, sem framework de UI.

O design carrega a identidade do café em cada detalhe: biscoitinhos espalhados pelo fundo, gradiente laranja-âmbar, tipografia com Cooper Black e Philosopher, e uma vibe aconchegante que combina com o canal.

---

## ✨ Funcionalidades

- **Carrossel de reviews** com navegação por setas e clique nas capas
- **Página de review individual** com banner, metadata, scroll reveal e blocos de conteúdo dinâmicos
- **Blocos de conteúdo**: parágrafos, citações, imagens com upload e players de YouTube
- **Painel Admin** completo com autenticação, CRUD de reviews, drag & drop para reordenar blocos e upload de imagens direto para o Supabase Storage
- **Deploy automático** via Vercel a cada push no GitHub

---

## 🛠 Stack

| Camada | Tecnologia |
|---|---|
| Bundler | Parcel 2 |
| Estilos | SCSS modular — arquitetura ITCSS |
| Tipografia fluida | [Utopia](https://utopia.fyi/) (fluid type + spacing) |
| Carrossel | Glide.js |
| Backend / Auth | Supabase (PostgreSQL + Auth + Storage) |
| Deploy | Vercel (CI/CD automático) |
| Lint | Stylelint |

---

## 📁 Estrutura SCSS

```
style/
├── 01-settings/     # Tokens: cores, tipografia, espaçamento, z-index
├── 02-tools/        # Funções e mixins
├── 03-generics/     # Reset, normalize, box-sizing
├── 04-elements/     # Elementos base (typography, form, list)
├── 05-objects/      # Objetos reutilizáveis (card, backgrounds, section-title)
├── 06-components/   # Componentes (hero, footer, admin, review-page...)
└── 99-utilities/    # Classes utilitárias
```

---

## 🗄 Banco de dados

Tabela `public.reviews` no Supabase:

```sql
id          uuid
created_at  timestamptz
title       text
slug        text
summary     text
banner_url  text
cover_url   text
platforms   text
score       numeric
sections    jsonb   -- blocos de conteúdo: paragraph | quote | image | video
```

---

## 🚀 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/ThiagoPVLima/Cibys-Cafe-Page.git
cd Cibys-Cafe-Page

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:1234`

---

## 🔐 Admin

O painel admin fica em `/admin.html`. O acesso requer autenticação via Supabase Auth — só funciona com e-mail e senha cadastrados no projeto Supabase.

Funcionalidades do admin:
- Criar, editar e excluir reviews
- Upload de banner e capa para o Supabase Storage
- Editor de conteúdo com blocos arrastáveis (drag & drop)
- Preview de thumbnail do YouTube ao colar um link

---

## 📦 Build e deploy

```bash
# Build de produção
npm run build
```

O deploy é automático: qualquer push na branch principal dispara um novo build no Vercel.

---

## 👨‍💻 Desenvolvido por

**Thiago Lima**
[GitHub](https://github.com/ThiagoPVLima) · [Behance](https://www.behance.net/LimaThii) · [LinkedIn](https://www.linkedin.com/in/thiago-lima-312a0aaa/)

---

<p align="center">
  Feito com ☕ e muito biscoitinho
</p>
