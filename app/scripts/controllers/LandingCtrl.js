(function(){
  function LandingCtrl($interval){
    var $ctrl = this;
    $ctrl.time = 1500;
    $ctrl.StartPauseTime = StartPauseTime;
    $ctrl.StartTime = StartTime;
    $ctrl.state = 'Start';
    $ctrl.RestartTimer = RestartTimer;

    function StartPauseTime(){
      if ($ctrl.state == 'Start'){
        StartTime();
      }
      else if($ctrl.state == 'Start Over'){
        RestartTimer();
      }
    }

    function StartTime(){
      timer = $interval(function() {
        $ctrl.state = 'Start Over';
        $ctrl.time = $ctrl.time - 1;
        if($ctrl.time == 0) {
          $interval.cancel(timer);
          $ctrl.state = 'Start';
          $ctrl.time = 1500;
          }
      }, 1000);
    }

    function RestartTimer(){
      $interval.cancel(timer);
      $ctrl.time = 1500;
      $ctrl.state = 'Start';
    }
  }

  angular
    .module('blocTime')
    .controller('LandingCtrl', LandingCtrl);

})();
