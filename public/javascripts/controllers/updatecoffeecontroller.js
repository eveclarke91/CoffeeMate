var app = angular.module('CoffeeMateWebApp');

    app.controller('updatecoffeeController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {
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

        var currentId = $routeParams.id;
        $scope.formData = {};
        $scope.message = 'Enter your coffee details below...';

        $http.get('/coffees/'+currentId)
        .success(function(data) {
            if(data["coffeerating"] == null) {
                $scope.formData.coffeerating = 1;
            }else{
                $scope.formData.coffeerating = data["coffeerating"];
            }
            $scope.formData.coffeename = data["coffeename"];
            $scope.formData.coffeeprice = data["coffeeprice"];
            $scope.formData.coffeeshop = data["coffeeshop"];
            $scope.formData.coffeefavourite = data["coffeefavourite"];
            $scope.formData.id = data["_id"];
            $scope.formData.lat = data["lat"];
            $scope.formData.lng = data["lng"];

            if(data["lat"] == null && data["lng"]== null) {
                $scope.map = {
                    center: [52.655,-7.2442]
                }
                $scope.marker = {
                    position: [52.655, -7.2442]
                }
            }else{
                $scope.map = {
                    center: [data["lat"],data["lng"]]
                }
                $scope.marker = {
                    position: [data["lat"], data["lng"]]
                }
            }
            //$scope.formData.upvotes = data["upvotes"];



            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });


        $scope.update = function () {
            $scope.formData.lat = $scope.marker.position[0];
            $scope.formData.lng = $scope.marker.position[1];
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

        $scope.settrue = function(){
            $scope.formData.coffeefavourite = true;
        };
        $scope.setfalse = function(){
            $scope.formData.coffeefavourite = false;
        };

        $scope.set1 = function(){
            $scope.formData.clicked = 1;
            $scope.formData.coffeerating = 1;
        };
        $scope.set2 = function(){
            $scope.formData.clicked = 2;
            $scope.formData.coffeerating = 2;
        };
        $scope.set3 = function(){
            $scope.formData.clicked = 3;
            $scope.formData.coffeerating = 3;
        };
        $scope.set4 = function(){
            $scope.formData.clicked = 4;
            $scope.formData.coffeerating = 4;
        };
        $scope.set5 = function(){
            $scope.formData.clicked = 5;
            $scope.formData.coffeerating = 5;
        };

        $scope.resetrating = function(){
            if($scope.formData.clicked == null){
                $scope.formData.clicked = 1;
            }
            $scope.formData.coffeerating = $scope.formData.clicked;
        };

        $scope.hoverset1 = function(){
            $scope.formData.coffeerating = 1;
        };
        $scope.hoverset2 = function(){
            $scope.formData.coffeerating = 2;
        };
        $scope.hoverset3 = function(){
            $scope.formData.coffeerating = 3;
        };
        $scope.hoverset4 = function(){
            $scope.formData.coffeerating = 4;
        };
        $scope.hoverset5 = function(){
            $scope.formData.coffeerating = 5;
        };

    }
]);