x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
speak_data = "";
to_number = "";
draw_apple = "";
apple = "";

function preload() {
  apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content);
  console.log(content, to_number);
  if (Number.isInteger(to_number)){
    document.getElementById("status").innerHTML="started drawing apple";
    draw_apple="set"
  }
  else{
    document.getElementById("status").innerHTML="The speech has not recognized a number.";
    
  }

}

function setup() {
screen_width=window.innerWidth;
screen_height=window.innerHeight;
canvas=createCanvas(screen_width,screen_height-150);
canvas.position(0,150);
}

function draw() {
  if (draw_apple == "set") {
    for(i=1;i<=to_number;i++){
      x=floor(Math.random()*screen_width-300);
      y=floor(Math.random()*screen_height-300);
      image(apple,x,y,50,50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
  }
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}