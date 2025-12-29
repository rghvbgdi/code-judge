require('dotenv').config();

const express = require('express')
const cookieParser = require('cookie-parser');
const {DBConnection}= require("./config/database.js");
const cors = require('cors');



const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // or wherever your frontend runs
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//req = client sends all the data in this 
//res = server sends all teh data in this back to the client
app.get('/',(req,res) =>{
    res.send("hello world is coming from backend")//to test if the routes are working
}) 
;
(async ()=>{
    await DBConnection();
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/problems', require('./routes/problemRoutes'));
  app.use('/api/user', require('./routes/userRoutes'));
  app.use('/api/gemini', require('./routes/geminiRoutes'));
  app.use('/api/submission', require('./routes/submissionRoutes'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();


