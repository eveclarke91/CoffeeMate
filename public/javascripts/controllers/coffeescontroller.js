var app = angular.module('CoffeeMateWebApp');

app.controller('coffeesController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    // create a message to display in our view
    $scope.message = 'Coffees Page!';

    findAll();


    function findAll() {
        $http.get('/coffees')
            .success(function (data) {
                $scope.coffees = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.incrementUpvotes = function(id){
        $http.put('/coffees/' + id + '/votes')
            .success(function (data){
                console.log(data);
                findAll();
            })
            .error(function (data){
                console.log('Error:' + data);
            });
    };
    $scope.favouriteoff = function(id){
        $http.put('/coffees/' + id + '/favoff')
            .success(function (data){
                console.log(data);
                findAll();
            })
            .error(function (data){
                console.log('Error:' + data);
            });
    };
    $scope.favouriteon = function(id){
        $http.put('/coffees/' + id + '/favon')
            .success(function (data){
                console.log(data);
                findAll();
            })
            .error(function (data){
                console.log('Error:' + data);
            });
    };

    $scope.update = function(id) {
        $location.path('/coffees/' + id);
        /*
        $http.put('/updatecoffee/' + id)
            .success(function (data){
                console.log(data);
                findAll();
            })
            .error(function (data) {
                console.log('Error:' + data);
                //    console.log('Deleting id : ' + id);
                //Write your 'delete' request here
                //  }
            });
            */
    };

    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this Coffee?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/coffees/' + id)
            .success(function (data){

                console.log(data);
                findAll();
            })
                .error(function (data){
                    console.log('Error:' + data);
                });
        }
    };
    }
    ]);

