function loadFile(fileInputEvent)
{
  var file = fileInputEvent.target.files[0];

  if(file)
  {
    var reader = new FileReader();

    reader.onload = function(fileLoadEvent) {
        var dataUrl = fileLoadEvent.currentTarget.result;
        document.getElementById('audio-player').setAttribute('src', dataUrl);
    }

    reader.readAsDataURL(file);
  }
}

document.getElementById('file-input').addEventListener('change', loadFile, false);
