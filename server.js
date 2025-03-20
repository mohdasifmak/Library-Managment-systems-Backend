const express = require('express');
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/library';


mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

