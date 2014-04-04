var Backbone = require('backbone'),
	TodoModel = require('../models/todo'),
	TodoView = require('./todo'),
	$ = require('jquery');

module.exports = Backbone.View.extend({
	tagName: "ul",

	initialize: function() {
		this.collection.on('add', this.remove, this);
	},

	render: function () {
		this.collection.each(function(todo){
			var todoView = new TodoView({ model: todo });
			this.$el.append(todoView.render().el);
		}, this);

		return this;
	},

	remove: function() {
		this.$el.remove();
	}
});