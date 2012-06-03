/*global Drupal: true, jQuery: true, gigya: true */
/*jslint devel: true, browser: true, nomen: true, maxerr: 50, indent: 2 */

var WEBCAM = {
  init: function () {
    "use strict";

    function onFailSoHard() {
      console.log('barf');
    }

    var self           = this,
      video            = document.querySelector('video'),
      canvas           = document.getElementById('canvas1'),
      ctx              = canvas.getContext('2d'),
      captureTimer;

    self.video  = video;
    self.canvas = canvas;
    self.ctx    = canvas.getContext('2d');
    self.img    = document.querySelector('img');

    //video.addEventListener('click', snapshot, false);
    // captureTimer = window.setInterval(function () {
    //   self.snapshot.call(WEBCAM);
    // }, 1000);

    // Not showing vendor prefixes or code that works cross-browser.
    if (navigator.getUserMedia) {
      navigator.getUserMedia('video', function (stream) {
        self.video.src = stream;
        self.localMediaStream = stream;
        //sizeCanvas();
        //button.textContent = 'Take Shot';
      }, onFailSoHard);
    } else if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia({video: true}, function (stream) {
        self.video.src = window.webkitURL.createObjectURL(stream);
        self.localMediaStream = stream;
        //sizeCanvas();
        //button.textContent = 'Take Shot';
      }, onFailSoHard);
    } else {
      onFailSoHard(); //{target: video}
    }
  },
  snapshot: function () {
    "use strict";
    var self = this;

    if (self.localMediaStream) {
      self.ctx.drawImage(self.video, 0, 0);
      // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
      //self.img.src = self.canvas.toDataURL('image/png');
    }
  }
};

WEBCAM.init();