import http from 'http';

const port = process.env.PORT || 3000;
const name = process.env.NAME || 'name-server';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`<h1>Hello World</h1><p style="color:red;text-size:20px">Server is running on port ${port}</p>`);
});

server.listen(port, () => {
  console.log(`${name} running at http://localhost:${port}`);
});
