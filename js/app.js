
var app = angular.module('groceryListApp', ['ngRoute']);

// Add a router
app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "views/groceryList.html",
            controller:  "GroceryListItemsController"
        })
        .when("/addItem", {
            templateUrl: "views/addItem.html",
            controller:  "GroceryListItemsController"
        })
        .otherwise({
            redirectTo: "/"
        })
})

// add a service
app.service("GroceryService",function(){
    var groceryService = []
    groceryService.groceryItems = [
        {id:1, completed:true, itemName: 'milk', date: '2014-10-01'},
        {id:2, completed:true, itemName: 'cookies', date: '2014-10-01'},
        {id:3, completed:true, itemName: 'ice cream', date: '2014-10-02'},
        {id:4, completed:true, itemName: 'potatoes', date: '2014-10-02'},
        {id:5, completed:true, itemName: 'cereal', date: '2014-10-03'},
        {id:6, completed:true, itemName: 'bread', date: '2014-10-03'},
        {id:7, completed:true, itemName: 'eggs', date: '2014-10-04'},
        {id:8, completed:true, itemName: 'tortillas', date: '2014-10-04'}
    ];    

    groceryService.getNewID = function(){
        if(groceryService.newID){
            groceryService.newID++;
        }
        else
        {
            var maxID = _.max(groceryService.groceryItems, function(entry){ return entry.id} );      
            groceryService.newID = maxID.id+1
        }
        return groceryService.newID;     
    }

    groceryService.save = function(entry){
        entry.id = groceryService.getNewID();
        groceryService.groceryItems.push(entry);
    }

    return groceryService
});

app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery list";
}]);

app.controller("GroceryListItemsController",  ["$scope","$location", "GroceryService",  function($scope,$location,GroceryService){
    $scope.groceryItems = GroceryService.groceryItems;
    
    $scope.groceryItem = {id:7, completed:true, itemName:"",date: new Date()} ;
    $scope.save = function(){
        GroceryService.save($scope.groceryItem);
        $location.path("/");
    }
    console.log($scope.groceryItems);
}]);