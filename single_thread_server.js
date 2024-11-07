const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Single thread response");
});

server.listen(8001, () => {
  console.log("Single thread server running on port 8001");
});
