(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    // Add Task Method
    var addTask = function(text) {

        tasks.$add({
            list:text,
            timestamp: Date.now()
        });
    }

    return {
      all: tasks,
      addTask: addTask
    };
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
