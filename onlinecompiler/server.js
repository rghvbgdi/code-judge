require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

const compilerController = require('./controllers/compilerController');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('compiler service running');
});

app.post('/run', compilerController.runCode);
app.post('/submit', compilerController.submitCode);

// Export app for Lambda
module.exports = app;

// Start server only locally
if (require.main === module) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Compiler service running on port ${PORT}`);
  });
}
