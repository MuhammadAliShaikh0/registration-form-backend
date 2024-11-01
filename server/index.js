const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const usersModel = require('./models/users');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("")

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await usersModel.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json("Success");
            } else {
                res.status(400).json("The password is incorrect");
            }
        } else {
            res.status(404).json("No record existed");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(2229, () => {
    console.log("Server is running on port 2229");
});
