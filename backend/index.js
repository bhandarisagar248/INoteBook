require('dotenv').config();
const connectToMongoose=require('./db');
const cors=require('cors');
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
// const userRoutes = require('./routes/auth');
// const userRoutes1 = require('./routes/notes');



//defining an middleware which accept the request from api

const app = express()
const port = 5000

//for cors permission
const corsOption={
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','password'],
  credentials: true
}

app.use(cors(corsOption));

app.use(express.json());

// Configure session middleware


app.use(cookieParser());

app.use(session({
  secret: 'default', // For dev only, put this in .env for production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB%20&directConnection=true&ssl=false" }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 60 * 60 * 1000 // 1 hour
  }
}));




app.use('/api/auth', require('./routes/auth'));
// app.use('api/notes', require('./routes/notes'));


app.use('/notes',require('./routes/notes'));



app.listen(port, () => {
  console.log(`iNoteBook listening on http://localhost:${port}`)
})

connectToMongoose();