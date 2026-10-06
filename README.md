# Guia da Viagem ao Japão 🗾

PWA de bolso para a viagem da família ao Japão. Funciona offline, é instalável no celular e tem: contagem regressiva, roteiro por dia, guia de locais com histórias, fotos e curiosidades, conversor de iene ⇄ real, frases úteis (com áudio em japonês), hotéis, informações práticas e cartão de emergência.

## Como editar o conteúdo

O conteúdo principal fica em **`content.json`** e as curiosidades, detalhes extras e créditos das fotos ficam em **`location-extras.json`**. Edite os arquivos, salve e dê push na `main`; o GitHub Pages publica automaticamente.

## Rodar localmente

Precisa ser servido por HTTP (abrir o arquivo direto pelo `file://` quebra o modo offline):

```bash
node server.js
# abra http://localhost:8000
```

O servidor usa apenas módulos nativos do Node.js. Para escolher outra porta, use `PORT=8080 node server.js`.

## Publicar (GitHub Pages)

Settings → Pages → Source: branch `main`, pasta `/ (root)`. Cada push na `main` atualiza o app.

## Instalar no celular

Abra o link publicado usando internet. No Android, use o menu do Chrome → **Instalar app** (ou **Adicionar à tela inicial**). No iPhone, abra no Safari, toque em **Compartilhar** → **Adicionar à Tela de Início**.

## Estrutura

- `index.html` — o app inteiro (HTML + CSS + JS).
- `content.json` — roteiro, locais e demais conteúdos editáveis.
- `location-extras.json` — curiosidades, detalhes complementares e créditos/licenças das fotos dos locais.
- `img/locations/` — fotos otimizadas para o guia.
- `sw.js` — service worker (offline).
- `manifest.webmanifest` / `icon.svg` — instalação como app.

## Observações

- A cotação atualiza sozinha quando há internet (via open.er-api.com) e pode ser ajustada à mão. Offline, usa a última cotação salva.
- O áudio das frases usa a voz japonesa do próprio celular; se o aparelho não tiver, o botão avisa.
