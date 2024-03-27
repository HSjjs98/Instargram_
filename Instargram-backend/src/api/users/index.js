import Router from 'koa-router';
import * as usersCtrl from './users.ctrl';

const users = new Router();

users.get('/', usersCtrl.getAllUsers);

export default users;