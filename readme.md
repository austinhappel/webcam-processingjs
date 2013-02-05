# An experiment with Chrome's getUserMedia APIs and ProcessingJs

**Update 02/05/2013**: It looks like the latest version of Chrome doesn't need any modification to get this working. [Try this link](http://austinhappel.github.com/webcam-processingjs/) and see if it works for you.

[Live example](http://austinhappel.github.com/webcam-processingjs/)

## Prerequisites

1. A computer with a webcam
2. [A dev channel or canary build of Google Chrome](http://www.chromium.org/getting-involved/dev-channel)

## How to run:

1. Download the dev channel or canary build of Google Chrome: http://www.chromium.org/getting-involved/dev-channel
2. Open this URL in chrome: `chrome://flags/`
3. Make sure that:
	* "Enable PeerConnection" is **acivated**
	* "Enable Media Source API on <video> elements" is **activated**
4. Put the project up on a publicly accessible webserver (I had trouble activating the webcam when accessing the page locally)
5. open up index.html.

## Notes

* Your mileage may vary on other platforms. Opera supposedly supports the getUserMedia API, but I have not had any luck with it.