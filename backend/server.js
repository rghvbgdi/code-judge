require('dotenv').config();

const express = require('express')
const cookieParser = require('cookie-parser');
const {DBConnection}= require("./config/database.js");
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow specific origins
    const allowedOrigins = [
      process.env.CLIENT_ORIGIN || "http://localhost:5173",
      "https://d2lestbzjzaj5z.cloudfront.net",
      "http://localhost:5173"
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
    res.send("hello world is coming from backend")
}) ;

// Initialize database connection for Lambda
let dbInitialized = false;
const initializeDB = async () => {
  if (!dbInitialized) {
    await DBConnection();
    dbInitialized = true;
  }
};

// Middleware to ensure DB is connected before routes
app.use(async (req, res, next) => {
  await initializeDB();
  next();
});

// Load routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/gemini', require('./routes/geminiRoutes'));
app.use('/api/submission', require('./routes/submissionRoutes'));

// Export app for Lambda
module.exports = app;

// Start server only locally
if (require.main === module) {
  (async ()=>{
      await DBConnection();
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })();
}


