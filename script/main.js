(function() {

  

})();

var KeyCode = {
  Space: 32,
  LeftArrow: 37,
  RightArrow: 39
};

var fileInput = document.getElementById('file-input');
var audioPlayer = document.getElementById('audio-player');

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

fileInput.addEventListener('change', loadFile, false);
document.addEventListener('keydown', handleKeyDown, false);
