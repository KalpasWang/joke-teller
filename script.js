const synth = window.speechSynthesis;  // speech synthesis api
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;  // speech recognition api
const speakBtn = document.getElementById('speak-btn');
const text = document.getElementById('text');
const headImg = document.getElementById('head');
const beepSound = new Audio('beep.mp3');
let nomatch = false;  // set to true if no words match in speech recognition



// test if this browser has sppech recognition api
if(!SpeechRecognition){
  alert('Sorry, your browser does not support this feature!')
} else {
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;  // result event will be triggered every word
  recognition.lang = 'en-US';
  
  recognition.addEventListener('start', () => {
    nomatch = true; // set nomatch to true at beginning
    toggleButton();
  });

  
  recognition.addEventListener('result', e => {
    // get transcript from event object
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)[0];

    text.textContent = transcript; // update text in html
    nomatch = false; // if result event is fired, nomatch set to false
  });


  recognition.addEventListener('end', () => {
    console.log('Speech recognition has stopped.');
    if(nomatch) {
      text.textContent = 'Ask for a joke!';
      toggleButton();
    } else if(text.textContent.includes('joke')) {
      getJoke();
    } else {
      speak("Sorry, I don't understand")
    }
  });
  
  speakBtn.addEventListener('click', () => {
    console.log('Voice recognition started. Try speaking into the microphone.');
    
    beepSound.play();
    recognition.start();
  });
}


// Disable/Enable Button
function toggleButton() {
  speakBtn.disabled = !speakBtn.disabled;
}

// change image to talking head or silent head
function toggleHead() {
  if(headImg.src.split('/').pop() === 'head.png') {
    headImg.src = 'talking-head.gif';
  } else {
    headImg.src = 'head.png';
  }
}

// Speech Function
const speak = (speakingText) => {
  // Check if speaking
  if (synth.speaking) {
    return;
  }

  // Get speak text
  const utterText = new SpeechSynthesisUtterance(speakingText);
  const voices = synth.getVoices();
  utterText.voice = voices.find(voice => voice.lang === 'en-US');
  text.textContent = speakingText;

  // Speak end
  utterText.onend = e => {
    toggleHead();
    toggleButton();
  };

  // Speak error
  utterText.onerror = e => {
    console.error('Something went wrong');
  };

  // Speak
  toggleHead()
  synth.speak(utterText);
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
    speak(joke);
  } catch (error) {
    // Catch Error Here
  }
}
