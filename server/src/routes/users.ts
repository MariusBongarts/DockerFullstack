import { User } from './../models/user';
import { MongoGenericDAO } from './../models/mongo-generic.dao';
import express from 'express';
import bodyParser = require('body-parser');
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/sign-in', (req, res) => {
  res.render('sign-in', {
    error: { invalidCredentials: req.query.err === 'ic' }
  });
});

router.get('/sign-out', (req, res) => {
  res.clearCookie('jwt-token');
  res.redirect("/sign-in");
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.post('/sign-in', async (req, res) => {
  const userDAO: MongoGenericDAO<User> = req.app.locals.userDAO;
  const filter: Partial<User> = { email: req.body.email };
    // Find user by email
  const user: User = await userDAO.findOne(filter);
  const pwdInput = req.body.password;
  const isValid = await bcrypt.compare(pwdInput, user.password);

  if (user && isValid) {
    let token = createToken(user);
    res.cookie('jwt-token', token);
    res.redirect('/tasks')
  } else {
    // Falsches Passwort
    console.log("Incorrect password or username");
    res.clearCookie('jwt-token');
    res.redirect('/users/sign-in')
  }
});



router.post('/', async (req, res) => {
  const userDAO: MongoGenericDAO<User> = req.app.locals.userDAO;

  const user: Partial<User> = {
    name: req.body.name,
    email: req.body.email
  };

  user.password = await bcrypt.hash(req.body.password, 12);

  const result = await userDAO.create(user);
  console.log('Created user: ' + result.name);
  res.redirect('/tasks');
});


function createToken(user: User): string {
  let claimsSet = {
    name: user.name,
    email: user.email
  }
  let token = jwt.sign(claimsSet, 'mysecret', { algorithm: 'HS256' });
  return token;

}

export default router;
