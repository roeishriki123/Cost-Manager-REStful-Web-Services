const express = require('express');
const connectDB = require('./config/db');
const costRoutes = require('./routes/costs');
const userRoutes = require('./routes/users');
const aboutRoute = require('./routes/about');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json()); // מאפשר JSON מהלקוח

// נתיבים
app.use('/api', costRoutes);        // לדוגמת: /api/add, /api/report
app.use('/api/users', userRoutes);  // לדוגמת: /api/users/:id
app.use('/api/about', aboutRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
