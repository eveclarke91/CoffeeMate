var app = angular.module('CoffeeMateWebApp');

app.controller('coffeeController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.formData = {};

    $scope.message = 'Enter your coffee details below...';
    $scope.coffeeprice = 0;


    $scope.formData.coffeename = '';
    $scope.formData.coffeeprice = 0;
    $scope.formData.coffeeshop = '';
    $scope.formData.upvotes = 0;


    $scope.addCoffee = function () {
        $http.post('/coffees', $scope.formData)
            .success(function (data) {
                $scope.coffees = data;
                $location.path('/coffees');

                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}
    ]);