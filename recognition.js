// test if this browser has sppech recognition api
const speakBtn = document.querySelector('#speak-btn');
const recordedText = document.querySelector('#recorded-text');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


if(!SpeechRecognition){
  alert('Sorry, your browser does not support this feature!')
  // return
} else {
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  
  // Recognition start event handler
  // recognition.onstart = () => { 
  //   console.log('Voice recognition started. Try speaking into the microphone.');
  // }
  
  recognition.addEventListener('result', e => {
    console.log(e);
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)[0];
      // .join('');

    recordedText.textContent = transcript;
  });

  recognition.addEventListener('end', () => {
    console.log('Speech recognition has stopped.');
  });
  
  speakBtn.addEventListener('click', () => {
    // start recognition
    console.log('Voice recognition started. Try speaking into the microphone.');
    recognition.start();
  });
}