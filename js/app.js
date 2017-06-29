
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
app.service("GroceryService",function($http){
    var groceryService = []
    groceryService.groceryItems = [];    
    
    $http.get("data/server_data.json")
        .success(function(data){
                groceryService.groceryItems = data;

                for(var item in groceryService.groceryItems)
                {
                    groceryService.groceryItems.item.date = new Date(groceryService.groceryItems.item.date);
                }
        })
        .error(function(data){
                alert("Things went wrong");
        })

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

    groceryService.markCompleted = function(entry){
        entry.completed = !entry.completed;
    };

    return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function($scope,GroceryService) {
    $scope.appTitle = "Grocery list of Items";
    //console.log('inside home controller');
     $scope.groceryItems = GroceryService.groceryItems;

     $scope.removeItem=function(entry){
        GroceryService.removeItem(entry);
     }

     $scope.markCompleted = function(entry){
        GroceryService.markCompleted(entry);
     }

     $scope.$watch( function(){ return GroceryService.groceryItems; }, function(groceryItems) {
        $scope.groceryItems = groceryItems;
    })

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