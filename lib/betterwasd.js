const ovg = {
	log(...args) {
		echo.log( echo.asAlert( "BetterWASD" ), ...args );
	},
	warning(...args) {
		echo.log( echo.asWarning( "BetterWASD" ), ...args );
	}
}

const ws = {
	log(...args) {
		echo.log( echo.asAlert( "WebSocket" ), ...args );
	},
	warning(...args) {
		echo.log( echo.asWarning( "WebSocket" ), ...args );
	}
}

var echo = (function() {

	var queue = [];
	var ECHO_TOKEN = {};
	var RESET_INPUT = "%c ";
	var RESET_CSS = "";

	function alertFormatting( value ) {

		queue.push({
			value: value,
			css: "display: inline-block ; background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
		});

		return( ECHO_TOKEN );

	}

	function warningFormatting( value ) {

		queue.push({
			value: value,
			css: "display: inline-block ; background-color: gold ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
		});

		return( ECHO_TOKEN );

	}

	function using( consoleFunction ) {

		function consoleFunctionProxy() {

			var inputs = [];
			var modifiers = [];

			for ( var i = 0 ; i < arguments.length ; i++ ) {

				if ( arguments[ i ] === ECHO_TOKEN ) {

					var item = queue.shift();

					inputs.push( ( "%c" + item.value ), RESET_INPUT );
					modifiers.push( item.css, RESET_CSS );

				} else {

					var arg = arguments[ i ];

					if (
						( typeof( arg ) === "object" ) ||
						( typeof( arg ) === "function" )
						) {

						inputs.push( "%o", RESET_INPUT );
						modifiers.push( arg, RESET_CSS );

					} else {

						inputs.push( ( "%c" + arg ), RESET_INPUT );
						modifiers.push( RESET_CSS, RESET_CSS );

					}

				}

			}


			consoleFunction( inputs.join( "" ), ...modifiers );

			queue = [];

		}

		return( consoleFunctionProxy );

	}

	return({
		log: using( console.log ),
		warn: using( console.warn ),
		error: using( console.error ),
		trace: using( console.trace ),
		group: using( console.group ),
		groupEnd: using( console.groupEnd ),

		asAlert: alertFormatting,
		asWarning: warningFormatting
	});
})();