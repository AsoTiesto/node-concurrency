const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master process is running with PID: ${process.pid}`);
  console.log(`Creating ${numCPUs} worker processes...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      let sum = 0;
      for (let i = 0; i < 1e7; i++) {
        sum += i;
      }
      res.writeHead(200);
      res.end(`Handled by worker ${process.pid} with sum: ${sum}`);
    })
    .listen(8002);

  console.log(`Worker process started with PID: ${process.pid}`);
}
