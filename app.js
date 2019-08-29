require('dotenv').config({ path: './.env' });

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const tracksData = require('./tracksData');

const PORT = process.env.PORT || 3001;

// USE CORS
app.use(cors());

// SEND TRACKS INFO
app.get('/tracks', (req, res) => {
  res.json(tracksData);
});

// SEND TRACKS
app.get('/music/:fileName', (req, res) => {
  const { fileName } = req.params;

  res.set('Content-Type', 'audio/mp3');
  res.set('Cache-Control', 'max-age=31536000');
  res.set('Cache-Control', 'public');
  res.sendFile(path.join(__dirname, '/public/music', fileName));
});

// SEND COVER ART
app.get('/covers/:fileName', (req, res) => {
  const { fileName } = req.params;

  res.set('Cache-Control', 'max-age=31536000');
  res.set('Cache-Control', 'public');
  res.sendFile(path.join(__dirname, '/public/covers', `${fileName}`));
});

// SEND INDEX PAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// SEND STATIC FILES
app.use(express.static('public'));

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
