const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// USE CORS
app.use(cors());

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// TRACKS INFO
const tracksData = [
  {
    artist: 'Batmobile',
    album: 'Bail Set as $6.000.000',
    song: 'Gorilla Rock',
    url: 'http://localhost:3002/music/gorilla',
    index: 0,
  },
  {
    artist: 'Editors',
    album: 'The Back Room',
    song: 'Munich',
    url: 'http://localhost:3002/music/munich',
    index: 1,
  },
  {
    artist: 'Blink-182',
    album: 'Neighborhoods',
    song: 'Natives',
    url: 'http://localhost:3002/music/natives',
    index: 2,
  },
  {
    artist: 'Calabrese',
    album: 'Lust for Sacrilege',
    song: 'Serpentflame',
    url: 'http://localhost:3002/music/serpentflame',
    index: 3,
  },
  {
    artist: 'Miami Horror',
    album: 'Illumination',
    song: 'Sometimes',
    url: 'http://localhost:3002/music/sometimes',
    index: 4,
  },
];

// SEND INDEX PAGE

// SEND TRACKS INFO
app.get('/tracks', (req, res) => {
  res.json(tracksData);
});

// SEND FILE
app.get('/music/:trackName', (req, res) => {
  const { trackName } = req.params;
  console.log(`SOMEBODY REQUESTED: ${trackName}`);
  res.set('content-type', 'audio/mp3');
  res.sendFile(path.join(__dirname, '/public/music', `${trackName}.mp3`));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
