## Version 1.0:

* First release of js-utils.  Added a Timer utility with following features:

* Start a timer through the start() function

* Once a timer is started, it can be paused/resumed using the pause_resume()
  function and it keeps track of the elapsed time (as long as it has not 
  been stopped).

* A timer can be stopped using the stop() function.  When a timer is stopped,
  it cannot be started/paused/resumed unless reset

* A stopped timer can be reset using the reset() function upon which it can
  be restarted
