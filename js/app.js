
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
        {id:1, completed:true, itemName: 'milk', date: new Date("October 1,2014 11:!3:00")},
        {id:2, completed:true, itemName: 'cookies', date: new Date("October 1,2014 11:!3:00")},
        {id:3, completed:true, itemName: 'ice cream', date: new Date("October 2,2014 11:!3:00")},
        {id:4, completed:true, itemName: 'potatoes', date: new Date("October 2,2014 11:!3:00")},
        {id:5, completed:true, itemName: 'cereal', date: new Date("October 2,2014 11:!3:00")},
        {id:6, completed:true, itemName: 'bread', date: new Date("October 3,2014 11:!3:00")},
        {id:7, completed:true, itemName: 'eggs', date: new Date("October 4,2014 11:!3:00")},
        {id:8, completed:true, itemName: 'tortillas', date: new Date("October 4,2014 11:!3:00")}
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
    };

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
        
        
    };

    groceryService.removeItem = function(entry){
        var index = groceryService.groceryItems.indexOf(entry);
        groceryService.groceryItems.splice(index,1); // implies start from index 'index' and delete number of entries = 1


    };

    return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function($scope,GroceryService) {
    $scope.appTitle = "Grocery list";
    //console.log('inside home controller');
     $scope.groceryItems = GroceryService.groceryItems;

     $scope.removeItem=function(entry){
        GroceryService.removeItem(entry);
     }
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

// creating custom directive
app.directive("tbGroceryItem",function(){
    return{
        restrict: 'E',
        templateUrl: 'Views/groceryItem.html'
    }
});