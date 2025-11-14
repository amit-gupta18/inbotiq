const prisma = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



async function registerUser(req, res) {
    const { username, password, email, role } = req.body || {};
    if (!username || !password || !email || !role) {
        return res.status(400).json({ error: 'username, password, email and role are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser =  await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email
        },
    })

    const token = jwt.sign({ userId: createdUser.id, username: createdUser.username, email: createdUser.email, role: createdUser.role },
        process.env.JWT_SECRET_KEY
    );
    return res.status(201).json({ message: 'User registered successfully', user: { username, email, role }, token });
}

async function loginUser(req, res) {
    const { email, password } = req.body || {};
    if (!email || !password ) {
        return res.status(400).json({ error: 'email, password and role are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY);

    return res.json({ message: 'User logged in successfully', token });
}

function logoutUser(req, res) {
    return res.json({ message: 'User logged out successfully' });
}

async function userDetails(req, res) {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, email: true, role: true } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }   
    return res.json({ user });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    userDetails,
};