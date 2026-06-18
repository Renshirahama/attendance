import { createReadStream, existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve(".");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/" || pathname === "/login") {
    pathname = "/index.html";
  }

  const requestedPath = resolve(join(root, pathname));
  if (requestedPath.startsWith(root) && existsSync(requestedPath)) {
    response.setHeader("Content-Type", types[extname(requestedPath)] || "application/octet-stream");
    createReadStream(requestedPath).pipe(response);
    return;
  }

  if (extname(pathname)) {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Not found");
    return;
  }

  const filePath = join(root, "index.html");

  response.setHeader("Content-Type", types[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Attendance app running at http://localhost:${port}`);
});
