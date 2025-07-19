
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const pollRoutes = require('./routes/polls');
const cors = require('cors');

const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/polls', pollRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
