const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const app = express();

//Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('database connected'))
.catch((err) => console.log('Database not connected', err))

//middleware
app.use(express.json())

app.use('/', require('./routes/authRoutes'))

const Port = 8000;
app.listen(Port, () => console.log(`server is running on port ` +  Port))


// mongo password = XX1NNHnsxqLFRlJh