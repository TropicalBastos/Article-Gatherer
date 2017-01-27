//configure module services
//whitelist url
var mainApp = angular.module('mainApp',[]).config(function($sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist(['https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=']);
});

//injecting http service dependency for json api calls
mainApp.controller('apiCtrl',['$scope','$http',function($scope,$http){
    
    $scope.pages = null;
    
    //set function accessible within controller (scope)
    $scope.search = function(){
        $("#notFoundAlert").remove();
        var title = $("input[type='text']").val();
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var cb = '&callback=JSON_CALLBACK';
        $http.jsonp(api+title+cb).success(function(data){
            console.log(data);
            if(data.hasOwnProperty("query")){
                afterSearch();
                $("input[type='text']").blur();
                $scope.pages = data.query.pages;
                $scope.link = "https://en.wikipedia.org/?curid=";
            }else{
                $scope.pages=null;
                var alert = document.createElement("h1");
                alert.id = "notFoundAlert";
                alert.textContent = "Sorry '"+title+"' not found :(";
                $("body").append(alert);
            }
        });
    };
    
}]);

//move searchbar up after search has successfully yielded results
function afterSearch(){
    $("#heading").animate({top:"-=1000"},1000);
                   if($("#searchWrapper").css("top")==='0px'){
                      $('#searchWrapper').addClass("atTop");
                  }
                  if(!$('#searchWrapper').hasClass("atTop")){
                      $('#searchWrapper').addClass("atTop");
                      $("#searchWrapper").animate({top:"-=45%"},500,
                      function(){
                          $(this).css("top","0");
                      });
                    }
               }