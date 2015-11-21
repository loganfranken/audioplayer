(function() {

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

    // File Input
    this.fileInputElem = document.createElement('input');
    this.fileInputElem.setAttribute('type', 'file');
    this.fileInputElem.addEventListener('change', function() { self.onLoadFile.apply(self, arguments); }, false);
    this.playerElem.appendChild(this.fileInputElem);

    // Audio Player
    this.audioElem = document.createElement('audio');
    this.audioElem.setAttribute('controls', '');
    this.playerElem.appendChild(this.audioElem);

  }

  AudioPlayer.prototype.onLoadFile = function(fileInputEvent) {

    var audioElem = this.audioElem;

    var file = fileInputEvent.target.files[0];

    if(file)
    {
      var reader = new FileReader();

      reader.onload = function(fileLoadEvent)
      {
          var dataUrl = fileLoadEvent.currentTarget.result;
          audioElem.setAttribute('src', dataUrl);
          audioElem.focus();
      }

      reader.readAsDataURL(file);
    }

  }

  function handleKeyDown(keyDownEvent)
  {
    // Handle: Toggle Pause/Play
    if(keyDownEvent.keyCode === KeyCode.Space)
    {
      if(audioPlayer.paused)
      {
        audioPlayer.play();
      }
      else
      {
        audioPlayer.pause();
      }
    }

    // Handle: Rewind
    if(keyDownEvent.keyCode === KeyCode.LeftArrow)
    {
      audioPlayer.currentTime--;
    }

    // Handle: Fast-Forward
    if(keyDownEvent.keyCode === KeyCode.RightArrow)
    {
      audioPlayer.currentTime++;
    }
  }

  document.addEventListener('keydown', handleKeyDown, false);

  var players = document.getElementsByClassName('audio-player');
  var playerCount = players.length;

  for(var i=0; i<playerCount; i++)
  {
    var player = new AudioPlayer(players[i]);
    player.init();
  }

})();
