var app = angular.module('CoffeeMateWebApp');

app.controller('coffeesController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    // create a message to display in our view
    $scope.message = 'Coffees Page!';
    $scope.coords = [];

    findAll();

    $scope.map = {
        center: [52.655,-7.2442],
        options: function() {
            return {
                streetViewControl: false,
                scrollwheel: false
            }
        },
    };
    $scope.marker = {

    }

    $scope.points = {
        coords: [
            [47,-122]
        ],
        options: function(coords, properties, i, map) {
            return {
                draggable: false
            }
        },

        decimals: 3
    };

    $scope.infowindow = {
        //position: [52.655,-7.2442]
    }


    function findAll() {
        $http.get('/coffees')
            .success(function (data) {
                $scope.coffees = data;
                console.log(data);

                angular.forEach($scope.coffees, function(obj){
                    $scope.coords.push([ obj["lat"],obj["lng"] ]);
                });
                $scope.points = {
                    coords: $scope.coords,
                    events: {
                        click: function(e,point,map,points) {


                        /*
                            var str = e.latLng.toString();
                            var coord = str.split(",");

                            var lat = coord[0].split("(");
                            var lat = lat[1];
                            var lat = Math.round(lat * 10000) / 10000;
                            alert(lat);

                            var lng = coord[1].split(")");
                            var lng = lng[0];
                            var lng = Math.round(lng * 10000) / 10000;
                            alert(lng);


                            var index = $scope.coords.indexOf({"lat": lat,"lng": lng});
                            alert (index);

                        */

                            $scope.infowindow.position = e.latLng;
                            $scope.infowindow.coffeeshop = "Coffe Shop";
                            $scope.$apply();
                        }
                    }
                };

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    }

    /*angular.forEach($scope.coffees, function(value, key, obj){
        alert(obj[key][lat]);
    });*/

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

