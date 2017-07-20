//Decalre app variable
var twtv = angular.module("Twitch", []);
//Declare what will do app
twtv.controller("TwApp", function($scope, $q, $http) {
  var arrUsrNms = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var burl = "https://wind-bow.glitch.me/twitch-api"; //"https://wind-bow.gomix.me/twitch-api"; (antes) 
  var arrDisp = [];

  $scope.content = [];
  angular.forEach(arrUsrNms, function (key, value) {
    var url = "";
    var online = "";
    var stream = "";
    var logo = "";
    var dName = "";
    $q.all([
    $http.get(burl + "/streams/" + arrUsrNms[value])
    .then(function succes(response) {
      //console.log(response)
      if (response.data.stream != null) {
            online = "Online";
          } else {
            online = "Offline";
          }
    },
    function error(response) {
        console.log("Ha fallado la petición. Estado HTTP:" + response.status);
      }),
    $http.get(burl + "/channels/" + arrUsrNms[value])
    .then(function succes(response) {
      //console.log(response)
        url = response.data.url;
        stream = response.data.status;
        logo = response.data.logo;
        dName = response.data.display_name;
      },
      function error(response) {
        console.log("Ha fallado la petición. Estado HTTP:" + response.statusText);
      })
      ]).then(function() {
    if (stream != 404) { //Just push if it exists
          $scope.content.push({
            "url": url,
            "stream": stream,
            "online": online,
            "name": dName,
            "logoUrl": logo
          });
        }
    })
    //console.log(arrDisp)
  });
  //console.log($scope.content)
  //$scope.content = arrDisp;
});

