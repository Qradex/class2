import axios from 'axios'
import express from 'express'
import { configuration } from './configs/lunar-crush-api.js'
const app = express()

app.get('/feeds', function (req, res) {
  axios
    .request(configuration("feeds"))
    .then(function (response) {
      res.json(resp).status(200);
    })
    .catch(function (error) {
      res.status(400).send("Bad Request");
    });
});

export default app