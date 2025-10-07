/*
 * Chataigne Script Name: HSV to RGB
 * Author: Ben Kuper, X-Raym
 * Author URI: https://benjamin.kuperberg.fr/chataigne/fr
 * Repository: X-Raym/Chataigne-DMX-from-REAPER-MIDI
 * Repository URI: https://github.com/X-Raym/Chataigne-DMX-from-REAPER-MIDI/
 * Licence: GPL v3
 * REAPER: 5.0
 * Version: 1.0.0
 */

function filter(inputs, minValues, maxValues, multiplexIndex) {
    script.log("Inputs length = " + inputs.length);
	var result = [];
	for (var i = 0; i < inputs.length; i++) {

		var h = inputs[i][0] / 360;
		var s = inputs[i][1] / 100;
		var v = inputs[i][2] / 100;

		result[i] = hsvToRgb(h, s, v);

		//script.log("Result[" + i + "] length" + result[i].length);
        script.log("inputs1 = " + inputs[i][0] + "\tinputs2 = " + inputs[i][1] + "\tinputs3 = " + inputs[i][2] );
        script.log("H = " + h + "\tS = " + s + "\tI = " + v );
        script.log("R = " + result[i][0] + "\tG = " + result[i][1] + "\tB = " + result[i][2] );
	}

	script.log("Result length = " + result.length);
	return result;
}

function hsvToRgb(h, s, v) {
    var c = v * s;
    // h' (h prime) calculation: H / 60 degrees (since H is [0, 1], we multiply by 6)
    var hPrime = h * 6;
    // X calculation
    var x = c * (1 - Math.abs((hPrime % 2) - 1));
    // M calculation
    var m = v - c;

    var result = [];
    if (hPrime >= 0 && hPrime < 1) {
        result = [c, x, 0];
    } else if (hPrime >= 1 && hPrime < 2) {
        result = [x, c, 0];
    } else if (hPrime >= 2 && hPrime < 3) {
        result = [0, c, x];
    } else if (hPrime >= 3 && hPrime < 4) {
        result = [0, x, c];
    } else if (hPrime >= 4 && hPrime < 5) {
        result = [x, 0, c];
    } else if (hPrime >= 5 && hPrime <= 6) {
        result = [c, 0, x];
    } else {
        // This handles cases where h is exactly 0 or 1 (grayscale case where h is irrelevant if s=0)
        result = [0, 0, 0];
    }

    // Add M to R, G, and B to get the final values
    result[0] += m;
    result[1] += m;
    result[2] += m;

    return result;
}
