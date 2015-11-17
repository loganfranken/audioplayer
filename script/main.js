(function() {

  var KeyCode = {
    Space: 32,
    LeftArrow: 37,
    RightArrow: 39
  };

  document.addEventListener('keydown', handleKeyDown, false);

  var players = document.getElementsByClassName('audio-player');
  var playerCount = players.length;

  for(var i=0; i<playerCount; i++)
  {
    initPlayer(players[i]);
  }

  function initPlayer(player)
  {
    // File Input
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', loadFile, false);
    player.appendChild(fileInput);

    // Audio Player
    var audioPlayer = document.createElement('audio');
    audioPlayer.setAttribute('controls', '');
    player.appendChild(audioPlayer);
  }

  function loadFile(fileInputEvent)
  {
    var file = fileInputEvent.target.files[0];

    if(file)
    {
      var reader = new FileReader();

      reader.onload = function(fileLoadEvent) {
          var dataUrl = fileLoadEvent.currentTarget.result;
          audioPlayer.setAttribute('src', dataUrl);

          audioPlayer.focus();
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

})();
