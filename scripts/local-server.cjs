const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT) || 5173;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }

  const filePath = path.resolve(root, `.${pathname}`);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  const target = path.join(filePath, "index.html");
  fs.stat(filePath, (statError, stat) => {
    const resolved = !statError && stat.isDirectory() ? target : filePath;
    fs.readFile(resolved, (error, data) => {
      if (error) {
        res.writeHead(error.code === "ENOENT" ? 404 : 500).end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(resolved).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(req.method === "HEAD" ? undefined : data);
    });
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`LEA website running at http://localhost:${port}`);
});
