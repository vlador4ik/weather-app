import { createServer } from "node:http";
import "dotenv/config";

const port = 3000;

const server = createServer((request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method === "GET" && request.url === "/api/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
