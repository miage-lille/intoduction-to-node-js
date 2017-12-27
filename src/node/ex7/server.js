import http from 'http';
import url from 'url';
export function persistence(num) {
  //TODO
}

const server = http.createServer((request, response) => {
  const myURL = url.parse(request.url, true);
  const num = myURL.query.num || 0; //just to avoid errors
  //TODO
});
server.listen(5000);
