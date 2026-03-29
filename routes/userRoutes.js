const express = require('express');
const router = express.Router();

const {
register,
login,
getUsers,
updateUser,
deleteUser
} = require('../controllers/userController');

const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', auth, (req, res) => {
res.json({ message: "Protected route", user: req.user });
});

router.get('/all', getUsers);

router.put('/update', auth, updateUser);

router.delete('/delete', auth, deleteUser);

module.exports = router;