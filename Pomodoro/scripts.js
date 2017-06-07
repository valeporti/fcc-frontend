//global Variables
var min = 5;
var cutTot = 0;
var sec = 0;
var t;
var timerOn = false;
var first = true;
var maxH = 0;
var end = false;

$(document).ready(function() {
  $("#cutPlus").on("click", function () {cut(1)});
  $("#cutMin").on("click", function () {cut(-1)});
  $("#lenPlus").on("click", function () {len(1)});
  $("#lenMin").on("click", function () {len(-1)});

  $("#cutText").text(cutTot);
  $("#lenText").text(min);
  $("#bigNum").text(rendTime(min, sec));
  
  //para qeu cuando se toque en el centro lo tome como click
  $("#extCircle").on("click", function() {startStop()});
  $("#sube").on("click", function() {startStop()});
  $("#bigNum").on("click", function() {startStop()});
  
  $("#Reset").on("click", function() {reset()});
});
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout2
function startStop() {
  timerOn = !timerOn; //change the boolean value
  if (timerOn == true) { //significa que se inicia conteo
    timedCount();
  } else { //significa que se para conteo
    clearTimeout(t); 
    //console.log("en else " + timeOut);
  }
}

function reset() {
  clearTimeout(t);
  min = 5;
  cutTot = 0;
  sec = 0;
  t = 0;
  timerOn = false;
  first = true;
  maxH = 0;
  end = false;
  $("#sube").css("height", "0%");
  $("#lenText").text(min);
  $("#bigNum").text(rendTime(min, sec));
}

function timedCount () {
  t = setTimeout(function() {
    //ver en dónde está el conteo de segundos (hacerlo base60)
    if (sec == 0) {
      sec = 59;
      if (min == 0) {
        endEff();
        exit;
      }
      //hacer lo del break
      var cortes = 0; 
      cortes = ((min - (min - cutTot)) % cutTot);
      console.log("minutos " + min);
      console.log("cutTot " + cutTot);
      console.log("cortes " + cortes);
      if (cortes == 0 && end == false) {
        console.log("entrorendCu");
        rendCut(min);
      }
      min --;
    } else {
      sec --;
    }
    //si aún no se llega a la cuenta final "00:00"
    if (end == false) {
      //renderizar
      $("#bigNum").text(rendTime(min, sec));
      rendPom(min, sec);
      //volver a hacerlo hasta que se indique lo contrario
      timedCount() ;
    }
  }, 1000);
}

function rendCut(mm) {
  $("#cutOffText").text("Break!!");
  $("#cutOffText").addClass("fadeIn animated");
}

function rendPom(mm, ss) {
  //sea min nuestro total y min+seg restantes el dividendo
  var restante = 0;
  if (first == true) {
    maxH = mm + 1;
    first = false;
  }
  restante = Math.round(((mm + ss/60)/maxH)*100*100)/100;
  $("#sube").css("height", (100 - restante) + "%");
  console.log(restante);
}

function cut(q) {
  if (cutTot > 0 || q > 0) {
    cutTot = cutTot + q;
  }
  restart();
  $("#cutText").text(cutTot);
}

function len(q) {
  if (min > 0 || q > 0) {
    min = min + q;
  }
  restart();
  $("#lenText").text(min);
  $("#bigNum").text(rendTime(min, sec));
  
}

function rendTime(mm, ss) {
  var max = 2;
  var strSS = "" + ss + "";
  strSS.length < max ? strSS = "0" + strSS : strSS;
  return mm + ":" + strSS;
}

function restart() {
  sec = 0; 
  $("#sube").css("height", "0%");
  first = true;
  end = false;
}

function endEff() {
  $("#bigNum").text("Ended :)");
  $("#bigNum").addClass("wobble animated");
  clearTimeout(t);
  t = 0;
  min = 5;
  cutTot = 0;
  sec = 0;
  timerOn = false;
  first = true;
  maxH = 0;
  //end = false;
  end = true;
  min = 5;
  $("#lenText").text(min);
}