var fs = require('fs');
var postcss = require('postcss');
var expect = require('chai').expect;

var plugin = require('../index');

var read = function(path) {
	return fs.readFileSync(path, 'utf-8');
};
var testString = function(input, output, opts) {
	var result = postcss(plugin(opts)).process(input).css;
	expect(result.replace(/\s/g,"")).to.eql(output.replace(/\s/g,""));
};
var test = function(name, opts) {
	var input = read('test/fixtures/' + name + '.css');
	var output = read('test/fixtures/' + name + '.out.css');
	testString(input, output, opts);
};
describe('postcss-filter-background', function() {
	it('simple', function() {
		test('ieOnly', {
			ieOnly: true
		});
		test('media');
	});
});
