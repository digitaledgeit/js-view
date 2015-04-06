var assert  = require('assert');
var View    = require('view');

describe('View', function() {

	describe('.createElement()', function() {

		it('should create an empty div if no element was passed', function() {

			var view = new View();

			assert.equal(view.el.nodeName, 'DIV');
			assert.equal(view.el.innerHTML, '');

		});

		it('should create a UL when the .el property is set on the class', function() {

				var TestView = View.extend({
					el: {
						tag: 'ul'
					}
				});

				var view = new TestView();

				assert.equal(view.el.nodeName, 'UL');

		});

		it('should create a UL when the .el property is set on the options', function() {

			var view = new View({
				el: {
					tag: 'ul'
				}
			});

			assert.equal(view.el.nodeName, 'UL');

		});

		it('should set a class when the classes property is set', function() {

			var view = new View({
				el: {
					classes: 'js-view'
				}
			});

			assert.equal(view.el.className, 'js-view');

		});

		it('should set some text when the content property is set', function() {

			var view = new View({
				el: {
					content: 'Hello World!'
				}
			});

			assert.equal(view.el.textContent, 'Hello World!');

		});

	});

	describe('.bindEvents()', function() {

	});

	describe('.unbindEvents()', function() {

	});

	describe('.cacheElements()', function() {

	});

	describe('.uncacheElements()', function() {

	});

});