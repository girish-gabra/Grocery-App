
var app = angular.module('groceryListApp', ['ngRoute']);

// Add a router
app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "views/groceryList.html",
            controller:  "HomeController"
        })
        .when("/addItem", {
            templateUrl: "views/addItem.html",
            controller:  "GroceryListItemController"
        })
        .when("/addItem/edit/:id", {
            templateUrl: "views/addItem.html",
            controller:  "GroceryListItemController"
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
    console.log('inside groceryService');
    groceryService.findByID = function(id){
        for(var item in groceryService.groceryItems)
        {
            if(groceryService.groceryItems[item].id == id){
                return groceryService.groceryItems[item];
            }
        }
    }

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
        
        var updatedItem = groceryService.findByID(entry.id);

        if(updatedItem){
           updatedItem.completed = entry.completed; 
           updatedItem.itemName = entry.itemName;
           updatedItem.date = entry.date;     
        }
        else{
            entry.id = groceryService.getNewID();    
            groceryService.groceryItems.push(entry);
        }
        
        
    }

    return groceryService
});

app.controller("HomeController", ["$scope", "GroceryService", function($scope,GroceryService) {
    $scope.appTitle = "Grocery list";
    //console.log('inside home controller');
     $scope.groceryItems = GroceryService.groceryItems;
}]);

app.controller("GroceryListItemController",  ["$scope","$routeParams","$location", "GroceryService",  function($scope,$routeParams,$location,GroceryService){
   
    if(!$routeParams.id){   // if no id is passed then create new item else edit the current item
        $scope.groceryItem = {id:0, completed:false, itemName:"",date: new Date()} ;    
    }else{
        // clone current object as if edit original and press cancel it will still show changed value because of
        // two way data binding
        $scope.groceryItem = _.clone(GroceryService.findByID(parseInt($routeParams.id)));   
        console.log($scope.groceryItem);
    } 
    
    $scope.save = function(){
        GroceryService.save($scope.groceryItem);
        $location.path("/");
    }
    //console.log($scope.groceryItems);
}]);