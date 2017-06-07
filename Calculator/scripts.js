//Hacer que cuando uno apriete un boitón que escriba
//http://javascript.info/tutorial/mouse-events
var timeOut;
//Variables Globales
var arrNum = []; //variable para acumular numeros ingresados
var arrWhole = [];
var tempSign = "";
var accWhole = 0;
var tempAcc = 0;
var primerCalculo = true;
var borrEntraArrWhole = false;
var maxBigLen = 9; //para variables de tamaño de screen
var maxSmallLen = 25; //para variables de tamaño de screen

$(document).ready(function() {
  $("#pushButt").text(0);
  $("#viewCalc").text(0);
  $("#one").on("click", function () {pushedButt(1)});
  $("#two").on("click", function () {pushedButt(2)});
  $("#three").on("click", function () {pushedButt(3)});
  $("#four").on("click", function () {pushedButt(4)});
  $("#five").on("click", function () {pushedButt(5)});
  $("#six").on("click", function () {pushedButt(6)});
  $("#seven").on("click", function () {pushedButt(7)});
  $("#eight").on("click", function () {pushedButt(8)});
  $("#nine").on("click", function () {pushedButt(9)});
  $("#zero").on("click", function () {pushedButt(0)});
  
  $("#point").on("click", function () {pushedButt(".")});
  $("#equal").on("click", function () {pushedButt("res")});
  
  $("#sum").on("click", function () {pushedButt("+")});
  $("#min").on("click", function () {pushedButt("-")});
  $("#fois").on("click", function () {pushedButt("x")});
  $("#div").on("click", function () {pushedButt("/")});
  //http://stackoverflow.com/questions/32623143/how-to-detect-long-press-on-mouseup-event-without-using-any-other-mouseevent
  //$("#erase").on("click", function () {pushedButt("borr")})
  $("#erase").mousedown(function() {
    pushedButt("borr");
    //console.log("entra a mousedown");
    timeOut = setTimeout(function() {
        //console.log("entra a timeOut");
        ripple($("#ripEff"), "#FFAAAA");
        ripple($("#ripEffScr"), "#8DAFB7");
        arrWhole = [];
        arrNum = [];
        accWhole = 0;
        tempAcc = 0;
        primerCalculo = true;
        borrEntraArrWhole = false;
        tempSign = "";
        //console.log("sale de timeOut");
        //console.log(timeOut);
    }, 1500)})
    .mouseup(function() {
      //console.log("entra a mouseUP");
      clearTimeout(timeOut);
      //timeOut = 0;
    });
  //console.log(timeOut);
});

function pushedButt(value) {
  
  if ($.isNumeric(value) || value == ".") {
    //Para que quepa en la pantalla
    if (arrNum.length > maxBigLen) {
      $("#pushButt").css("font-size", "16px");
      $("#pushButt").text("Large Number, please erase a digit and continue calculating =)");
      return;
    } else {
      $("#pushButt").css("font-size", "46px");
    }
    
    if (regresaLengthWhole(arrWhole, arrNum, 0) > (maxSmallLen - 1)) {
      $("#viewCalc").text("Large Number");
      return;
    }
    console.log(regresaLengthWhole(arrWhole, arrNum, 0));
    
    //No puede haber más de un punto
    if (arrNum[arrNum.length - 1] == "." && value == ".") {
      return;
    }
    
    if (arrNum.length == 0 && arrWhole.length > 0) {
      //significa que se ingresó un signo
      arrWhole.push(tempSign);
      tempSign = "";
    }
    arrNum.push(value);
    
    $("#pushButt").text(arrNum.join(""));
    $("#viewCalc").text(renderArr(arrWhole) + arrNum.join(""));
  } 
  else if (value == "res") {
    //console.log(" el primero " + accWhole);
    if (arrNum.length > 0) {
      arrWhole.push(arrNum);
    }
    accWhole = calcWholeArr(arrWhole);
      //accWhole = desiredOp(accWhole , arrWhole[arrWhole.length - 2], [arrWhole.length - 1]);
    tempAcc = accWhole;
    
    renderAnswer(accWhole, arrWhole)
    
    //Reinicializar las variables
    arrWhole = [];
    arrNum = [];
    accWhole = 0;
    tempSign = "";
    primerCalculo = false;
  }
  else if (value == "borr") {
    
    //http://stackoverflow.com/questions/14586883/how-to-detect-a-long-press-on-a-div-in-jquery
  
    //hay que asegurase de la existencia del array más grande 
    //si existe también se va a tomar efecto en él después de asegurarse que el arrayDeNum ya se haya terminado
    
    //analizar qué pasa con ArrNum
    if (arrNum.length > 0) {
      borrEntraArrWhole = false;
      arrNum.pop();
      
      if (arrNum.length == 0) {
        $("#pushButt").text(0);
      } else {
        $("#pushButt").text(arrNum.join(""));
      }
     
    } else {
      $("#pushButt").text(0);
      arrNum = [];
    }
    
    //analizar qué pasa conarrWhole
    if (arrWhole.length == 0 && arrNum.length > 0) {
      //console.log("al primero");
      $("#viewCalc").text(arrNum.join(""));
    }
    else if (arrWhole.length > 0 && arrNum.length > 0) {
      //console.log("al Secungo");
      $("#viewCalc").text(renderArr(arrWhole) + arrNum.join(""));
    }
    else if (arrWhole.length > 0 && arrNum.length == 0 && borrEntraArrWhole == false) {
      //console.log("al tercer");
      $("#viewCalc").text(renderArr(arrWhole));
    }
    else if (arrWhole.length > 0 && borrEntraArrWhole == true) {
      //console.log("al 4");
      //console.log("primero " + arrWhole);
      if (Array.isArray(arrWhole[arrWhole.length - 1]) && arrWhole[arrWhole.length - 1].length > 1) {
        //console.log("esArr ->" + arrWhole[arrWhole.length - 1] + " largo " + arrWhole[arrWhole.length - 1].length + " y largo de arr es " + arrWhole.length);
        arrWhole[arrWhole.length - 1].pop();
      } 
      else {
        //console.log("no es arr ->" + arrWhole[arrWhole.length - 1] + " largo " + arrWhole.length);
        arrWhole.pop();
        //arrWhole.pop();
      }
      //quitarElemArr(arrWhole);
      
      //esto sólo pasa una vez
      if (arrWhole.length > 0) {
        $("#viewCalc").text(renderArr(arrWhole));
      } else {
        $("#viewCalc").text(0);
      }
      //console.log("luego " + arrWhole);
    }
    else {
      //console.log("al else");
      $("#viewCalc").text(0);
      arrWhole = [];
    }
    
    if (arrWhole.length == 0) {
      //cuando se borre todo ..
      primerCalculo = true;
    }  
    if (arrNum.length == 0) {
      borrEntraArrWhole = true;
    }
    
  }
  else { //esto significa que es un signo el ingresado
    tempSign = value;
    countOneTwo = 0; //para lo de borrar
    //ingresar arrNum a arrWhole, reiniciar arrNum
    if (arrNum.length > 0) {
      arrWhole.push(arrNum);
      //if (arrWhole.length == 1) { //==2 justo se tiene un array[numero,signo]
      //accWhole = numDeArray(arrNum);
      //}
      arrNum = [];
    }
    
    //si se tiene un previo resultado y se quiere hacer algo con ello
    if (arrWhole.length == 0 && primerCalculo == false) {
      arrWhole.push([tempAcc]);
    }

    //calcular acummulado sólo si por lo menos ya se tienen 3 elementos en array
    //y siendo el primer número ingresado ponerlo en accWhole
    //if (arrWhole.length > 2) {
      //accWhole = desiredOp(accWhole, arrWhole[arrWhole.length - 2], arrWhole[arrWhole.length - 1]);
    //}
    //console.log(accWhole);
    $("#pushButt").text(arrNum.join(""));
    $("#viewCalc").text(renderArr(arrWhole) + tempSign);
  }
  
}

/*
* toma un array de números, los junta, y regresa el valor 
* Ej: [1, 2, ".", 4] va a regresar 12.4 con typo número para poder operar con él
*/
function numDeArray(arrNum) {
  //http://stackoverflow.com/questions/4090518/what-is-the-difference-between-parseint-and-number
  //http://stackoverflow.com/questions/4564158/what-is-the-difference-between-parseintstring-and-numberstring-in-javascript
  var str = "";
  for (var i = 0; i < arrNum.length; i ++) {
    str += arrNum[i];
  }
  return Number(str);
}

/*
* Calcular todo el array, sólo para casos donde el acumulado que se lleve no sirva 
* C-à-d, cuando se borren elementos del array, entonces, el acumulado no será válido
*/
function calcWholeArr(arr) {
  var acc = 0;
  for (var i = 1; i < arr.length - 1; i = i + 2) { 
    // el arr.length - 1 para cuando exista un caso donde ---, [2], "+"] ignore el "+" y si ...,[2]] no tenga problemas
    // el i + 2 e i = 1 es para que vaya tomando los valores deseados más el acumulado
    if (i == 1) {
      acc = arr[0];
    }
    acc = desiredOp(acc, arr[i], arr[i+1]);
  }
  return acc;
}

/*
* Devolver la operación deseada
*/
function desiredOp(arrIzq, sign, arrDer) {
  //asegurarse de que sean numeros con los cuales trabajar si nohacer el favor de convertirlo
  var izq = 0;
  var der = 0;
  
  if (Array.isArray(arrIzq)) {
    izq = numDeArray(arrIzq);
    //$("#pushButt").text(izq);
  } else {
    izq = arrIzq;
  }
  if (Array.isArray(arrDer)) {
    der = numDeArray(arrDer);
  } else {
    der = arrDer;
  }
  
  if (sign == "+") {
      //no importa el orden de los factores
      return izq + der;
    }
    else if (sign == "-") {
      //!\Importa el orden de los factores
      return izq - der;
    }
    else if (sign == "/") {
      //!\Importa el orden de los factores
      return izq / der;
    }
    else if (sign == "x") {
      //No importa el orden de los factores
      return izq * der;
    }
    else {
      return 0;
    }
}

function renderArr(arr) {
  var str = "";
  for (var i = 0; i < arr.length; i ++) {
    if (Array.isArray(arr[i])) {
      str += numDeArray(arr[i]);
    } else {
      str += arr[i];
    }
  }
  return str;
}

function quitarElemArr(arr) {
  if (Array.isArray(arr[arr.length - 1])) {
    arr[arr.length - 1].pop();
  } else {
    arr.pop();
  }
  return arr;
}

function regresaLengthWhole(arr, arrNum, extra) {
  var arrBig = 0;
  if (arrNum != 0) {
    arrBig = arrNum.length;
  }
 
  var acc = 0;
  for (var i = 0; i < arr.length; i ++) {
    if (Array.isArray(arr[i])) {
      acc += arr[i].length;
    } else {
      acc ++;
    }
  }
  
  return acc + arrBig + extra;
}

function renderAnswer(acc, arr) {
  //ver que el acumulado no sobrepase la pantalla y si sí redondearlo
  //console.log(acc);
  //console.log(arr);
  var a = "" + acc + "";
  var bigScr = a.split("");
  var smallScrArr = arr;
  var puntoDnd = bigScr.indexOf(".");
  var showBig = "";
  var showSmall = "";
  
  if (bigScr.length > maxBigLen) {
    if (puntoDnd >= 0) {
      console.log("hay punto");
      if (puntoDnd >= maxBigLen) {
        console.log("el punto está mas alla");
        //aplicar la de exponencial
        var entero = bigScr.slice(0, maxBigLen - 3);
        var exp = puntoDnd - (maxBigLen - 3); // + 1??
        entero = entero.join("");
        showBig = entero + "e" + exp;
        
      } else {
        //redondear
        console.log("Pasó a redondeo");
        var despuesDePunto = maxBigLen - (maxBigLen - puntoDnd);
        showBig = "" + round(acc, despuesDePunto) + "";
        
      }
    } else {
      //si no hay punto y está muy grande sólo hacer lo de la exponencial
      var entero = bigScr.slice(0, maxBigLen - 3);
      var exp = bigScr.length - (maxBigLen - 3); // + 1??
      entero = entero.join("");
      showBig = entero + "e" + exp;
    }
  } else {
    showBig = a;
  }
  //console.log("Show a" + a);
  //console.log("Show BigScr" + bigScr);
  //console.log("Show Big " + showBig);
 //console.log("regresaLengthWhol" + regresaLengthWhole(arr, showBig, 1)); 
  if (regresaLengthWhole(arr, showBig, 1) > maxSmallLen) {
    showSmall = "... = " + showBig;
  } else {
    showSmall = renderArr(smallScrArr) + "=" + showBig;
  }
  //console.log("Show Small " + showSmall);
  
  $("#pushButt").text(showBig);
  $("#viewCalc").text(showSmall);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function ripple(elem, backColor) {
  console.log("entra a ripple con elem " + elem + " y Backcol " + backColor);
  elem.addClass('ripple-effect');

  elem.css({
          background: backColor});
        //.appendTo($(this));
 //console.log("si aqui");
  setTimeout(function() {
    console.log("entra a ripple timeOUT");
     elem.removeClass('ripple-effect');
     $("#pushButt").text(0);
     $("#viewCalc").text(0);
    //console.log("entro ");
    }, 1000); //mismo tiempo del efecto para que pueda terminar (previamente definido en css)
console.log("sale de ripple");
}