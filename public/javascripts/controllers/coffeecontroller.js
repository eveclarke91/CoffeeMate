var app = angular.module('CoffeeMateWebApp');

app.controller('coffeeController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.formData = {};

    $scope.message = 'Enter your coffee details below...';
    $scope.coffeeprice = 0;


    $scope.formData.coffeename = '';
    $scope.formData.coffeeprice = 0;
    $scope.formData.coffeeshop = '';
    $scope.formData.upvotes = 0;
    $scope.map = {
        center: [52.655,-7.2442],
        options: function() {
            return {
                streetViewControl: false,
            }
        }
    }
    $scope.marker = {
        position: [52.655,-7.2442],
        decimals: 4,
        options: function(){
            return {
                draggable: true
            }
        }
    }


    $scope.addCoffee = function () {
        $scope.formData.lat = $scope.marker.position[0];
        $scope.formData.lng = $scope.marker.position[1];
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