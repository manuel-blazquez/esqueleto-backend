const express = require('express');
const validate = require('express-validation');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} = require('../validations/user.validation');
const userCtrl = require('../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');


const router = express.Router(); 

router.route('/')
  /** GET /api/users - Get lista de users */
  .get(authorize(ADMIN), validate(listUsers), userCtrl.list)

  /** POST /api/users - Crea nuevo user */
  .post(authorize(ADMIN), validate(createUser), userCtrl.create);


router.route('/profile')
  /** GET /api/users/profile - Get User Profile */
  .get(authorize(), userCtrl.loggedIn);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(authorize(LOGGED_USER), userCtrl.get)

  /** PUT /api/users/:userId - Replace user */
  .put(authorize(LOGGED_USER), validate(replaceUser), userCtrl.update)

  /** PUT /api/users/:userId - Update user */
  .patch(authorize(LOGGED_USER), validate(updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(authorize(LOGGED_USER), userCtrl.remove);

/** Carga user cuando API es llamad con el parametro userId en la ruta */
router.param('userId', userCtrl.load);

module.exports = router;