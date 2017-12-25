import http from 'http';

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/json' });
  response.write('{"message" : "Aaaaaaarg"}');
  response.end();
});

server.listen(8080);
console.log('Server is listening');
