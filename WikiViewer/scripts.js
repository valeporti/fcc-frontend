//http://stackoverflow.com/questions/7185288/how-to-get-wikipedia-content-using-wikipedias-api
//https://www.mediawiki.org/wiki/API:Query
//https://www.mediawiki.org/wiki/API:Main_page
//https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=extracts&generator=search&exsentences=3&exlimit=7&exintro=1&explaintext=1&gsrsearch=pizza
//https://www.mediawiki.org/wiki/API:Search


//https://github.com/FreeCodeCamp/FreeCodeCamp/issues/3264
//https://blog.codepen.io/2013/09/23/ajax-codepen/
//http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource


  //var paraHacerQFuncione = "https://crossorigin.me/"
  //var pre = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=3&exlimit=7&exintro=1&explaintext=1&gsrsearch=";
  //var url = paraHacerQFuncione + pre + q;
  
var wApp = angular.module("WikiApp", []);
  wApp.controller("WikiSearch", function($scope, $http) {
    //var content = {};
    $scope.query="";
    $scope.submit = function () {
      var pre = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=";
      var q = $scope.query;
      var cb = "&callback=JSON_CALLBACK";
      var url = pre + q + cb;
      
      $http.jsonp(url)
      //console.log($http.jsonp(url));
      .success( function(data, status, headers, config) {
        var results = data.query.pages;
        console.log(results)
        //$scope.content = [];
        $scope.content = data.query.pages;
        console.log($scope.content);
        //angular.forEach(results, function(result, key) {
          
          //$scope.content.push({
            //title: result.title,
            //extract: result.extract,
            //link: "href='https://en.wikipedia.org/?curid=" + result.pageid + "'"
          //});
          //console.log($scope.content);
        //});
        //console.log($scope.content);
      })
      .error( function(data, status, headers, config) {
        alert("Ha fallado la petición. Estado HTTP:" + status);
      });
    }
  });


