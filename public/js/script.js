// Set up speech recognition API, dependent on browser
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = ['hamburger', 'pizza', 'fries', 'turd sandwich'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
var synth = window.speechSynthesis;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionRejsultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The [last] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    const voiceTranscript = registerVoiceInput(event)
    const confidence = event.results[0][0].confidence
    if (confidence < 0.75) {
        var speechCon = new SpeechSynthesisUtterance("I'm sorry, I don't understand. Can you repeat yourself?");       
        synth.speak(speechCon);
    }
    else {
        var speech = new SpeechSynthesisUtterance("Your answer is: " + voiceTranscript + " . Say yes to confirm your answer");
        synth.speak(speech);        
    }
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that answer.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


function registerVoiceInput() {
    var last = event.results.length - 1;
    var voiceTranscript = event.results[last][0].transcript;
    return voiceTranscript
}

function helloUser() {

    // bot : 'Hello. Is this Peter speaking?'

    // Peter : 'Yes, this is Peter.'

    // bot : 'Hello Peter. Do you want to start today's survey?'

    // Peter : 'Yes please.'

    // startSurvey()

}

function startSurvey() {

    // get the survey from X

    // Ask the question

    // Register the response OR ask question again

    // Ask something like: are you sure your answer is X

    // If yes: go to next question

    // If no: ask question again

}