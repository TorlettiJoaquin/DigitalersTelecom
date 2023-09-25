const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
