let js = [
  "lib/jquery/jquery.min.js",
  "lib/jquery/jquery.timeago.js",
  "lib/jquery/jquery.ui.js",
  "lib/jquery/attrchange.js",
  "lib/moment/moment.min.js",
  "lib/strip-combining-marks/strip-combining-marks.js",
  "lib/betterwasd.js",
  "lib/coloris/coloris.min.js",
  "lib/cookie/js.cookie.min.js",
  "lib/linkify/linkify.min.js",
  "lib/linkify/linkify-element.min.js",
  "lib/code-mnem/code-mnem.js",
  "lib/alertify/alertify.min.js",
  "lib/hex-rgb/index.js",
  "helper/Helper.js",
  "helper/Settings.js",
  "helper/Twitch.js",
  "helper/FFZ.js",
  "helper/BTTV.js",
  "helper/TV7.js",
  "helper/WASD.js",
  "helper/BWASD.js",
  "helper/WebSocket.js",
  "BetterStreamChat/init.js",
  "wasd/init.js",
  "init.js"
]

let fontStyle = document.createElement('style');
fontStyle.type = 'text/css';
fontStyle.innerHTML = '';
fontStyle.appendChild(document.createTextNode(`@font-face {
  font-family: 'ovg-icons';
  src:  url(${chrome.runtime.getURL("css/fonts/ovg-icons.ttf")}?batw30) format('truetype'),
    url(${chrome.runtime.getURL("css/fonts/ovg-icons.woff")}?batw30) format('woff'),
    url(${chrome.runtime.getURL("css/fonts/ovg-icons.svg")}?batw30#ovg-icons) format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}`));
(document.head || document.documentElement).appendChild(fontStyle);


for (let script of js) {
  // console.log(chrome.runtime.getURL(script))
  var s = document.createElement('script');
  s.classList.add('bwasd-script')
  s.src = chrome.runtime.getURL(script);
  (document.head || document.documentElement).appendChild(s);
}

document.addEventListener("DOMContentLoaded", function(event) {
  this.remove();
});