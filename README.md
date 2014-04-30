# View

A [Backbone](http://backbonejs.org/#View) *like* view for vanilla JS.

  *The view is a passive interface that displays data (the model) and routes user commands (events) to the presenter to
  act upon that data. The presenter acts upon the model and the view. It retrieves data from repositories (the model),
  and formats it for display in the view.*
  [Model–view–presenter](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)

## View.create(props) : View

Creates a new view class and copies the specified props to the view prototype.

## View.prototype.el : HTMLElement

The HTML element wrapped by the view.

## View.prototype.events : Object

A hash of parameters used to delegate events on child elements of the view element. Hashes are in the format
`{'event selector': 'callback'}`. The selector is optional and leaving it out will apply the event to the view element.
The callback may be a function, the name of a function which exists on the view, or the string `emit:` followed by the
name of an event for the view to emit.

## View.prototype.elements : Object

A hash of selectors used to cache child elements of the view element as properties on the view. Hashes are in the format
`{'selector': 'property'}`. Properties prefixed with `all:` will select *all* elements matching the selector, not just
the first element.