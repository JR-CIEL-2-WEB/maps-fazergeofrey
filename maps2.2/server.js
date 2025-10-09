const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  // Définir le chemin vers votre fichier index.html
  const filePath = path.join(__dirname, 'ex1.1.html');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Erreur serveur : ' + err.code);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Le serveur tourne sur http://localhost:${port}`);
});