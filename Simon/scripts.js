var lightOn = false; // == strictOn
var OnOff = false;
var autoArr = [];
var greenSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blueSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellowSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var green = ["#greenbtn", "#2d8632", "#76e67d", greenSnd];
var red = ["#redbtn", "#aa3939", "#ff0e0e", redSnd];
var blue = ["#bluebtn", "#363377", "#1c16ca", blueSnd];
var yellow = ["#yellbtn", "#DDDD2D", "#FFFF0F", yellowSnd];
var missingTurns = 0;
var totTurns = 0;
var waitTime = 1000;
var finishShowing = false;
var started = false;
var repeat = false;
var executing = false;
//colorBtnsLogic : ["divID", "offColor", "onColor"]

$(document).ready(function() {
  $("#strict").on("click", function () {strict()});
  $("#onbtn").on("click", function() { onOff() });
  $("#strt").on("click", function() { pushedStart() });
  $("#greenbtn").on("click", function() { btnPushed(1) });
  $("#redbtn").on("click", function() { btnPushed(2) });
  $("#bluebtn").on("click", function() { btnPushed(3) });
  $("#yellbtn").on("click", function() { btnPushed(4) });
});

function pushedStart() {
  //if On, continue
  if (OnOff == false) {
    return;
  }
  if (started == true) {
    //restart
    console.log("asks restart");
    restart();
  } else {
    console.log("asks for starting game");
    //startgame
    startGame();
  }  
}

/*
  Function thar dicatates ewhat should be done when starting the game
*/
function startGame() {
  started = true;
  if (repeat == false) {
    //generate random number between 1 and 4
    var rand = 0;
    rand = Math.floor(Math.random() * 4) + 1;

    autoArr.push(rand);
    totTurns = autoArr.length;
    
  } else {
    repeat = false;
  }
  missingTurns = totTurns;
  if (totTurns == 21) {
    mistake(":)");
    restart();
    return
  }
  actCounter();
  //console.log(autoArr);
  for (var i = 0; i < totTurns; i ++) {
    //if On, continue
    if (OnOff == false) {
      return;
    }
    (function(ind) {
       setTimeout(function(){
         showMove(autoArr[ind]);
         if (ind == totTurns - 1) {
           executing = false;
         }
       }, 1000 * ind);
    })(i);
    
  }
  //playerTurn();
  //Au lieu d'appeler une autre fonction, ne rien faire jusqu'à ce que on l'ordone
};

function waitStart() {
//if On, continue
  if (OnOff == false) {
    return;
  }
  executing = true;
  setTimeout(function() {
    startGame();
  }, waitTime + 1000);
}

function actCounter() {
  var str = "";
  if (totTurns < 10) {
    str = "0" + totTurns;
  } else {
    str = "" + totTurns + "";
  }
  $("#counterScr").text(str);
}

function btnPushed(intCl) {
  //we could tell the progrma to stop executing light and sound before plan if user stop clicking
  //if On, continue
  if (OnOff == false) {
    return;
  }
  if (executing == true) {
    return;
  }
  showMove(intCl);
  checkCorrectness(intCl);
};

function checkCorrectness(intCl) {
  //Check for expected btn pushed
  console.log("si llega aqui ");
  console.log(intCl);
  console.log(autoArr);
  if (intCl == autoArr[totTurns - missingTurns]) {
    missingTurns --;
    if (missingTurns == 0) {
      waitStart();
    }
  }
  else {
    console.log("error");
    mistake("!!");
    if (lightOn == true) {
      //restart
      restart();
    } else {
      //repeat
      repeat = true;
      //mistake();
      waitStart();
    }
  }
}

function mistake(exp) {
  $("#counterScr").text(exp);
  var max = 600;
  var rep = 2;
  //greenSnd.play();
  //redSnd.play();
  //suena muy feo combinar los dos sonidos
  for (var times = 0; times < rep; times ++) {
    setTimeout(function() {
       $("#counterScr").css("color", "#93c0cc");
    }, times*max + max/2);
    setTimeout(function() {
       $("#counterScr").css("color", "#083340");
    }, times*max + max);
  }
}

function restart() {
  autoArr = [];
  waitStart();
}

/*
  Function that shows in the playboard the moves to do
*/
function showMove(int) {
  //if On, continue
  if (OnOff == false) {
    return;
  }
  
  var color = [];
  if (int == 1) { //green
    color = green;
  } 
  else if (int == 2) { //red
    color = red;
  }
  else if (int == 3) { // blue
    color = blue;
  }
  else { //yellow
    color = yellow;
  }
  //console.log(color);
  //light the correspondant div and make sound
  $(color[0]).css("background-color", color[2]);
  //sound 
  color[3].play();
  setTimeout(function() {
    $(color[0]).css("background-color", color[1]);
  }, waitTime - 200);
};

/*
Function that describes everyStep made when Strict Button Clicked
*/
function strict () {
  //if On, continue
  if (OnOff == false) {
    return;
  }
  //turn on/off Strict Light
  encenderStrictLgt();
};

/*
Function that turn on or off the light associatet to "strict"
*/
function encenderStrictLgt() {
  //al parecer no se puede que en la misma classe se agregue Background-color, se tiene que colocar en un paso
  if (lightOn == false) {
    $("#strlight").addClass("classLighting");
    $("#strlight").css("background-color", "#AED0D9");
  } else {
    $("#strlight").removeClass("classLighting");
    $("#strlight").css("background-color", "#083F4F");
  }
  lightOn = !lightOn
  console.log(lightOn);
};

/*
Moves the on/off Button
*/
function onOff() {
  if (OnOff == true) {
    $("#onbtn").css("margin", "0 0 0 19px");
  } else {
    $("#onbtn").css("margin", "0 0 0 1px");
  }
  //ver que todo lo demás esté apagado  y si no apagar
  if (lightOn == true && OnOff == true) {
    strict();
  }
  if (OnOff == true) {
    autoArr = [];
    started = false;
    $("#counterScr").text("--");
  }
  
  OnOff = !OnOff;
}