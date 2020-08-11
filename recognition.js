// test if this browser has sppech recognition api
const speakBtn = document.querySelector('#speak-btn');
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition


if(!SpeechRecognition){
  alert('Sorry, your browser does not support this feature!')
  // return
} else {
  const recognition = new SpeechRecognition()
  
  // Recognition start event handler
  recognition.onstart = () => { 
    console.log('Voice recognition started. Try speaking into the microphone.');
  }
  
  recognition.onresult = function(event) {
    console.log(event);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    console.log('Speech recognition has stopped.');
  }
  
  speakBtn.addEventListener('click', () => {
    // start recognition
    recognition.start();
  });
}