// ==UserScript==
// @name BetterWASD
// @namespace BetterWASD
// @include *.wasd.tv/*
// @exclude *.wasd.tv/api/*
// @grant none
// @icon https://raw.githubusercontent.com/ovgamesdev/BetterWASD.tv/release/img/icon48.png
// @version 1.5.7
// ==/UserScript==

function bwasd_init()
{
	var git = 'https://raw.githubusercontent.com/ovgamesdev/BetterWASD.tv/release/'

	if ( localStorage.bwasdDebugMode == "true" ) git = 'https://raw.githubusercontent.com/ovgamesdev/BetterWASD.tv/main/'

	let content_scripts = [{
    "css": [
      "css/index.css",
      "css/fonts/fonts.css",
      "css/jquery.ui.css",
      "css/ovg_tooltip.css",
      "css/ovg_button.css",
      "css/ovg_tabs-wrapper.css",
      "css/ovg_burger-toggle.css",
      "css/ovg_bell.css",
      "css/ovg_checkbox.css",
      "css/ovg_sidebar.css",
      "css/ovg_nav-sidebar-toggle.css",
      "css/ovg_chat-toggle.css",
      "css/ovg_accordion.css",
      "css/ovg_viewer-user-card.css",
      "css/ovg_username.css",
      "css/ovg_dropdown.css",
      "lib/coloris/coloris.min.css",
      "lib/alertify/css/alertify.css"
    ],
    "js": [
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
      "wasd/init.js",
      "BetterStreamChat/init.js",
      "init.js"
    ]
  }]

  content_scripts["js"].forEach((value) => {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = git + value;
		document.head.appendChild(script);
  })

  content_scripts["css"].forEach((value) => {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.src = git + value;
		document.head.appendChild(style);
  })
}

bwasd_init();