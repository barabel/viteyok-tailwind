import express, { Router } from 'express';
import { readFile } from 'fs';
import bodyParser from 'body-parser';
import process from "node:process";
import dotenv from "dotenv";

dotenv.config();

const { text } = bodyParser;

const router = Router();
const app = express();
const port = process.env.PORT || 3065;

app.use(text({type:"*/*"}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
});

const apiBasePath = '/api';

app.use(apiBasePath, router);

const readJson = (reqPath, callback) => {
  const path = `.${apiBasePath}/${reqPath}.json`;

  readFile(path, (err, data) => {
    if (err) {
      callback(false);
    }

    if (data) {
      const parsedData = JSON.parse(data);

      callback(parsedData);
    }
  });
}

const trim = (str, chars = [], direction = 0) => {
  let result = str;
  if (direction == 0 || direction == 1) {
    while (chars.includes(result.charAt(0))) {
      result = result.substring(1);
    }
  }

  if (direction == 0 || direction == 2) {
    while (chars.includes(result.charAt(result.length - 1))) {
      result = result.substring(0, result.length - 1);
    }
  }

  return result;
}

router.get(/.*/, (req, res) => {
  const reqPath = trim(req.path, ['/'], 2);
  const method = trim(req.path, ['/']).replace('/','_');
  readJson(reqPath, (parsedData) => {
    if (parsedData !== false) {
      res.send(parsedData);
    } else {
      if (methods[method]) {
        const parsedData = methods[method]();
        if (parsedData) {
          res.send(parsedData);
          return;
        }
      }
      res.status(500).send({error: true});
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const apartments_cnt = () => {
  let cnt = getRandomInt(100);
  if (cnt < 20) {
    cnt = 0;
  }
  return {
    'cnt':  cnt,
    'text' : cnt == 0 ? 'Not found' : `Search ${cnt} items`,
  }
}

const methods = {
  apartments_cnt,
};

router.post(/.*/, (req, res) => {
  const reqPath = trim(req.path, ['/'], 2);
  const method = trim(req.path, ['/']).replace('/','_');
  readJson(reqPath, (parsedData) => {
    if (parsedData !== false) {
      res.send(parsedData);
    } else {
      if (methods[method]) {
        const parsedData = methods[method]();
        if (parsedData) {
          res.send(parsedData);
          return;
        }
      }
      res.status(500).send({error: true});
    }
  });
});
