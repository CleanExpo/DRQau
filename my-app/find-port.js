const net = require("net");

function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => {
        console.log(port); // Just output the port number
      });
    });
    server.on("error", () => {
      findAvailablePort(startPort + 1).then(resolve, reject);
    });
  });
}

findAvailablePort(3000);
