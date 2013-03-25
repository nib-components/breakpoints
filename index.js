var Emitter = require('emitter');
var utils = require('string-utils');
var events = new Emitter();
var currentBreakpoint;

var onWindowResize = function(){
	var current = getCurrent();
	if(current !== currentBreakpoint) {
		events.emit(currentBreakpoint+':out', current);
		events.emit(current+':in', current);
		events.emit('change', current, currentBreakpoint);
		currentBreakpoint = current;
	}
};

var getCurrent = function(){
	if (!window.getComputedStyle){
		return currentBreakpoint;
	}
	var val = window.getComputedStyle(document.querySelector('html'), ':before').content;
	return utils.unquote(val);
};

currentBreakpoint = getCurrent();
$(window).on('resize', _.debounce(onWindowResize, 300));
onWindowResize();

module.exports = {
	getCurrent: getCurrent,
	events: events
};