const http = require("http");

const server = http.createServer((req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  res.writeHead(200);
  res.end(`Single thread response with sum: ${sum}`);
});

server.listen(8001, () => {
  console.log("Single thread server running on port 8001");
});
