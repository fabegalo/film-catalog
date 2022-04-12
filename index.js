const express = require('express');
const serveIndex = require('serve-index');

const fs = require('fs');

const { readFileSync } = require('fs');
const { join } = require('path');
//const file = readFileSync(join(__dirname, 'config', 'ci.yml'), 'utf8');

const app = express();

app.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.use('./public', express.static('public'));
app.use('./public', serveIndex('public'));

app.use('./dist', express.static('dist'));
app.use('./dist', serveIndex('dist'));

app.get('/', (req, res) => {
  res.send('Successful response RAIZ !.');
});

app.use(express.json());

app.post('/register', function (request, response) {

  fs.readFile('./films.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      film = request.body.film[0];

      data = JSON.parse(data);

      if (data.films != undefined) {
        data.films.push({ nome: film.nome, data: film.data, url: film.url });
      }

      fs.writeFile("./films.json", JSON.stringify(data), function (err) {
        if (err) throw err;
        //console.log('complete');
      }
      );
    }
  });

  response.send(request.body);
});

app.get('/films', function (request, response) {

  var file = readFileSync(join(__dirname, './', 'films.json'), 'utf8')

  obj = JSON.parse(file);
  json = JSON.stringify(obj);
  response.send(json);

  //console.log(file);

  // fs.readFile('./films.json', 'utf8', function readFileCallback(err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     obj = JSON.parse(data);
  //     json = JSON.stringify(obj);
  //     response.send(json);
  //   }
  // });
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));