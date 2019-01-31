// Set up speech recognition API, dependent on browser
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var words = ["hello soda", "I am Peter", "yes", "no", "sometimes", "rarely", "never", "always", 0, 1, 2, 3, 4, 5, "Why is this a question?", "Pizza", "Who am I to say that?"];
var grammar =
  "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";
var synth = window.speechSynthesis;
var step = 0;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.body.onclick = function() {
  recognition.start();
  console.log("Ready to receive a color command.");
};

var step = 0;

recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionRejsultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The [last] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    const voiceTranscript = registerVoiceInput(event);
    const confidence = event.results[0][0].confidence;
    if (confidence < 0.5) {
        text = "I'm sorry, I don't understand. Can you repeat yourself?";
        synth.speak(text);
    } 
    else {
        if (words.find(voiceTranscript) == false) {
            text = "I don't recognize your answer. Please try again.";
            synth.speak(text);
        }
        else {
        handleSpeech(voiceTranscript)            
        }
    }
}

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that answer.";
};

recognition.onerror = function(event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
};

function registerVoiceInput() {
  var last = event.results.length - 1;
  var voiceTranscript = event.results[last][0].transcript;
  return voiceTranscript;
}

function handleSpeech(voiceTranscript) {
    recognition.stop();
    console.log(voiceTranscript)
    if (step == 0) {
        if (voiceTranscript == "hello soda") {
            var speech = new SpeechSynthesisUtterance("Hello there, Soda Survey here with your five daily questions. Am I speaking to Peter? If so, please say 'I am Peter'");
            synth.speak(speech);
            step += 1
        }        
    }
    if (step == 1) {
        if (voiceTranscript == "I am Peter") {
            var speech = new SpeechSynthesisUtterance("Oh hey Peter, good to hear from you! Are you ready to start the survey?");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 2) {
        if (voiceTranscript == "yes") {
            var speech = new SpeechSynthesisUtterance("Great, here we go! Today's survey is all about pizza. On a scale from zero to five, ten being highest, how likely are you to order a pizza online this month?");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 3) {
        if (voiceTranscript == 0 || voiceTranscript == 1 || voiceTranscript == 2 || voiceTranscript == 3 || voiceTranscript == 4 || voiceTranscript == 5) {
            var speech = new SpeechSynthesisUtterance("Great, thanks for your answer. Our second question is: When you order pizza, how often is this from Domino's? Your answer options are always, sometimes, rarely and never. Which option do you decide?");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 4) {
        if (voiceTranscript == "rarely" || voiceTranscript == "sometimes" || voiceTranscript == "always" || voiceTranscript == "never") {
            var speech = new SpeechSynthesisUtterance("We are on the third question, which is: On a scale of zero to five, five being highest, how likely are you to recommend Domino's to your family, friends and colleagues?");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 5) {
        if (voiceTranscript == 0 || voiceTranscript == 1 || voiceTranscript == 2 || voiceTranscript == 3 || voiceTranscript == 4 || voiceTranscript == 5)  {
            var speech = new SpeechSynthesisUtterance("Perfect, onto the next question. The fourth question is do you prefer pizza to pho, yes or no?");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 6) {
        if (voiceTranscript == 'yes' || voiceTranscript == 'no')  {
            var speech = new SpeechSynthesisUtterance("Thanks Peter, now it is time for your final question. What is the meaning of life?");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 7) {
        if (voiceTranscript == "Who am I to say that?")  {
            var speech = new SpeechSynthesisUtterance("You are Peter. Please answer the question Peter. What is the meaning of life??");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 8) {
        if (voiceTranscript == "Why is this a question?")  {
            var speech = new SpeechSynthesisUtterance("Please Peter, answer my question. What is the meaning of life??");
            synth.speak(speech);
            step += 1
        }
    }
    if (step == 9) {
        if (voiceTranscript == "Pizza")  {
            var speech = new SpeechSynthesisUtterance("Great Peter, thank you for answering your five daily questions. Have a great day and see you tomorrow");
            synth.speak(speech);
            step += 1
        }
    }
}
