
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


app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
}]);

app.controller("GroceryListItemsController", ["$scope", function($scope){
    $scope.groceryItems = [
        {itemName: 'milk', date: '2014-10-01'},
        {itemName: 'cookies', date: '2014-10-01'},
        {itemName: 'ice cream', date: '2014-10-02'},
        {itemName: 'potatoes', date: '2014-10-02'},
        {itemName: 'cereal', date: '2014-10-03'},
        {itemName: 'bread', date: '2014-10-03'},
        {itemName: 'eggs', date: '2014-10-04'},
        {itemName: 'tortillas', date: '2014-10-04'}
    ]

}]);