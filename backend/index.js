const express = require('express');
const authRoutes = require('./routes/auth.routes');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Hello from Backend!');
    res.json('Hello from Backend!');
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

