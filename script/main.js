(function() {

  var defaultStatusMessage = 'Drop a File or Choose One';

  var KeyCode = {
    Space: 32,
    LeftArrow: 37,
    RightArrow: 39
  };

  var State = {
    Default: 0,
    Active: 1,
    Playing: 2
  };

  function AudioPlayer(playerElem) {
    this.playerElem = playerElem;
    this.fileInputElem = null;
    this.audioElem = null;
  }

  AudioPlayer.prototype.init = function() {

    var self = this;

    this.currentTrackTitle = 'N/A';

    // Status Message
    this.statusMessageElem = document.createElement('div');
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

    this.setState(State.Default);

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

    this.setState(State.Active);

  }

  AudioPlayer.prototype.onDragLeave = function(dragEvent) {

    dragEvent.stopPropagation();
    dragEvent.preventDefault();

    this.setState(State.Default);

  }

  AudioPlayer.prototype.onDragOver = function(dragEvent) {

    dragEvent.stopPropagation();
    dragEvent.preventDefault();

    dragEvent.dataTransfer.dropEffect = 'copy';

  }

  AudioPlayer.prototype.onDrop = function(dropEvent) {

    dropEvent.stopPropagation();
    dropEvent.preventDefault();

    // Load the file
    this.loadFile(dropEvent.dataTransfer.files[0]);

  }

  AudioPlayer.prototype.loadFile = function(file) {

    var self = this;
    var audioElem = this.audioElem;

    if(file)
    {
      var reader = new FileReader();

      reader.onload = function(fileLoadEvent)
      {
          self.currentTrackTitle = file.name;
          self.setState(State.Playing);

          var dataUrl = fileLoadEvent.currentTarget.result;
          audioElem.setAttribute('src', dataUrl);
          audioElem.focus();
          audioElem.play();
      }

      reader.readAsDataURL(file);
    }

  }

  AudioPlayer.prototype.setState = function(state) {

    // State: Default
    if(state === State.Default)
    {
      this.statusMessageElem.innerHTML = defaultStatusMessage;
      this.playerElem.className = 'audio-player state-default';
    }

    // State: Active
    if(state === State.Active)
    {
      this.playerElem.className = 'audio-player state-active';
    }

    // State: Playing
    if(state === State.Playing)
    {
      this.statusMessageElem.innerHTML = '<strong>Playing:</strong> ' + this.currentTrackTitle;
      this.playerElem.className = 'audio-player state-playing';
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
