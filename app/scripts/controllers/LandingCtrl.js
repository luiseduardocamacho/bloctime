(function(){
  function LandingCtrl($interval){
    var $ctrl = this;
    $ctrl.time = 10;
    $ctrl.StartPauseTime = StartPauseTime;
    $ctrl.StartTime = StartTime;
    $ctrl.state = 'Start';
    $ctrl.RestartTimer = RestartTimer;
    $ctrl.onBreak = false;
    $ctrl.onBreakLabel = 'On Break';
    $ctrl.onBreakRestartLabel = 'On Break - Click to Start New Work Session'

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
          if($ctrl.time == 0 && !$ctrl.onBreak) {
            $interval.cancel(timer);
            $ctrl.state = 'Start';
            $ctrl.time = 5;
            $ctrl.onBreak = true;
          }
          else if ($ctrl.time == 0 && $ctrl.onBreak){
            $interval.cancel(timer);
            $ctrl.state = 'Start';
            $ctrl.time = 10;
            $ctrl.onBreak = false;
            }
      }, 1000);
    }


    function RestartTimer(){
      $interval.cancel(timer);
      $ctrl.onBreak = false;
      $ctrl.time = 10;
      $ctrl.state = 'Start';
    }
}
  angular
    .module('blocTime')
    .controller('LandingCtrl', LandingCtrl);
})();
