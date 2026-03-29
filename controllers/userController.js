const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "User registered successfully" });
    });
};

// LOGIN
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(400).json({ msg: "User not found" });
        }

        const user = results[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
        // GET ALL USERS
exports.getUsers = (req, res) => {

const sql = "SELECT id, username FROM users";

db.query(sql, (err, results) => {

if (err) return res.status(500).json({error: err.message});

res.json(results);

});

};
    });
};
// GET ALL USERS
exports.getUsers = (req, res) => {

const sql = "SELECT id, username FROM users";

db.query(sql, (err, results) => {

if (err) return res.status(500).json({error: err.message});

res.json(results);

});

};
// UPDATE USER
exports.updateUser = (req, res) => {

const { username } = req.body;

const id = req.user.id;

const sql = "UPDATE users SET username = ? WHERE id = ?";

db.query(sql, [username, id], (err, result) => {

if (err) return res.status(500).json({error: err.message});

res.json({ message: "User updated successfully" });

});

};
// DELETE USER
exports.deleteUser = (req, res) => {

const id = req.user.id;

const sql = "DELETE FROM users WHERE id = ?";

db.query(sql, [id], (err, result) => {

if (err) return res.status(500).json({ error: err.message });

res.json({ message: "User deleted successfully" });

});

};