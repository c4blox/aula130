var previousResult = ""

function setup() {
  canvas = createCanvas(300, 300)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw() {
  image(video, 0, 0, 300, 300)
  classifier.classify(video, gotResult)
}

function modelLoaded() {
  console.log("model loaded")
}

function gotResult(error, results) {
  if (error) {
    console.error(error)
  } else {
    if ((results[0].confidence > 0.5) && (previousResult != results[0].label)) {
      console.log(results);
      previousResult = results[0].label;
      var synth = window.speechSynthesis;
      speakData = 'O objeto detectado é- ' + results[0].label;
      var untterThis = new SpeechSynthesisUtterance(speakData);
      synth.speak(untterThis);
      document.getElementById("resultObjectName").innerHTML = results[0].label;
      document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);;
    }
  }
}