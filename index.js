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

  if (!options) {
    return;
  }

  if (options.el) {
    this.el = options.el;
  } else {
    throw new Error('View: No element provided.');
  }

  this.bindEvents();
  this.cacheElements();

  if (this.init) {
    this.init(options);
  }

}
emitter(View.prototype);

/**
 * Cache the specified elements on the view
 * @api private
 */
View.prototype.cacheElements = function() {
  for (selector in this.elements) {

    if (!this.elements.hasOwnProperty(selector)) {
      continue;
    }

    var prop = this.elements[selector];

    if (prop.substr(0, 4) === 'all:') {
      this[prop.substr(4)] = this.el.querySelectorAll(selector);
    } else {
      this[prop] = this.el.querySelector(selector);
    }

  }

}

/**
 * Bind the specified events to the view
 * @api private
 */
View.prototype.bindEvents = function() {

  for (dfn in this.events) {

    if (!this.events.hasOwnProperty(dfn)) {
      continue;
    }

    //get the callback
    var callback  = this.events[dfn];
    if (typeof callback === 'string') {
      if (callback.substr(0, 5) === 'emit:') {
        function createEmitCallback(event) {
          return function() {
            this.emit(event);
          }
        }
        callback = createEmitCallback(callback.substr(5));
      } else {
        callback = this[callback];
      }
      if (typeof callback !== 'function') {
        throw new Error('View: Event '+dfn+' callback cannot be resolved to a function');
      }
      callback = callback.bind(this);
    }

    //get the event and selector
    var s         = dfn.split(' ', 2);
    var event     = s[0];
    var selector  = s[1];

    //bind the event
    if (s.length === 1) {
      events.bind(this.el, event, callback);
    } else {
      delegates.bind(this.el, selector, event, callback);
    }

  }

};

/**
 * Unbinds the view from element events
 * @api private
 */
View.prototype.unbindElementEvents = function() {

};

/**
 * Creates a new view class
 * @param   {object} props
 */
View.create = function(props) {

  var ChildView = function() {
    View.apply(this, arguments);
  };
  ChildView.prototype = new View();
  ChildView.prototype.constructor = ChildView;

  for (var i in props) {
    if (props.hasOwnProperty(i)) {
      ChildView.prototype[i] = props[i];
    }
  }

  return ChildView;
};

module.exports = View;