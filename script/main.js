var KeyCode = {
  Space: 32
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

function handleKeyPress(keyPressEvent)
{
  if(keyPressEvent.keyCode === KeyCode.Space)
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
}

fileInput.addEventListener('change', loadFile, false);
document.addEventListener('keypress', handleKeyPress, false);
