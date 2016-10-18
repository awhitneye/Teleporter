var app = angular.module('teleporter', []);

app.controller('SkyCtrl', function($scope, $sce) {
  
  $scope.equirectangular = 'https://c6.staticflickr.com/9/8273/30215908325_2cacc343fa_b.jpg';

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  
});
