var app = {
  template: $('#clock-template').html(),
  container:$('#clock-container'),
  count: 0,
  Timers: [],
  keyMap: [],

  init: function() {
    this.binds();
  },

  binds: function() {
    var that = this;

    $('#start-all-clock').click(function() {
      for(let tt=0; tt<that.Timers.length; tt++){
        let timer = that.Timers[tt];
        timer.start({precision: 'secondTenths'});
        $('#clock-container #clock-'+tt+' span.status').html('Started by "Start All"');
      }
    });

    $('#stop-all-clock').click(function() {
      for(let tt=0; tt<that.Timers.length; tt++){
        let timer = that.Timers[tt];
        timer.stop();
        $('#clock-container #clock-'+tt+' span.status').html('Stopped by "Stop All"');
      }
    });

    $('#add-clock').click(function() {
      let keyStart = $('#key-map-start').val().toUpperCase();
      if (keyStart == '') {
        alert("Cannot add empty key");
        return false;
      }
      let keyPause = $('#key-map-pause').val().toUpperCase();
      if (keyPause == '') {
        alert("Cannot add empty key");
        return false;
      }
      let keyStop = $('#key-map-stop').val().toUpperCase();
      if (keyStop == '') {
        alert("Cannot add empty key");
        return false;
      }
      let keyReset = $('#key-map-reset').val().toUpperCase();
      if (keyReset == '') {
        alert("Cannot add empty key");
        return false;
      }
      $('#key-map-start').focus();
      $('#key-map-start').val('');
      $('#key-map-pause').val('');
      $('#key-map-stop').val('');
      $('#key-map-reset').val('');

      let loadTemplate = that.template;

      loadTemplate = loadTemplate.replace(/no/g, that.count);
      loadTemplate = loadTemplate.replace(/Start/g, 'Start'+' ('+keyStart.toLowerCase()+')');
      loadTemplate = loadTemplate.replace(/Pause/g, 'Pause'+' ('+keyPause.toLowerCase()+')');
      loadTemplate = loadTemplate.replace(/Stop/g, 'Stop'+' ('+keyStop.toLowerCase()+')');
      loadTemplate = loadTemplate.replace(/Reset/g, 'Reset'+' ('+keyReset.toLowerCase()+')');
      loadTemplate = loadTemplate.replace(/kkey-start/g, keyStart);
      loadTemplate = loadTemplate.replace(/kkey-pause/g, keyPause);
      loadTemplate = loadTemplate.replace(/kkey-stop/g, keyStop);
      loadTemplate = loadTemplate.replace(/kkey-reset/g, keyReset);

      obb = {
        'startButton': keyStart,
        'pauseButton': keyPause,
        'stopButton': keyStop,
        'resetButton': keyReset
      };

      that.container.append(loadTemplate);
      that.keyMap[that.count] = obb;

      that.createTimer();
      that.count++;
    });
  },

  createTimer: function() {
    let index = this.count;
    let timer = new Timer();


    $('#clock-container #clock-'+index+' .startButton').click(function (e) {
        $('#clock-container #clock-'+index+' span.status').html('started');
        // console.log(index);
        // console.log('-----');
        // console.log(e.keyCode);
        // console.log(String.fromCharCode(e.keyCode));
        timer.start({precision: 'secondTenths'});
    });
    $('#clock-container #clock-'+index+' .pauseButton').click(function () {
        $('#clock-container #clock-'+index+' span.status').html('paused');
        timer.pause();
    });
    $('#clock-container #clock-'+index+' .stopButton').click(function () {
        $('#clock-container #clock-'+index+' span.status').html('stopped');
        timer.stop();
    });
    $('#clock-container #clock-'+index+' .resetButton').click(function () {
        $('#clock-container #clock-'+index+' span.status').html('resetted');
        timer.reset();
        timer.stop();
    });
    timer.addEventListener('secondTenthsUpdated', function (e) {
    // timer.addEventListener('secondsUpdated', function (e) {
      $('#clock-container #clock-'+index+' .values .hr .title').html(timer.getTimeValues().hours);
      $('#clock-container #clock-'+index+' .values .min .title').html(timer.getTimeValues().minutes);
      $('#clock-container #clock-'+index+' .values .sec .title').html(timer.getTimeValues().seconds);
      $('#clock-container #clock-'+index+' .values .mili .title').html(timer.getTimeValues().secondTenths);
    });
    timer.addEventListener('started', function (e) {
      $('#clock-container #clock-'+index+' .values .hr .title').html(timer.getTimeValues().hours);
      $('#clock-container #clock-'+index+' .values .min .title').html(timer.getTimeValues().minutes);
      $('#clock-container #clock-'+index+' .values .sec .title').html(timer.getTimeValues().seconds);
      $('#clock-container #clock-'+index+' .values .mili .title').html(timer.getTimeValues().secondTenths);
    });
    timer.addEventListener('reset', function (e) {
      $('#clock-container #clock-'+index+' .values .hr .title').html(timer.getTimeValues().hours);
      $('#clock-container #clock-'+index+' .values .min .title').html(timer.getTimeValues().minutes);
      $('#clock-container #clock-'+index+' .values .sec .title').html(timer.getTimeValues().seconds);
      $('#clock-container #clock-'+index+' .values .mili .title').html(timer.getTimeValues().secondTenths);
    });

    this.Timers[index] = timer;

    this.reBindEvent();

  },

  rebindable: function() {
    var that = this;
    console.log('able');
    $(document).keydown(function(e) {
      console.log('Ee');
      console.log(e.keyCode);
      console.log(String.fromCharCode(e.keyCode));
      for (let ii=0; ii<that.keyMap.length; ii++) {
        startKey = that.keyMap[ii]['startButton'];
        pauseKey = that.keyMap[ii]['pauseButton'];
        stopKey = that.keyMap[ii]['stopButton'];
        resetKey = that.keyMap[ii]['resetButton'];

        if (e.keyCode == startKey.charCodeAt(0)) {
          console.log('keystart');
          $('#clock-container #clock-'+ii+' .startButton').click();
        } else if (e.keyCode == pauseKey.charCodeAt(0)) {
          $('#clock-container #clock-'+ii+' .pauseButton').click();
        } else if (e.keyCode == stopKey.charCodeAt(0)) {
          $('#clock-container #clock-'+ii+' .stopButton').click();
        } else if (e.keyCode == resetKey.charCodeAt(0)) {
          $('#clock-container #clock-'+ii+' .resetButton').click();
        }
      }

    });
  },

  reBindEvent: function() {
    console.log('rebind');
    $(document).unbind('keydown');

    this.rebindable();
  }

};

app.init();