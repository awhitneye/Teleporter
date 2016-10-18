var app = angular.module('teleporter', []);

app.controller('SkyCtrl', function($scope, $sce, $http) {
  
  $scope.equirectangular = 'https://c6.staticflickr.com/9/8273/30215908325_2cacc343fa_b.jpg';

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.parseUrl = function(url) {
    return JSON.parse(JSON.stringify(url));
  };

  $scope.fetchNewImage = function() {
    console.log('FETCHING...');
    return $http({
      url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9edf145e07ba220c42ade82e1759810d&tags=' + 'outdoor' + '&group_id=44671723%40N00&extras=url_l&format=json&nojsoncallback=1',
      method: 'GET'
    }).then(function(res) {
      var rand = Math.floor(Math.random() * res.data.photos.photo.length);
      $scope.equirectangular = $scope.parseUrl(res.data.photos.photo[rand].url_l);
    });
  };

});
