(function(){
  function LandingCtrl($interval, $scope, Tasks){
    $scope.tasks = Tasks;
    var $ctrl = this;
    var mySound = new buzz.sound( "assets/music/ElevatorDing", {
        formats:['mp3'],
        preload: true
      });
    $ctrl.time = 15;
    $ctrl.StartPauseTime = StartPauseTime;
    $ctrl.StartTimer = StartTimer;
    $ctrl.state = 'Start';
    $ctrl.RestartTimer = RestartTimer;
    $ctrl.onBreak = false;
    $ctrl.onBreakLabel = 'On Break';
    $ctrl.onBreakRestartLabel = 'On Break - Click to Start New Work Session';
    $ctrl.breakCount = 1;

    $scope.dingMonitor = false;




    $scope.$watch('dingMonitor', function() {
      if ($scope.dingMonitor == true){
          console.log($scope.dingMonitor);
          mySound.play();
          $scope.dingMonitor = false;
      }
    });

    function StartPauseTime(){
      if ($ctrl.state == 'Start'){
        StartTimer();
      }

      else if($ctrl.state == 'Start Over'){
        RestartTimer();
      }
    }

    function StartTimer(){
      timer = $interval(function() {
          $ctrl.state = 'Start Over';
          $ctrl.time = $ctrl.time - 1;
          if($ctrl.time == 0 && !$ctrl.onBreak && $ctrl.breakCount < 4) {
            $interval.cancel(timer);
            $scope.dingMonitor = true;
            $ctrl.state = 'Start';
            $ctrl.time = 3;
            $ctrl.breakCount++;
            $ctrl.onBreak = true;

          }
          else if($ctrl.time == 0 && !$ctrl.onBreak && $ctrl.breakCount == 4){
            $interval.cancel(timer);
            $scope.dingMonitor = true;
            $ctrl.state = 'Start';
            $ctrl.time = 18;
            $ctrl.breakCount = 1;
            $ctrl.onBreak = true;
          }
          else if ($ctrl.time == 0 && $ctrl.onBreak){
            $interval.cancel(timer);
            $scope.dingMonitor = true;
            $ctrl.state = 'Start';
            $ctrl.time = 15;
            $ctrl.onBreak = false;
            }
      }, 1000);
    }


    function RestartTimer(){
      $interval.cancel(timer);
      $ctrl.onBreak = false;
      $ctrl.time = 15;
      $ctrl.state = 'Start';
    }
}
  angular
    .module('blocTime')
    .controller('LandingCtrl', LandingCtrl);
})();
