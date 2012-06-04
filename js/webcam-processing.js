/*global Processing: true, processing: true, WEBCAM: true, $: true */
/*jslint devel: true, browser: true, nomen: true, maxerr: 50, indent: 2 */

(function () {
  "use strict";
    // Simple way to attach js code to the canvas is by using a function
  function sketchProc(processing) {
    var p                     = processing,
      ctx                     = WEBCAM.ctx,
      nb                      = 60,
      width                   = window.innerWidth,
      height                  = window.innerHeight,
      eWidth                  = width / nb,
      eHeight                 = height / nb,
      cachedBrightness        = [],
      cachedDiameter          = [],
      transitionUpRatio       = eWidth / 3,
      transitionDownRatio     = eWidth / 30,
      transitionUpThreshold   = eWidth - transitionUpRatio,
      transitionDownThreshold = transitionDownRatio,
      myImg = document.getElementById('the-image'),
      imgPixelData;

    p.setup = function () {
      var i = 0,
        j = 0,
        imageWidth = height / width * nb,
        imageOffset = (nb - imageWidth) / 2;

      p.size(width, height);
      p.background(255);
      ctx.drawImage(myImg, imageOffset, 0, height / width * nb, nb);
      p.loadPixels();
      imgPixelData = p.pixels.toArray();
      p.frameRate(60);

      p.ellipseMode(p.CENTER);
      p.smooth();

      for (j; j <= nb; j += 1) {
        cachedBrightness.push([]);
        cachedDiameter.push([]);
        for (i = 0; i <= nb; i += 1) {
          cachedBrightness[j].push(0);
          cachedDiameter[j].push(0);
        }
      }
    };


    // Override draw function, by default it will be called 60 times per second
    p.draw = function () {
      var img,
        newFill,
        j,
        i,
        val,
        currentBrightness,
        currentSize;

      p.pushMatrix();

      if (WEBCAM.localMediaStream) {
        ctx.drawImage(WEBCAM.video, 0, 0, nb, nb);
      }

      p.translate(width, 0);
      p.scale(-1, 1);
      p.loadPixels();
      p.background(0);
      p.noStroke();

      for (j = 0; j <= nb; j += 1) {
        for (i = 0; i <= nb; i += 1) {
          val = p.pixels.getPixel(j * width + i);
          currentBrightness = p.brightness(val);
          currentSize = cachedDiameter[j][i];
          p.ellipseMode(p.CORNER);
          if (Math.abs(currentBrightness - cachedBrightness[j][i]) > 30) {
            p.fill(imgPixelData[j * width + (nb - i)]);
            currentSize = (currentSize < transitionUpThreshold) ? currentSize + transitionUpRatio : eWidth;
            p.ellipse(i * eWidth, j * eHeight, currentSize, currentSize);
            cachedBrightness[j][i] = currentBrightness;
            cachedDiameter[j][i] = currentSize;
          } else {
            p.fill(imgPixelData[j * width + (nb - i)]);
            currentSize = (currentSize > transitionDownThreshold) ? currentSize - transitionDownRatio : 0;
            p.ellipse(i * eWidth, j * eHeight, currentSize, currentSize);
            cachedBrightness[j][i] = currentBrightness;
            cachedDiameter[j][i] = currentSize;
          }
        }
      }

      p.popMatrix();

    };
  }

  var canvas = document.getElementById("canvas1"),
    p = new Processing(canvas, sketchProc);

  // p.exit(); to detach it  
}());