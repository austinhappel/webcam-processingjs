# An experiment with Chrome's PeerConnection APIs and ProcessingJs

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