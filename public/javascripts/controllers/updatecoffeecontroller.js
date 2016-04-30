var app = angular.module('CoffeeMateWebApp');

    app.controller('updatecoffeeController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {

        var currentId = $routeParams.id;
        $scope.formData = {};
        $scope.message = 'Enter your coffee details below...';

        $http.get('/coffees/'+currentId)
        .success(function(data) {
            $scope.formData.coffeename = data["coffeename"];
            $scope.formData.coffeeprice = data["coffeeprice"];
            $scope.formData.coffeeshop = data["coffeeshop"];
            //$scope.formData.upvotes = data["upvotes"];
            $scope.formData.rating = data["coffeerating"];
            $scope.formData.id = data["_id"];

            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });


        $scope.update = function () {
            $http.post('/update', $scope.formData)
                .success(function (data) {
                    //$scope.coffees = data;
                    $location.path('/coffees');

                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

    }
]);