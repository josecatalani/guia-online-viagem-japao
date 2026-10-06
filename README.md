# Guia da Viagem ao Japão 🗾

PWA de bolso para a viagem da família a Tóquio. Funciona offline, é instalável no celular e tem: contagem regressiva, roteiro por dia, guia de locais com história e dicas, conversor de iene ⇄ real, frases úteis (com áudio em japonês), hotéis, informações práticas e cartão de emergência.

## Como editar o conteúdo

Todo o conteúdo fica em **`content.json`** — não precisa mexer em código. Edite os textos (roteiro, locais, hotéis, frases, emergência), salve e dê push na `main`. O GitHub Pages publica automaticamente.

## Rodar localmente

Precisa ser servido por HTTP (abrir o arquivo direto pelo `file://` quebra o modo offline):

```bash
node server.js
# abra http://localhost:8000
```

O servidor usa apenas módulos nativos do Node.js. Para escolher outra porta, use `PORT=8080 node server.js`.

## Publicar (GitHub Pages)

Settings → Pages → Source: branch `main`, pasta `/ (root)`. Cada push na `main` atualiza o app.

## Estrutura

- `index.html` — o app inteiro (HTML + CSS + JS).
- `content.json` — conteúdo editável.
- `sw.js` — service worker (offline).
- `manifest.webmanifest` / `icon.svg` — instalação como app.

## Observações

- A cotação atualiza sozinha quando há internet (via open.er-api.com) e pode ser ajustada à mão. Offline, usa a última cotação salva.
- O áudio das frases usa a voz japonesa do próprio celular; se o aparelho não tiver, o botão avisa.
