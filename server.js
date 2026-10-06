"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT) || 8000;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

function send(res, status, message) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store"
  });
  res.end(message);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return send(res, 405, "Método não permitido");
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch (_) {
    return send(res, 400, "Endereço inválido");
  }

  // Não disponibiliza arquivos e pastas ocultos, como .git e .claude.
  if (pathname.split("/").some((part) => part.startsWith("."))) {
    return send(res, 404, "Não encontrado");
  }

  let filePath = path.resolve(ROOT, `.${pathname}`);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return send(res, 403, "Acesso negado");
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError) return send(res, 404, "Não encontrado");
    if (stat.isDirectory()) filePath = path.join(filePath, "index.html");

    fs.stat(filePath, (fileError, fileStat) => {
      if (fileError || !fileStat.isFile()) return send(res, 404, "Não encontrado");

      res.writeHead(200, {
        "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "Content-Length": fileStat.size,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache"
      });

      if (req.method === "HEAD") return res.end();
      fs.createReadStream(filePath).pipe(res);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Guia do Japão disponível em http://${HOST}:${PORT}`);
  console.log("Pressione Ctrl+C para encerrar.");
});

server.on("error", (error) => {
  console.error(`Não foi possível iniciar o servidor: ${error.message}`);
  process.exitCode = 1;
});
