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
// TODO: cache control
app.get('/music/:fileName', (req, res) => {
  const { fileName } = req.params;

  res.set('content-type', 'audio/mp3');
  res.sendFile(path.join(__dirname, '/public/music', fileName));
});

// SEND COVER ART
// TODO: cache control
app.get('/covers/:fileName', (req, res) => {
  const { fileName } = req.params;

  res.sendFile(path.join(__dirname, '/public/covers', `${fileName}`));
});

// SEND INDEX PAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
