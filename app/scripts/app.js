(function () {
  function config($stateProvider, $locationProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingCtrl as $ctrl',
        templateUrl: '/templates/landing.html'
      });
}
angular
  .module('blocTime', ['ui.router'])
  .config(config);
})();;
