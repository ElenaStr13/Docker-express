const express = require('express');
const mongoose = require('mongoose');

const User = require('./dataBase/userModel');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

const connection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log('Connecting to DB...');
            await mongoose.connect(process.env.MONGO_URI);
            dbCon = true;
            console.log('Database connected');
        } catch (e) {
            console.error('Database unavailable, retrying in 3 seconds...');
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};
const start = async () => {
    try {
        await connection();
        app.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`Server listening on 5000`);
        });
    } catch (e) {
        console.error('Failed to start server:', e);
    }
};
start();