const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.get('/', isAuthenticated, userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', isAuthenticated, isAdmin, userController.postUser);

router.patch('/:id', isAuthenticated, userController.patchUser);
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;
