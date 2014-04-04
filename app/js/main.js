var Backbone = require('backbone'),
	TodoModel = require('./models/todo'),
	TodoCollection = require('./collections/todos'),
	TodoView = require('./views/todo'),
	TodoCollectionView = require('./views/todos'),
	TodoInputView = require('./views/input'),
	$ = require('jquery')
	Backbone.$ = $;

$(function() {
	var todoInputView = new TodoInputView();
});