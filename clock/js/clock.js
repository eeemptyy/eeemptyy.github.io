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
    this.bindModal();
    this.bindClock();
  },

  bindModal: function() {
    var that = this;

    $('#toggleExportModal').click(function() {
      $('#setting-fields').html(JSON.stringify(that.keyMap))
      const modal = document.querySelector('#modelExportContent')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
    });

    $('#toggleImportModal').click(function() {
      const modal = document.querySelector('#modelImportContent')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
    });

    $('.modal-close-export').click(function() {
      const modal = document.querySelector('#modelExportContent')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
    });

    $('.modal-close-import').click(function() {
      const modal = document.querySelector('#modelImportContent')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
    });

    $('#import-settings').click(function() {
      settings = $('#settings-data').val();
      console.log(settings)
      if (settings == '') {
        console.log('gg');
        alert("Can't import empty values.");
        return false;
      }
      console.log('xd')
      that.createFromSettings(JSON.parse(settings));
    });
  },

  bindClock: function() {
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

      obb = {
        'startButton': keyStart,
        'pauseButton': keyPause,
        'stopButton': keyStop,
        'resetButton': keyReset
      };

      that.buildClock(obb);
    });
  },

  buildClock: function(keys) {
    let loadTemplate = this.template;

    loadTemplate = loadTemplate.replace(/no/g, this.count);
    loadTemplate = loadTemplate.replace(/Start/g, 'Start'+' ('+ keys.startButton.toLowerCase()+')');
    loadTemplate = loadTemplate.replace(/Pause/g, 'Pause'+' ('+ keys.pauseButton.toLowerCase()+')');
    loadTemplate = loadTemplate.replace(/Stop/g, 'Stop'+' ('+ keys.stopButton.toLowerCase()+')');
    loadTemplate = loadTemplate.replace(/Reset/g, 'Reset'+' ('+ keys.resetButton.toLowerCase()+')');
    loadTemplate = loadTemplate.replace(/kkey-start/g, keys.startButton);
    loadTemplate = loadTemplate.replace(/kkey-pause/g, keys.pauseButton);
    loadTemplate = loadTemplate.replace(/kkey-stop/g, keys.stopButton);
    loadTemplate = loadTemplate.replace(/kkey-reset/g, keys.resetButton);

    this.container.append(loadTemplate);
    this.keyMap[this.count] = keys;

    this.createTimer();
    this.count++;
  },

  createFromSettings: function(settingDatas) {
    for (i=0; i<settingDatas.length; i++) {
      this.buildClock(settingDatas[i]);
    }
    $('.modal-close-import').click();
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
      $('#clock-container #clock-'+index+' .hr .title').html(timer.getTimeValues().hours);
      $('#clock-container #clock-'+index+' .min .title').html(timer.getTimeValues().minutes);
      $('#clock-container #clock-'+index+' .sec .title').html(timer.getTimeValues().seconds);
      $('#clock-container #clock-'+index+' .mili .title').html(timer.getTimeValues().secondTenths);
    });
    timer.addEventListener('started', function (e) {
      $('#clock-container #clock-'+index+' .hr .title').html(timer.getTimeValues().hours);
      $('#clock-container #clock-'+index+' .min .title').html(timer.getTimeValues().minutes);
      $('#clock-container #clock-'+index+' .sec .title').html(timer.getTimeValues().seconds);
      $('#clock-container #clock-'+index+' .mili .title').html(timer.getTimeValues().secondTenths);
    });
    timer.addEventListener('reset', function (e) {
      $('#clock-container #clock-'+index+' .hr .title').html(timer.getTimeValues().hours);
      $('#clock-container #clock-'+index+' .min .title').html(timer.getTimeValues().minutes);
      $('#clock-container #clock-'+index+' .sec .title').html(timer.getTimeValues().seconds);
      $('#clock-container #clock-'+index+' .mili .title').html(timer.getTimeValues().secondTenths);
    });

    this.Timers[index] = timer;

    this.reBindEvent();
  },

  rebindable: function() {
    var that = this;
    $(document).keydown(function(e) {
      for (let ii=0; ii<that.keyMap.length; ii++) {
        startKey = that.keyMap[ii]['startButton'];
        pauseKey = that.keyMap[ii]['pauseButton'];
        stopKey = that.keyMap[ii]['stopButton'];
        resetKey = that.keyMap[ii]['resetButton'];

        if (e.keyCode == startKey.charCodeAt(0)) {
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
    $(document).unbind('keydown');
    this.rebindable();
  }
};

app.init();