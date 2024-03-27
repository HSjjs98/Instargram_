require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

// import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData()
  })
  .catch((e) => {
    console.error(e);
  });

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser()); //라우터 적용 전에 bodyParser 적용
app.use(jwtMiddleware);

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 5000;
app.listen(port, () => {
  console.log('Listening to port 4000');
});
