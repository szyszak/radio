import { Howl } from 'howler';

// CREATE NEW HOWL
export const createHowl = (url) => {
  const newHowl = new Howl({
    src: [url],
    format: 'mp3',
    html5: true, // ALLOWS STREAMING
  });

  return newHowl;
};

// ADD HOWL TO OBJECT
export const addHowl = (obj) => {
  const howl = createHowl(obj.URL);
  const newObj = { ...obj, howl };

  return newObj;
};

// FORMAT TIME
export const formatTime = (seconds) => {
  const roundedSeconds = Math.floor(seconds);

  if (roundedSeconds < 60) {
    const secsStr = String(Math.floor(roundedSeconds)).padStart(2, '0');

    return `00:${secsStr}`;
  }

  const minsStr = String(Math.floor(roundedSeconds / 60)).padStart(2, '0');
  const secsStr = String(Math.floor(roundedSeconds % 60)).padStart(2, '0');

  return `${minsStr}:${secsStr}`;
};
