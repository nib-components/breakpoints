var breakpoint = require('breakpoints');

describe('breakpoint', function(){

	it('should get the current breakpoint', function(){
		var el = document.createElement('style');
		var sheet = document.head.appendChild(el).sheet;
		sheet.insertRule('html:before{content:"mobile"}');
		//$(window).trigger('resize');
		
		$('html').css('content', 'mobile');
		var device = breakpoint.getCurrent();
		expect(device).to.equal('mobile');

	});
});