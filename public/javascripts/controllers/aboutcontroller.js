var app = angular.module('CoffeeMateWebApp');

app.controller('aboutController', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = 'Look, I\'m an About Page!';
}
]);