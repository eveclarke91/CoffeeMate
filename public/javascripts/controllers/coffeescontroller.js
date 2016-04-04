var app = angular.module('CoffeeMateWebApp');

app.controller('coffeesController', ['$scope', '$http', function($scope, $http) {
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
    }

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

