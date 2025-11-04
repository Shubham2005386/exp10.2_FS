require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
app.use(cors());
app.use(express.json());


connectDB(process.env.MONGO_URI)
.then(() => console.log('Mongo connected'))
.catch(err => console.error(err));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
