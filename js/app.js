
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
        {itemName: 'milk', date: '2014-10-01'},
        {itemName: 'cookies', date: '2014-10-01'},
        {itemName: 'ice cream', date: '2014-10-02'},
        {itemName: 'potatoes', date: '2014-10-02'},
        {itemName: 'cereal', date: '2014-10-03'},
        {itemName: 'bread', date: '2014-10-03'},
        {itemName: 'eggs', date: '2014-10-04'},
        {itemName: 'tortillas', date: '2014-10-04'}
    ];    
    return groceryService
});

app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery list";
}]);

app.controller("GroceryListItemsController",  ["$scope","GroceryService",  function($scope,GroceryService){
    $scope.groceryItems = GroceryService.groceryItems
        
}]);