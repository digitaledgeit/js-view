# view

Abstract your DOM manipulation with a [Backbone](http://backbonejs.org/#View) *like* view for vanilla JS.

## Installation
    
ComponentJS
    
    component install digitaledgeit/js-view
    
Browserify:

    npm install --save digitaledgeit-view

## Usage

HTML:

    <div class="js-search-form">
        <input class="js-query"/>
        <button class="js-submit">Search!</button>
    </div>
    
JavaScript:

    var View = require('view');
    
    var SearchFormView = View.extend({

        events: {
            'keypress .js-query':   'onKeypress',
            'click .js-submit':     'emit:submit'
        },

        elements: {
            '.js-query':    'query',
            '.js-submit':   'submit'
        },

        /**
         * Initialise method
         */
        init: function(options) {
        },

        /**
         * Get the query value
         * @returns {string}
         */
        getQuery: function() {
            return this.query.value;
        },

        /**
         * Sets the query value
         * @param   {string} query
         * @returns {SearchFormView}
         */
        setQuery: function(query) {
            this.query.value = query;
            return this;
        },

        /**
         * Focus the query field
         * @returns {SearchFormView}
         */
        focus: function() {
            this.query.focus();
            return this;
        },

        /**
         * Selects the query field
         * @returns {SearchFormView}
         */
        select: function() {
            this.query.select();
            return this;
        },

        /**
         * Enable the form allowing user input
         * @returns {SearchFormView}
         */
        enable: function() {
            this.query.disabled = false;
            this.submit.disabled = false;
            return this;
        },

        /**
         * Disables the form denying user input
         * @returns {SearchFormView}
         */
        disable: function() {
            this.query.disabled = true;
            this.submit.disabled = true;
            return this;
        },

        /**
         * Capture and emit the submit event
         * @param   {KeyboardEvent} event
         */
        onKeypress: function(event) {
            if (event.keyCode === 13) {
                this.emit('submit');
            }
        }

    });
    
    var view = new SearchFormView({
        el: document.querySelector('.js-search-form')
    });
    
    view.on('submit', function() {
        view.disable();
        console.log('Searching for "'+view.getQuery()+'"...');
        setTimeout(function() {
            view.focus().select().enable();
        }, 1500)
    });


## API

### Methods

#### View.extend(properties) : View

Creates a new child view class and copies the specified properties to the child view prototype.

#### new View(options)

Create a new view instance.

- `options.el` - The view element - defaults to an empty div
- `options.events` - The view events to listen for
- `options.elements` - The view elements to cache

#### view.el : HTMLElement

The view element.

#### view.events : Object

A hash of parameters used to delegate events on child elements of the view element. Hashes are in the format
`{'event': 'callback'}` or `{'event selector': 'callback'}`.
The callback may be a function, the name of a function which exists as a property on the view, or the string `emit:` followed by the
name of an event to emit on the view object.

#### view.elements : Object

A hash of selectors used to cache child elements as properties on the view. Hashes are in the format
`{'selector': 'property'}`. Properties prefixed with `all:` will select *all* elements matching the selector, not just
the first element.

## Building the example

ComponentJS:

    component build --dev
    
Browserify:    
    
    browserify -r ./index.js:view > build/build.js
    
    
## License

The MIT License (MIT)

Copyright (c) 2014 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.