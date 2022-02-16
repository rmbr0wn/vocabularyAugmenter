import express from 'express';

import { signIn, signUp} from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import auth from "../middleware/auth.middleware.js"

var router = express.Router();

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  var username = req.body.username;
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export default router;
