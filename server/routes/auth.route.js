const express = require('express');
const validate = require('express-validation');
const authCtrl = require('../controllers/auth.controller');

const {
  login,
  register,
  oAuth,
  refresh,
} = require('../validations/auth.validation');


const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Return token if username and password is true */
router.route('/login')
  .post(validate(login), authCtrl.login);

router.route('/register')
  .post(validate(register), authCtrl.register);

router.route('/refresh-token')
  .post(validate(refresh), authCtrl.refresh);

module.exports = router;