(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    // Need to update to current HTML setup
      video = document.getElementById('camera-stream');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('take-photo');

      navigator.getMedia = ( navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia);

      navigator.getMedia(
            {
              video: true,
            },
            function(stream) {
              if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
              } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
              }
              video.play();
              video.addEventListener('canplay', function(ev){
                    if (!streaming) {
                      height = video.videoHeight / (video.videoWidth/width);
                    
                      // Firefox currently has a bug where the height can't be read from
                      // the video, so we will make assumptions if this happens.
                    
                      if (isNaN(height)) {
                        height = width / (4/3);
                      }
                    
                      video.setAttribute('width', width);
                      video.setAttribute('height', height);
                      canvas.setAttribute('width', width);
                      canvas.setAttribute('height', height);
                      streaming = true;
                    }
                  }, false);

              startbutton.addEventListener('click', function(ev){
                    takepicture();
                    ev.preventDefault();
                  }, false);
            },
            function(err) {
              console.log("An error occured! " + err);
            }
          );
	clearphoto();
  }

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  window.addEventListener('load', startup, false);
})();