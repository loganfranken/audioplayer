(function() {

  var defaultStatusMessage = 'Drop a file here or choose one';

  var KeyCode = {
    Space: 32,
    LeftArrow: 37,
    RightArrow: 39
  };

  function AudioPlayer(playerElem) {
    this.playerElem = playerElem;
    this.fileInputElem = null;
    this.audioElem = null;
  }

  AudioPlayer.prototype.init = function() {

    var self = this;

    // Status Message
    this.statusMessageElem = document.createElement('div');
    this.statusMessageElem.innerHTML = defaultStatusMessage;
    this.playerElem.appendChild(this.statusMessageElem);

    // File Input
    this.fileInputElem = document.createElement('input');
    this.fileInputElem.setAttribute('type', 'file');
    this.fileInputElem.addEventListener('change', function() { self.onLoadFile.apply(self, arguments); }, false);
    this.playerElem.appendChild(this.fileInputElem);

    // Audio Player
    this.audioElem = document.createElement('audio');
    this.audioElem.setAttribute('controls', '');
    this.playerElem.appendChild(this.audioElem);

    // Keyboard Controls
    document.addEventListener('keydown', function() { self.onKeyDown.apply(self, arguments); }, false);

    // Drag and Drop Events
    this.playerElem.addEventListener('dragenter', function() { self.onDragEnter.apply(self, arguments); }, false);
    this.playerElem.addEventListener('dragleave', function() { self.onDragLeave.apply(self, arguments); }, false);
    this.playerElem.addEventListener('dragover', function() { self.onDragOver.apply(self, arguments); }, false);
    this.playerElem.addEventListener('drop', function() { self.onDrop.apply(self, arguments); }, false);

  }

  AudioPlayer.prototype.onLoadFile = function(fileInputEvent) {

    var audioElem = this.audioElem;

    var file = fileInputEvent.target.files[0];
    this.loadFile(file);

  }

  AudioPlayer.prototype.onKeyDown = function(keyDownEvent) {

    // Handle: Toggle Pause/Play
    if(keyDownEvent.keyCode === KeyCode.Space)
    {
      if(this.audioElem.paused)
      {
        this.audioElem.play();
      }
      else
      {
        this.audioElem.pause();
      }
    }

    // Handle: Rewind
    if(keyDownEvent.keyCode === KeyCode.LeftArrow)
    {
      this.audioElem.currentTime--;
    }

    // Handle: Fast-Forward
    if(keyDownEvent.keyCode === KeyCode.RightArrow)
    {
      this.audioElem.currentTime++;
    }

  }

  AudioPlayer.prototype.onDragEnter = function(dragEvent) {

    dragEvent.stopPropagation();
    dragEvent.preventDefault();

  }

  AudioPlayer.prototype.onDragLeave = function(dragEvent) {

    dragEvent.stopPropagation();
    dragEvent.preventDefault();

    this.statusMessageElem.innerHTML = defaultStatusMessage;

  }

  AudioPlayer.prototype.onDragOver = function(dragEvent) {

    dragEvent.stopPropagation();
    dragEvent.preventDefault();

    dragEvent.dataTransfer.dropEffect = 'copy';

  }

  AudioPlayer.prototype.onDrop = function(dropEvent) {

    dropEvent.stopPropagation();
    dropEvent.preventDefault();

    // Update status message text
    this.statusMessageElem.innerHTML = defaultStatusMessage;

    // Load the file
    this.loadFile(dropEvent.dataTransfer.files[0]);

  }

  AudioPlayer.prototype.loadFile = function(file) {

    var audioElem = this.audioElem;

    if(file)
    {
      var reader = new FileReader();

      reader.onload = function(fileLoadEvent)
      {
          var dataUrl = fileLoadEvent.currentTarget.result;
          audioElem.setAttribute('src', dataUrl);
          audioElem.focus();
          audioElem.play();
      }

      reader.readAsDataURL(file);
    }

  }

  // Initialize the audio players
  var players = document.getElementsByClassName('audio-player');
  var playerCount = players.length;

  for(var i=0; i<playerCount; i++)
  {
    var player = new AudioPlayer(players[i]);
    player.init();
  }

})();
