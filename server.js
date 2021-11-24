const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected successfully");
});

const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');

app.use('/courses', coursesRouter);
app.use('/users', usersRouter);

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'));
    const path=require('path');
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(_dirname,'client','build','index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});