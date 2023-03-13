const userController = require('../controllers/user-controller');
const router = require('express').Router();

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:userId/addfriend/:friendId')
  .post(userController.addFriend);

router.route('/:userId/deletefriend/:friendId')
  .delete(userController.deleteFriend);

module.exports = router;