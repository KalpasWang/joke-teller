const button = document.getElementById('button');
const synth = window.speechSynthesis;
const responseText = document.querySelector('#response-text');


// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Speech Function
const speakJoke = (jokeString) => {
  // Check if speaking
  if (synth.speaking) {
    return;
  }

  // Get speak text
  const speakText = new SpeechSynthesisUtterance(jokeString);
  console.log(jokeString);
  responseText.textContent = jokeString;

  // Speak end
  speakText.onend = e => {
    toggleButton();
  };

  // Speak error
  speakText.onerror = e => {
    console.error('Something went wrong');
  };

  // Speak
  synth.speak(speakText);
};

// Get jokes from Joke API
async function getJoke() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    speakJoke(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
// button.addEventListener('click', getJokes);
