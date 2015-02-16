var extend = require('extend-class');
var events = require('event');
var delegates = require('delegate');
var emitter = require('emitter');

/**
 * View
 * @constructor
 * @param   {Object}        options
 * @param   {HTMLElement}   options.el
 */
function View(options) {
	this._element = this.element;
	this._elements = this.elements;
	this._events = this.events;

	if (options) {

		if (options.el) {
			this._element = options.el;
		}

		if (options.elements) {
			this._elements = options.elements
		}

		if (options.events) {
			this._events = options.events
		}

	}

	this.createElement();
	this.bindEvents();
	this.cacheElements();

	if (this.init) {
		this.init(options);
	}

}
emitter(View.prototype);

/**
 * Create a new view class which extends this view class and copy the properties to the child view's prototype
 * @param   {Object}  [properties]
 * @returns {View}
 */
View.extend = function(properties) {
  var child     = extend(this, properties);
  child.extend  = this.extend;
  return child;
};

/**
 * The default element spec
 * @type {object}
 */
View.prototype.element = {
	tag: 'div'
};

/**
 * Creates the element
 * @api private
 */
View.prototype.createElement = function () {
	var el;
	var spec = this._element;

	if (spec.nodeType) {
		el = spec
	} else if (typeof spec === 'object') {

		el = document.createElement(spec.tag);

		if (spec.content) {
			el.innerHTML = spec.content;
		}

		if (spec.classes) {
			el.className = spec.classes;
		}

		for (var key in spec) {
			if (spec.hasOwnProperty(key)) {
				if (key !== 'tag' && key !== 'content' && key !== 'classes') {
					el.setAttribute(key, spec[key]);
				}
			}
		}

	}

	this.el = el;
};

/**
 * Cache the specified elements on the view
 * @api private
 */
View.prototype.cacheElements = function () {
	if (this.el && this._elements) {
		for (selector in this._elements) {

			if (!this._elements.hasOwnProperty(selector)) {
				continue;
			}

			var prop = this._elements[selector];

			if (prop.substr(0, 4) === 'all:') {
				this[prop.substr(4)] = this.el.querySelectorAll(selector);
			} else {
				this[prop] = this.el.querySelector(selector);
			}

		}
	}
};

/**
 * Bind the specified events to the view
 * @api private
 */
View.prototype.bindEvents = function () {
	if (this.el && this._events) {
		for (dfn in this._events) {

			if (!this._events.hasOwnProperty(dfn)) {
				continue;
			}

			//get the callback
			var callback = this._events[dfn];
			if (typeof callback === 'string') {
				if (callback.substr(0, 5) === 'emit:') {
					function createEmitCallback(event) {
						return function (domEvent) {
							this.emit(event);
						}
					}

					callback = createEmitCallback(callback.substr(5));
				} else {
					callback = this[callback];
				}
				if (typeof callback !== 'function') {
					throw new Error('View: Event ' + dfn + ' callback cannot be resolved to a function');
				}
				callback = callback.bind(this);
			}

			//get the event and selector
			var s = dfn.split(' ', 2);
			var event = s[0];
			var selector = s[1];

			//bind the event
			if (s.length === 1) {
				events.bind(this.el, event, callback, true);
			} else {
				delegates.bind(this.el, selector, event, callback, true);
			}

		}
	}
};

/**
 * Unbinds the view from element events
 * @api private
 */
View.prototype.unbindEvents = function () {

};

module.exports = View;
